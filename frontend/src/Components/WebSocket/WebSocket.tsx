import { ComponentType, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {
    ElementState,
    ElementVote,
    UserVote,
    WebSocketApi,
    WebSocketLoginData,
    WebSocketState,
  } from '../../types/WebSocket';

export const doNothing = () => {};

// defines the initial web socket state
const initialWebSocketState: WebSocketState = {
    elementVotes: [],
    userVotes: [],
    maxRounds: 1,
    activeRound: 1,
    activeUser: ""
};

// defines the initial web socket login data
const initialLoginData: WebSocketLoginData = { user: '', color: '', session: '' };

// context allows to pass a value to a child deep down in the tree
export const WebSocketContext = createContext<WebSocketApi>({
    connected: false,
    state: initialWebSocketState,
    loginData: initialLoginData,
    loggedIn: false,
    addElement: doNothing,
    delElement: doNothing,
    resetElement: doNothing,
    agreeElement: doNothing,
    disbuteElement: doNothing,
    lockElement: doNothing,
    upvoteElement: doNothing,
    downvoteElement: doNothing,
    clearVotes: doNothing,
    addRound: doNothing,
    nextRound: doNothing,
    nextUser: doNothing,
    login: doNothing,
    setVote: doNothing,
});

// the consumer retrieves values from the context
export const WebSocketConsumer = WebSocketContext.Consumer;

// the provider provides values to the context
export const WebSocketProvider = ({children}: any) => {
    const [connected] = useState(false);
    const [state, setState] = useState(initialWebSocketState);
    const [loginData, setLoginData] = useState(initialLoginData);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (user: string, color: string, session: string) => {
        setLoginData({user, color, session});
        setLoggedIn(true);
        setState({
            ...initialWebSocketState,
            elementVotes: [],
            userVotes: []
      });
    }

    const addElement = (id: string) => {
        setState({ ...state, elementVotes: [ ...state.elementVotes, new ElementVote(id, 0, 0, ElementState.Ongoing)]})
    }
    
    const delElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.filter((value) => value.id != id)})
    }

    const upvoteElement = (id: string) => {
        voteElement(id, 1);
    }
    
    const downvoteElement = (id: string) => {
        voteElement(id, -1);
    } 

    function voteElement(id: string, vote: number) {
        var elementVotes = state.elementVotes.map(
            (element) => element.id == id ?
                new ElementVote(
                    id,
                    element.votes + vote, 
                    element.votesRound + vote,
                    (state.userVotes.findIndex(
                        (userVote) => userVote.elementId == id && userVote.userId != state.activeUser && userVote.vote + vote == 0) >= 0)
                        ? ElementState.Disbuted 
                        : ElementState.Agreed)
                : element);
        var userVoteLength = state.userVotes.filter((element) => element.elementId == id && element.userId == loginData.user).length;
        if (userVoteLength > 0) {
            var userVoteIndex = state.userVotes.findIndex((element) => element.elementId == id && element.userId == loginData.user);
            if (userVoteIndex > -1) {
                var userVote = state.userVotes.splice(userVoteIndex, 1)[0];
                if (userVote.vote + vote == 0) {
                    setState({ ...state, elementVotes: elementVotes });
                }
                else {
                    setState({ ...state, elementVotes: elementVotes, userVotes: [...state.userVotes, new UserVote(userVote.userId, userVote.userColor, userVote.elementId, userVote.vote + vote)] });
                }
            }
        }
        else {
            setState({ ...state, elementVotes: elementVotes, userVotes: [...state.userVotes, new UserVote(loginData.user, loginData.color, id, vote)] });
        }
    }

    const resetElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, element.votesRound, ElementState.Ongoing) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const agreeElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, element.votesRound, ElementState.Agreed) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const disbuteElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, element.votesRound, ElementState.Disbuted) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const lockElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, element.votesRound, ElementState.Locked) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const clearVotes = () => {
        setState({...state, userVotes: []})
    }

    const addRound = () => {
        setState({...state, maxRounds: state.maxRounds + 1})
    }

    const nextRound = () => {
        setState({...state, activeRound: state.activeRound + 1, elementVotes: state.elementVotes.map(
            (element) => new ElementVote(element.id, element.votes, 0, 
                (element.votesRound == 0) ? ElementState.Locked : ElementState.Ongoing))})
    }

    const nextUser = (user: string) => {
        setState({...state, activeUser: user})
    }

    const setVote = (vote: UserVote) => {
        setState(state)
    }

    const value: WebSocketApi = {
        connected,
        state,
        loginData,
        loggedIn,
        login,
        addElement,
        delElement,
        resetElement,
        agreeElement,
        disbuteElement,
        lockElement,
        upvoteElement,
        downvoteElement,
        clearVotes,
        addRound,
        nextRound,
        nextUser,
        setVote,
    };

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};

// type of the connectToWebSocket function component which takes a ComponentType and returns a ComponentType
type ConnectToWebSocket<P extends {} = {}> = (
    Component: ComponentType<
      {
        [K in keyof P | 'socket']: K extends 'socket'
          ? WebSocketApi
          : K extends keyof P
          ? P[K]
          : never;
      }
    >
  ) => ComponentType<P>;

// connectToWebSocket is function component of type ConnectToWebSocket which takes a Component and further application properties
export const connectToWebSocket: ConnectToWebSocket = (Component) => (...props) => {
    return (
        <WebSocketConsumer>
            {(socket: WebSocketApi) => <Component socket={socket} {...props} />}
        </WebSocketConsumer>
    )
};
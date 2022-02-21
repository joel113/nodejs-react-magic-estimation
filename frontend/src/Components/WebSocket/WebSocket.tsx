import { ComponentType, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {
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
    upvoteElement: doNothing,
    downvoteElement: doNothing,
    fixElement: doNothing,
    unfixElement: doNothing,
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
        setState({ ...state, elementVotes: [ ...state.elementVotes, new ElementVote(id, 0, false)]})
    }
    
    const delElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.filter((value) => value.id != id)})
    }

    const upvoteElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes + 1, element.fixed) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, +1)]});
    }
    
    const downvoteElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes > 1 ? element.votes - 1 : 0, element.fixed) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }   

    const fixElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, true) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const unfixElement = (id: string) => {
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == id ? new ElementVote(id, element.votes, false) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, id, -1)]})
    }

    const clearVotes = () => {
        setState({...state, userVotes: []})
    }

    const addRound = () => {
        setState({...state, maxRounds: state.maxRounds + 1})
    }

    const nextRound = () => {
        setState({...state, activeRound: state.activeRound + 1})
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
        upvoteElement,
        downvoteElement,
        fixElement,
        unfixElement,
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
import { ComponentType, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WEBSOCKET_URL } from '../../config';
import {
    getLoginRequest,
    getAddElementRequest,
    getDelElementRequest,
    getUpvoteElementRequest,
    getDownvoteElementRequest,
    getResetElementRequest,
    getAgreeElementRequest,
    getDisbuteElementRequest,
    getLockElementRequest,
    getOngoingElementRequest,
    getClearVotesRequest,
    getInitRoundsRequest,
    getAddRoundRequest,
    getNextRoundRequest
  } from '../../requests/websocket-requests';
import {
    ElementState,
    ElementVote,
    UserVote,
    WebSocketApi,
    WebSocketLoginData,
    WebsocketMessage,
    WebSocketState,
  } from '../../types/WebSocket';

export const doNothing = () => {};

// defines the initial web socket state
const initialWebSocketState: WebSocketState = {
    elementVotes: [],
    userVotes: [],
    maxRounds: 1,
    activeRound: 1
};

// defines the initial web socket login data
const initialLoginData: WebSocketLoginData = { user: '', color: '', sessionId: '' };

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
    login: doNothing
});

// the consumer retrieves values from the context
export const WebSocketConsumer = WebSocketContext.Consumer;

// the provider provides values to the context
export const WebSocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [state, setState] = useState(initialWebSocketState);
    const [loginData, setLoginData] = useState(initialLoginData);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!socket) {
          const webSocket = new WebSocket(WEBSOCKET_URL)
          console.log('[Magic] Connecting to web socket server %s', WEBSOCKET_URL)
          webSocket.onopen = () => {
            if (loginData.user && loginData.sessionId) {
                webSocket.send(getLoginRequest(loginData.user, loginData.color, loginData.sessionId));
            }
            setSocket(webSocket);
          };
          webSocket.onmessage = (event: any) => {
            const message: WebsocketMessage = JSON.parse(event.data);
            if (message.type === 'state') {
              setState(message.payload);
            }
            if (message.type === 'not-logged-in') {
              setState(initialWebSocketState);
              setLoggedIn(false);
            }
          };
          webSocket.onerror = (event: Event) => {
            console.error('[Magic] Catched error when connecting to web socket server')
          }
          webSocket.onclose = (event: CloseEvent) => {
            console.log('[Magic] Connecting to web socket server closed: %s', event.code)
            setSocket(null);
          };
          setSocket(webSocket);
        }
      }, []);

    const login = (user: string, color: string, sessionId: string) => {
        console.log('[Magic] Submiting login request to backend')
        socket!.send(getLoginRequest(user, color, sessionId));
        setLoginData({user, color, sessionId});
        setLoggedIn(true);
        socket!.send(getInitRoundsRequest(sessionId));
        setState({
            ...initialWebSocketState,
            elementVotes: [],
            userVotes: []
      });
    }

    const addElement = (element_id: string) => {
        socket!.send(getAddElementRequest(loginData.sessionId, element_id));
        setState({ ...state, elementVotes: [ ...state.elementVotes, new ElementVote(element_id, 0, 0, ElementState.Ongoing)]})
    }
    
    const delElement = (element_id: string) => {
        socket!.send(getDelElementRequest(loginData.sessionId, element_id));
        setState({...state, elementVotes: state.elementVotes.filter((value) => value.id != element_id)})
    }

    const upvoteElement = (element_id: string) => {
        socket!.send(getUpvoteElementRequest(loginData.sessionId, element_id));
        voteElement(element_id, 1);
    }
    
    const downvoteElement = (element_id: string) => {
        socket!.send(getDownvoteElementRequest(loginData.sessionId, element_id));
        voteElement(element_id, -1);
    } 

    function voteElement(element_id: string, vote: number) {
        var elementVotes = state.elementVotes.map(
            (element) => element.id == element_id ?
                new ElementVote(
                    element_id,
                    element.votes + vote, 
                    element.votesRound + vote,
                    (state.userVotes.findIndex(
                        (userVote) => userVote.elementId == element_id && userVote.userId != loginData.user && userVote.vote + vote == 0) >= 0)
                        ? (socket!.send(getDisbuteElementRequest(loginData.sessionId, element_id)), ElementState.Disbuted)
                        : (socket!.send(getAgreeElementRequest(loginData.sessionId, element_id)), ElementState.Agreed))
                : element);
        var userVoteLength = state.userVotes.filter((element) => element.elementId == element_id && element.userId == loginData.user).length;
        if (userVoteLength > 0) {
            var userVoteIndex = state.userVotes.findIndex((element) => element.elementId == element_id && element.userId == loginData.user);
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
            setState({ ...state, elementVotes: elementVotes, userVotes: [...state.userVotes, new UserVote(loginData.user, loginData.color, element_id, vote)] });
        }
    }

    const resetElement = (element_id: string) => {
        socket!.send(getResetElementRequest(loginData.sessionId, element_id));
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == element_id ? new ElementVote(element_id, element.votes, element.votesRound, ElementState.Ongoing) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, element_id, -1)]})
    }

    const agreeElement = (element_id: string) => {
        socket!.send(getAgreeElementRequest(loginData.sessionId, element_id));
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == element_id ? new ElementVote(element_id, element.votes, element.votesRound, ElementState.Agreed) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, element_id, -1)]})
    }

    const disbuteElement = (element_id: string) => {
        socket!.send(getDisbuteElementRequest(loginData.sessionId, element_id));
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == element_id ? new ElementVote(element_id, element.votes, element.votesRound, ElementState.Disbuted) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, element_id, -1)]})
    }

    const lockElement = (element_id: string) => {
        socket!.send(getLockElementRequest(loginData.sessionId, element_id));
        setState({...state, elementVotes: state.elementVotes.map((element) => element.id == element_id ? new ElementVote(element_id, element.votes, element.votesRound, ElementState.Locked) : element ), userVotes: [ ...state.userVotes,  new UserVote(loginData.user, loginData.color, element_id, -1)]})
    }

    const clearVotes = () => {
        socket!.send(getClearVotesRequest(loginData.sessionId));
        setState({...state, userVotes: []})
    }

    const addRound = () => {
        socket!.send(getAddRoundRequest(loginData.sessionId));
        setState({...state, maxRounds: state.maxRounds + 1})
    }

    const nextRound = () => {
        socket!.send(getNextRoundRequest(loginData.sessionId));
        setState({...state, activeRound: state.activeRound + 1, elementVotes: state.elementVotes.map(
            (element) => new ElementVote(element.id, element.votes, 0, 
                (element.votesRound == 0) 
                ? (socket!.send(getLockElementRequest(loginData.sessionId, element.id)), ElementState.Locked)
                : (socket!.send(getOngoingElementRequest(loginData.sessionId, element.id)),ElementState.Ongoing)))})
    }

    const value: WebSocketApi = {
        connected: Boolean(socket),
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
        nextRound
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

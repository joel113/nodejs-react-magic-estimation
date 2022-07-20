import {ComponentType, createContext} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {WEBSOCKET_URL} from '../../config';
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
  getNextRoundRequest,
  getRemoveVoteRequest,
  getUpdateVoteRequest,
  getAddVoteRequest,
} from '../../requests/websocket-requests';
import {
  ElementState,
  Elements,
  Votes,
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
  rounds: 1,
  roundsActive: 1,
};

// defines the initial web socket login data
const initialLoginData: WebSocketLoginData =
  {user: '', color: '', sessionId: ''};

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
  login: doNothing,
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
          webSocket.send(getLoginRequest(
              loginData.user,
              loginData.color,
              loginData.sessionId));
        }
        setSocket(webSocket);
      };
      webSocket.onmessage = (event: any) => {
        const message: WebsocketMessage = JSON.parse(event.data);
        if (message.type === 'state') {
          setState(message.payload);
        } else if (message.type === 'not-logged-in') {
          setState(initialWebSocketState);
          setLoggedIn(false);
        } else {
          console.error(
              '[Magic] Received message with unknown message type %s',
              message.type);
        }
      };
      webSocket.onerror = (event: Event) => {
        console.error(
            '[Magic] Catched error when connecting to web socket server')
      }
      webSocket.onclose = (event: CloseEvent) => {
        console.log(
            '[Magic] Connecting to web socket server closed: %s', event.code)
        setSocket(null);
      };
      setSocket(webSocket);
    }
  }, []);

  const login = (user: string, color: string, sessionId: string) => {
    console.log('[Magic] Submiting login request to backend');
    socket!.send(getLoginRequest(user, color, sessionId));
    setLoginData({user, color, sessionId});
    setLoggedIn(true);
    socket!.send(getInitRoundsRequest(sessionId));
    setState({
      ...initialWebSocketState,
      elementVotes: [],
      userVotes: [],
    });
  }

  const addElement = (elementId: string) => {
    socket!.send(getAddElementRequest(loginData.sessionId, elementId));
    setState({...state,
      elementVotes: [...state.elementVotes,
        new Elements(elementId, 0, 0, ElementState.Ongoing)]},
    )
  }

  const delElement = (elementId: string) => {
    socket!.send(getDelElementRequest(loginData.sessionId, elementId));
    setState({...state,
      elementVotes: state.elementVotes.filter(
          (value) => value.id != elementId)})
  }

  const upvoteElement = (elementId: string) => {
    socket!.send(
        getUpvoteElementRequest(loginData.sessionId,
            elementId,
            loginData.user,
            loginData.color));
    voteElement(elementId, 1);
  }

  const downvoteElement = (elementId: string) => {
    socket!.send(
        getDownvoteElementRequest(loginData.sessionId,
            elementId,
            loginData.user,
            loginData.color));
    voteElement(elementId, -1);
  }

  const voteElement = (elementId: string, vote: number) => {
    const elementVotes = state.elementVotes.map(
        (element) => element.id == elementId ?
                new Elements(
                    elementId,
                    element.votes + vote,
                    element.votesRound + vote,
                    (state.userVotes.findIndex(
                        (userVote) =>
                          userVote.elementId == elementId &&
                            userVote.userId != loginData.user &&
                              userVote.vote + vote == 0) >= 0) ?
                              (socket!.send(
                                  getDisbuteElementRequest(
                                      loginData.sessionId,
                                      elementId)), ElementState.Disbuted) :
                              (socket!.send(
                                  getAgreeElementRequest(
                                      loginData.sessionId,
                                      elementId)), ElementState.Agreed)) :
                element);

    const userVoteLength = state.userVotes.filter(
        (element) =>
          element.elementId == elementId &&
           element.userId == loginData.user).length;

    if (userVoteLength > 0) {
      const userVoteIndex = state.userVotes.findIndex(
          (element) =>
            element.elementId == elementId &&
              element.userId == loginData.user);
      if (userVoteIndex > -1) {
        const userVote = state.userVotes.splice(userVoteIndex, 1)[0];
        if (userVote.vote + vote == 0) {
          setState({...state, elementVotes: elementVotes});
                    socket!.send(
                        getRemoveVoteRequest(
                            loginData.sessionId,
                            elementId,
                            loginData.user,
                            loginData.color));
        } else {
          setState({...state,
            elementVotes: elementVotes,
            userVotes: [...state.userVotes,
              new Votes(userVote.userId,
                  userVote.userColor,
                  userVote.elementId,
                  userVote.vote + vote)]});
                    socket!.send(
                        getUpdateVoteRequest(loginData.sessionId,
                            elementId,
                            loginData.user,
                            userVote.vote + vote,
                            loginData.color));
        }
      }
    } else {
      setState(
          {...state,
            elementVotes: elementVotes,
            userVotes: [...state.userVotes,
              new Votes(loginData.user, loginData.color, elementId, vote)]});
      socket!.send(getAddVoteRequest(loginData.sessionId,
          elementId,
          loginData.user,
          loginData.color));
    }
  }

  const resetElement = (elementId: string) => {
    setState({...state,
      elementVotes: state.elementVotes
          .map((element) => element.id == elementId ?
            new Elements(elementId,
                element.votes,
                element.votesRound,
                ElementState.Ongoing) : element ),
      userVotes: [...state.userVotes,
        new Votes(loginData.user, loginData.color, elementId, -1)]})
    socket!.send(getResetElementRequest(loginData.sessionId, elementId));
  }

  const agreeElement = (elementId: string) => {
    setState({...state,
      elementVotes: state.elementVotes
          .map((element) => element.id == elementId ?
            new Elements(elementId,
                element.votes,
                element.votesRound,
                ElementState.Agreed) : element ),
      userVotes: [...state.userVotes,
        new Votes(loginData.user, loginData.color, elementId, -1)]})
      socket!.send(getAgreeElementRequest(loginData.sessionId, elementId));
  }

  const disbuteElement = (elementId: string) => {
    setState({...state,
      elementVotes: state.elementVotes
          .map((element) => element.id == elementId ?
            new Elements(elementId,
                element.votes,
                element.votesRound,
                ElementState.Disbuted) : element ),
      userVotes: [...state.userVotes,
        new Votes(loginData.user, loginData.color, elementId, -1)]})
      socket!.send(getDisbuteElementRequest(loginData.sessionId, elementId));
  }

  const lockElement = (elementId: string) => {
    setState({...state,
      elementVotes: state.elementVotes
          .map((element) => element.id == elementId ?
            new Elements(elementId,
                element.votes,
                element.votesRound,
                ElementState.Locked) : element ),
      userVotes: [...state.userVotes,
        new Votes(loginData.user, loginData.color, elementId, -1)]})
    socket!.send(getLockElementRequest(loginData.sessionId, elementId));
  }

  const clearVotes = () => {
        socket!.send(getClearVotesRequest(loginData.sessionId));
        setState({...state, userVotes: []})
  }

  const addRound = () => {
        socket!.send(getAddRoundRequest(loginData.sessionId));
        setState({...state, rounds: state.rounds + 1})
  }

  const nextRound = () => {
        socket!.send(getNextRoundRequest(loginData.sessionId));
        setState({...state,
          roundsActive: state.roundsActive + 1,
          elementVotes: state.elementVotes.map(
              (element) => new Elements(element.id, element.votes, 0,
                (element.votesRound == 0) ?
                (socket!.send(
                    getLockElementRequest(loginData.sessionId, element.id)),
                  ElementState.Locked) :
                (socket!.send(
                    getOngoingElementRequest(loginData.sessionId, element.id)),
                  ElementState.Ongoing)))})
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
    nextRound,
  };

  return <WebSocketContext.Provider value={value}>{children}
  </WebSocketContext.Provider>;
};

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

/**
 * Preact context which injects a web socket connection into the passed
 * component.
 * @param {Component} Component for getting a web socket connection injected
 * @return {ConnectToWebSocket} Component having a consumer for injecting a
 *  web socket connection
 */
export const connectToWebSocket: ConnectToWebSocket = (Component) =>
  (...props) => {
    return (
      <WebSocketConsumer>
        {(socket: WebSocketApi) => <Component socket={socket} {...props} />}
      </WebSocketConsumer>
    )
  };

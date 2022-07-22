import {ComponentType, createContext} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {WEBSOCKET_URL} from '../../config';
import {
  getLoginRequest,
  getAddElementRequest,
  getDelElementRequest,
  getClearVotesRequest,
  getInitRoundsRequest,
  getAddRoundRequest,
  getNextRoundRequest,
  getRemoveVoteRequest,
  getUpdateVoteRequest,
  getAddVoteRequest,
  getUpdateElementRequest,
  getFullstateRequest,
} from '../../requests/websocket-requests';
import {
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
  updateElement: doNothing,
  delElement: doNothing,
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
    connect();
  }, []);

  const connect = () => {
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
        console.log(
          '[Magic] Trying to reconnect to web socket server ' +
          'after a timeout of 1 second')
        // very simple implementation of reconnecting to the web socket server
        // after the connection was lost
        setTimeout(function() {
          connect();
        }, 1000);
      };
      setSocket(webSocket);
    }
  }

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
    socket!.send(getFullstateRequest(sessionId));
  }

  const addElement = (elementId: string, elementState: number, votes: number,
    votes_round: number) => {
    setState({...state,
      elementVotes: [...state.elementVotes,
        new Elements(elementId, votes, votes_round, elementState)]},
    );
    socket!.send(getAddElementRequest(loginData.sessionId,
      elementId,
      elementState));
    socket!.send(getFullstateRequest(loginData.sessionId))
  }

  /**
   * Updates an element including a vote. Updating the state of a element
   * and a vote is necessary as concurrent state updates did lead to race
   * conditions.
   * @param elementId {string} Element to be updated
   * @param elementState {number} Updated or previous state
   * @param votes {number} Number of votes
   * @param votes_round {number} Number of votes_round
   * @param vote {number} Vote update
   */
  const updateElement = (elementId: string,
    elementState: number,
    votes: number,
    votes_round: number,
    vote: number) => {

    const elementVotes = state.elementVotes.map(
      (element) => element.id == elementId ? 
        new Elements(elementId,
          votes + vote,
          votes_round + vote,
          elementState) : element);

    const userVoteIndex = state.userVotes.findIndex(
      (element) =>
        element.elementid == elementId &&
          element.userid == loginData.user);

    socket!.send(getUpdateElementRequest(loginData.sessionId,
      elementId,
      elementState,
      votes + vote,
      votes_round + vote));

    const userVotes = state.userVotes;

    if (userVoteIndex > -1) {
      const userVote = userVotes.splice(userVoteIndex, 1)[0];
      if (userVote.vote + vote == 0) {
        socket!.send(
          getRemoveVoteRequest(
            loginData.sessionId,
            elementId,
            loginData.user,
            loginData.color));
      } else {
        userVotes.push(new Votes(userVote.userid,
          userVote.usercolor,
          userVote.elementid,
          userVote.vote + vote))
        socket!.send(
          getUpdateVoteRequest(loginData.sessionId,
            elementId,
            loginData.user,
            userVote.vote + vote,
            loginData.color));
      }
    } else {
      userVotes.push(new Votes(loginData.user,
        loginData.color,
        elementId,
        vote))
      socket!.send(getAddVoteRequest(loginData.sessionId,
        elementId,
        loginData.user,
        loginData.color));
    }

    setState({...state, elementVotes: elementVotes, userVotes: userVotes});

    socket!.send(getFullstateRequest(loginData.sessionId))
  }

  const delElement = (elementId: string) => {
    setState({...state,
      elementVotes: state.elementVotes.filter(
          (value) => value.id != elementId)});
    socket!.send(getDelElementRequest(loginData.sessionId, elementId));
    socket!.send(getFullstateRequest(loginData.sessionId));
  }

  const clearVotes = () => {
    socket!.send(getClearVotesRequest(loginData.sessionId));
    setState({...state, userVotes: []})
    socket!.send(getFullstateRequest(loginData.sessionId));
  }

  const addRound = () => {
    socket!.send(getAddRoundRequest(loginData.sessionId));
    setState({...state, rounds: state.rounds + 1})
    socket!.send(getFullstateRequest(loginData.sessionId));
  }

  const nextRound = () => {
    socket!.send(getNextRoundRequest(loginData.sessionId));
    setState({...state,
      roundsActive: state.roundsActive + 1
    })
    socket!.send(getFullstateRequest(loginData.sessionId));
  }

  const value: WebSocketApi = {
    connected: Boolean(socket),
    state,
    loginData,
    loggedIn,
    login,
    addElement,
    updateElement,
    delElement,
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

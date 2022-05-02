import { Message } from './types/types';
import { Client } from 'pg';
import { loginUser } from './db/loginuser';
import { addElement, delElement, resetElement, disbuteElement, lockElement, agreeElement, ongoingElement, upvoteElement, downvoteElement } from './db/elements';
import { clearVotes, initRounds, addRound, nextRound } from './db/rounds'

export const onMessage = async (message: Message, client: Client) => {
  try {
    console.log("[Magic] Received message of type %s", message.type)
    switch (message.type) {
      case 'login':
        await loginUser(message.payload!.user!, message.payload!.color!, message.payload!.session!, client);
        break;
      case 'addElement':
        await addElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'delElement':
        await delElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'upvoteElement':
        await upvoteElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'downvoteElement':
        await downvoteElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'resetElement':
        await resetElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'agreeElement':
        await agreeElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'disbuteElement':
        await disbuteElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'lockElement':
        await lockElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'ongoingElement':
        await ongoingElement(message.payload!.session!, message.payload!.element!, client)
        break;
      case 'clearVotes':
        await clearVotes(message.payload!.session!, client)
        break;
      case 'initRounds':
        await initRounds(message.payload!.session!, client)
        break;
      case 'addRound':
        await addRound(message.payload!.session!, client)
        break;
      case 'nextRound':
        await nextRound(message.payload!.session!, client)
        break;
      default:
        throw "Unknown message type"
        break;
    }
  } catch (e: unknown) {
      console.log('Catched error when processing received mesage: %s', e)
      if(e instanceof Error) {
        return { statusCode: 500, body: e.stack };
      }
  }
  return { statusCode: 200, body: 'Data sent.' };
};
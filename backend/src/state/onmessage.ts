import {Client} from 'pg';
import {Message} from '../types/types';
import {loginUser} from './update/users';
import {addElement,
  delElement,
  resetElement,
  updateElement,
  upvoteElement,
  downvoteElement} from './update/elements';
import {addVote, updateVote, removeVote} from './update/votes';
import {clearVotes, initRounds, addRound, nextRound} from './update/rounds'

export const onMessage = async (message: Message, client: Client) => {
  try {
    console.log('[Magic] Received message of type %s', message.type)
    switch (message.type) {
      case 'login':
        await loginUser(message.payload!.user!,
          message.payload!.color!,
          message.payload!.session!,
          client);
        break;
      case 'addElement':
        await addElement(message.payload!.session!,
          message.payload!.element!,
          message.payload!.state!,
          client);
        break;
      case 'delElement':
        await delElement(message.payload!.session!,
          message.payload!.element!,
          client);
        break;
        case 'updateElement':
          await updateElement(message.payload!.session!,
            message.payload!.element!,
            message.payload!.state!,
            message.payload!.votes!,
            message.payload!.votesround!,
            client)
          break;
      case 'addVote':
        await addVote(message.payload!.session!,
          message.payload!.element!,
          message.payload!.user!,
          message.payload!.color!,
          client)
        break;
      case 'updateVote':
        await updateVote(message.payload!.session!,
          message.payload!.element!,
          message.payload!.user!,
          message.payload!.color!,
          message.payload!.votes!,
          client)
        break;
      case 'removeVote':
        await removeVote(message.payload!.session!,
          message.payload!.element!,
          message.payload!.user!,
          message.payload!.color!,
          client)
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
        throw new Error('Unknown message type')
        break;
    }
  } catch (e: unknown) {
    console.log('Catched error when processing received mesage: %s', e)
    if (e instanceof Error) {
      return {statusCode: 500, body: e.stack};
    }
  }
  return {statusCode: 200, body: 'Data sent.'};
};

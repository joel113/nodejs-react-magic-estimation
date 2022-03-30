import { Message } from './types';
import { Client } from 'pg';
import { loginUser } from './loginuser';
import { addElement, delElement, resetElement, disbuteElement, breakElement, upvoteElement, downvoteElement } from './elements';
import { clearVotes, addRound, nextRound } from './estimation'

export const onMessage = async (message: Message, client: Client) => {
  try {
    console.log("Received message of type %s", message.type)
    switch (message.type) {
      case 'login':
        await loginUser(message.payload!.user!, message.payload!.color!, message.payload!.session!);
        break;
      case 'addElement':
        await addElement(message.payload!.element!, client)
        break;
      case 'delElement':
        await delElement(message.payload!.element!)
        break;
      case 'resetElement':
        await resetElement(message.payload!.element!)
        break;
      case 'disbuteElement':
        await disbuteElement(message.payload!.element!)
        break;
      case 'breakElement':
        await breakElement(message.payload!.element!)
        break;
      case 'upvoteElement':
        await upvoteElement(message.payload!.element!)
        break;
      case 'downvoteElement':
        await downvoteElement(message.payload!.element!)
        break;
      case 'clearVotes':
        await clearVotes()
        break;
      case 'addRound':
        await addRound()
        break;
      case 'nextRound':
        await nextRound()
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
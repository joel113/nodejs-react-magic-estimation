import { Message } from './types';
import { loginUser } from './loginuser';
import { addElement, delElement, resetElement, disbuteElement, breakElement, upvoteElement, downvoteElement, clearVotes, addRound, nextRound } from './setelements';

export const onMessage = async (message: Message) => {
  try {
    switch (message.type) {
      case 'login':
        await loginUser(message.payload!.user!, message.payload!.color!, message.payload!.session!);
        break;
      case 'addElement':
        await addElement(message.payload!.element!)
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
        await nextRout()
        break;
    }
  } catch (e: unknown) {
      if(e instanceof Error) {
        return { statusCode: 500, body: e.stack };
      }
  }
  return { statusCode: 200, body: 'Data sent.' };
};
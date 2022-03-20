import { Message } from './types';

export const onMessage = async (message: Message) => {
  try {
    switch (message.type) {
      case 'login':
        //await loginUser(message.payload!.user!, message.payload!.session!, config);
        break;
    }
  } catch (e: unknown) {
      if(e instanceof Error) {
        return { statusCode: 500, body: e.stack };
      }
  }

  return { statusCode: 200, body: 'Data sent.' };
};
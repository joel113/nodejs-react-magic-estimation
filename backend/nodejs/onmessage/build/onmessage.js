"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const onMessage = async (message) => {
    try {
        switch (message.type) {
            case 'login':
                //await loginUser(message.payload!.user!, message.payload!.session!, config);
                break;
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return { statusCode: 500, body: e.stack };
        }
    }
    return { statusCode: 200, body: 'Data sent.' };
};
exports.onMessage = onMessage;

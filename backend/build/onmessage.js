"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const loginuser_1 = require("./loginuser");
const elements_1 = require("./elements");
const estimation_1 = require("./estimation");
const onMessage = async (message, client) => {
    try {
        console.log("Received message of type %s", message.type);
        switch (message.type) {
            case 'login':
                await (0, loginuser_1.loginUser)(message.payload.user, message.payload.color, message.payload.session);
                break;
            case 'addElement':
                await (0, elements_1.addElement)(message.payload.element, client);
                break;
            case 'delElement':
                await (0, elements_1.delElement)(message.payload.element);
                break;
            case 'resetElement':
                await (0, elements_1.resetElement)(message.payload.element);
                break;
            case 'disbuteElement':
                await (0, elements_1.disbuteElement)(message.payload.element);
                break;
            case 'breakElement':
                await (0, elements_1.breakElement)(message.payload.element);
                break;
            case 'upvoteElement':
                await (0, elements_1.upvoteElement)(message.payload.element);
                break;
            case 'downvoteElement':
                await (0, elements_1.downvoteElement)(message.payload.element);
                break;
            case 'clearVotes':
                await (0, estimation_1.clearVotes)();
                break;
            case 'addRound':
                await (0, estimation_1.addRound)();
                break;
            case 'nextRound':
                await (0, estimation_1.nextRound)();
                break;
        }
    }
    catch (e) {
        console.log('Catched error when processing received mesage: %s', e);
        if (e instanceof Error) {
            return { statusCode: 500, body: e.stack };
        }
    }
    return { statusCode: 200, body: 'Data sent.' };
};
exports.onMessage = onMessage;

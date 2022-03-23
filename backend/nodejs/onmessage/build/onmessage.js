"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const loginuser_1 = require("./loginuser");
const setelements_1 = require("./setelements");
const onMessage = async (message) => {
    try {
        switch (message.type) {
            case 'login':
                await (0, loginuser_1.loginUser)(message.payload.user, message.payload.color, message.payload.session);
                break;
            case 'addElement':
                await (0, setelements_1.addElement)(message.payload.element);
                break;
            case 'delElement':
                await (0, setelements_1.delElement)(message.payload.element);
                break;
            case 'resetElement':
                await (0, setelements_1.resetElement)(message.payload.element);
                break;
            case 'disbuteElement':
                await (0, setelements_1.disbuteElement)(message.payload.element);
                break;
            case 'breakElement':
                await (0, setelements_1.breakElement)(message.payload.element);
                break;
            case 'upvoteElement':
                await (0, setelements_1.upvoteElement)(message.payload.element);
                break;
            case 'downvoteElement':
                await (0, setelements_1.downvoteElement)(message.payload.element);
                break;
            case 'clearVotes':
                await (0, setelements_1.clearVotes)();
                break;
            case 'addRound':
                await (0, setelements_1.addRound)();
                break;
            case 'nextRound':
                await (0, setelements_1.nextRound)();
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

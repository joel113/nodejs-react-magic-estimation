"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const login_user_1 = require("./login-user");
const onMessage = async (message, config) => {
    try {
        switch (message.type) {
            case 'login':
                await (0, login_user_1.loginUser)(message.payload.user, message.payload.session, config);
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

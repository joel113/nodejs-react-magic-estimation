"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_NAME = exports.EXPIRY_TIME_IN_HOUR = void 0;
exports.EXPIRY_TIME_IN_HOUR = process.env.EXPIRY_TIME_IN_HOUR || '16';
exports.TABLE_NAME = process.env.TABLE_NAME || 'magic_estimation';

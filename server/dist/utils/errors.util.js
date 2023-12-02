"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode, details = undefined) {
        super(message);
        this.statusCode = 500;
        this.details = undefined;
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.details = details || null;
    }
}
exports.CustomError = CustomError;

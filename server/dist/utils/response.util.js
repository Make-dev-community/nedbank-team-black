"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFailureResponse = exports.mapSuccessResponse = void 0;
const mapSuccessResponse = (data, status) => {
    return {
        data,
        code: status,
    };
};
exports.mapSuccessResponse = mapSuccessResponse;
const mapFailureResponse = (error) => {
    return {
        code: error.statusCode,
        message: error.message,
        details: error.details
    };
};
exports.mapFailureResponse = mapFailureResponse;

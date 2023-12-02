"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = require("express");
const v1_1 = __importDefault(require("../modules/auth/v1"));
// import { verifyTokenMiddleware } from '../middlewares/auth.middleware';
const v1Router = (0, express_1.Router)({
    mergeParams: true
});
exports.v1Router = v1Router;
v1Router.use('/getOAuthCode', v1_1.default);

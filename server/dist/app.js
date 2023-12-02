"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dotenv from 'dotenv';
// import cors from 'cors';
// import sessions from 'express-session';
// import { logger } from './utils';
// import { morganMiddleware } from './middlewares/morgan.middleware';
// global.logger = logger;
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 3000;
// dotenv.config();
// app.use(
// 	cors({
// 		origin: process.env.SERVER_ALLOWED_ORIGINS,
// 	})
// );
// app.use(morganMiddleware);
// const oneDay = 1000 * 60 * 60 * 24;
// app.use(
// 	sessions({
// 		secret: process.env.SERVER_SESSION_SECRET as string,
// 		saveUninitialized: true,
// 		cookie: { maxAge: oneDay },
// 		resave: false,
// 	})
// );
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const routes_1 = require("./routes");
// import { verifyChannelMiddleware } from './middlewares/auth.middleware';
app.use('/', routes_1.v1Router);
app.listen(port, () => {
    // logger.info(`Server is running on port ${port}`);
    console.log(`Server is running on port ${port}`);
});

import express, { Express } from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import sessions from 'express-session';
// import { logger } from './utils';
// import { morganMiddleware } from './middlewares/morgan.middleware';

// global.logger = logger;

const app: Express = express();
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

app.use(express.json());
app.use(express.urlencoded());

import {
	v1Router
} from './routes';
// import { verifyChannelMiddleware } from './middlewares/auth.middleware';

app.use('/', v1Router);

app.listen(port, () => {
	// logger.info(`Server is running on port ${port}`);
    console.log(`Server is running on port ${port}`);
});

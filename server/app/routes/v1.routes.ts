import { Router } from 'express';
import authModule from '../modules/auth/v1';
import paymentModule from '../modules/payment/v1';
// import { verifyTokenMiddleware } from '../middlewares/auth.middleware';

const v1Router = Router({
    mergeParams: true
});
v1Router.use('/getOAuthCode', authModule);
v1Router.use('/payment', paymentModule);
// v1Router.use('/integration', verifyTokenMiddleware, integrationModule);

export {
    v1Router
}
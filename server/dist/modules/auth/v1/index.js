"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// import { IChat } from './history.types';
router.get('/', (req, res) => {
    // const params = {
    // 	userId: req.session.user.userId,
    // 	chatId: req.params.id,
    // };
    // logger.info(`Read User ${params.userId} History ${params.chatId}`);
    // return authController
    // 	.verify(params)
    // 	.then((data) => {
    // 		res.send(mapSuccessResponse(data, 200));
    // 	})
    // 	.catch((error: CustomError) => {
    // 		return res.status(error.statusCode).send(mapFailureResponse(error));
    // 	});
    res.send({
        q: req.query
    });
});
exports.default = router;

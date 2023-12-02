import { Router, Response } from 'express';
const router = Router();

// import authController from './auth.controller';
import { mapFailureResponse, mapSuccessResponse } from '../../../utils';
import { CustomError } from '../../../utils/errors.util';
// import { IChat } from './history.types';

router.get('/', (req: any, res: Response) => {
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

export default router;

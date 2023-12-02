import { Router, Response } from 'express';
const router = Router();

// import authController from './auth.controller';
import { mapFailureResponse, mapSuccessResponse } from '../../../utils';
import { CustomError } from '../../../utils/errors.util';
// import { IChat } from './history.types';

router.post('/', (req: any, res: Response) => {
	const params = {
		// userId: req.session.user.userId,
		// chatId: req.params.id,
		amount: req.body.amount
	};

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
		url: 'https://api-market.nedbank.co.za/mga/sps/authsvc?PolicyId=urn:ibm:security:authentication:asf:nidlogin&Target=https://api-market.nedbank.co.za/mga/sps/auth&ReturnURL=aHR0cHM6Ly9hcGktbWFya2V0Lm5lZGJhbmsuY28uemEvbWdhL3Nwcy9vYXV0aC9vYXV0aDIwL2F1dGhvcml6ZT9jbGllbnRfaWQ9YzM5YzkzMDctYjBjNy00MWJmLTllN2UtYzI3NWRiMzI3ODU4JmludGVudGlkPTAxSEdNUlk4OUE1M1MwRlhaSzVFQU1DUEFIJnJlZGlyZWN0X3VyaT1odHRwOi8vbG9jYWxob3N0OjMwMDAvZ2V0T0F1dGhDb2RlJnNjb3BlPW9wZW5pZCxhY2NvdW50cyZpdHlwZT1hY2NvdW50cyZzdGF0ZT0xMjM0JnJlc3BvbnNlX3R5cGU9Y29kZSZwcm9tcHQ9bG9naW4mY2xpZW50YXBwbmFtZT1UZWFtIEJsYWNrIEIyQyBBcHAmY2xpZW50b3JnaWQ9NjUyNTBmOTcwY2YyNjc1ZTI4ODIyMzYzJmNsaWVudG9yZ25hbWU9bWFrZS0tLXNhbmRib3gmeGdsb2JhbHRyYWN0aW9uaWQ9ZDM5YjI2YzE2NTZhZTUzOWQ5MTc0OWZjJlVTRVJfTkFNRT11bmRlZmluZWQ=',
		amount: params.amount
	});
});

export default router;

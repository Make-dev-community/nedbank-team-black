export class CustomError extends Error {
	statusCode = 500;
	details = undefined;

	constructor(message: string, statusCode: number, details: any = undefined) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
		this.details = details || null;
	}
}

import { CustomError } from "./errors.util";

const mapSuccessResponse = (
    data: any,
    status: number,
) => {
    return {
        data,
        code: status,
    };
};

const mapFailureResponse = (
    error: CustomError
) => {
    return {
        code: error.statusCode,
        message: error.message,
        details: error.details
    };
};

export {
    mapSuccessResponse,
    mapFailureResponse
}
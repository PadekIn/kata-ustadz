type Errors = {
    message: string;
}[]

export class AppError extends Error {
    code: number;
    errors: Errors;
    constructor(code: number, message: string, errors: Errors = []) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}

export default (code: number, message: string, errors: Errors = []) => {
    return new AppError(code, message, errors);
};
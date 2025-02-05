type Errors = {
    message: string;
}[]
class CustomError extends Error {
    code: number;
    errors: Errors;
    constructor(code: number, message: string, errors: Errors = []) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}

export default (code: number, message: string, errors: Errors = []) => {
    return new CustomError(code, message, errors);
};
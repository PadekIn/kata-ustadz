import * as response from "../utils/response";
export const handleNotFound = (res) => {
    response.res404("Resource not found!", res);
};
export const handleOther = (err, res, next) => {
    if (!err) {
        return next();
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    if (process.env.NODE_ENV === "development" || statusCode === 500) {
        console.log(err.message);
    }
    const message = statusCode === 500 ? "Internal Server Error" : err.message;
    res.json({
        status: err.status || false,
        message,
        data: err.data || null,
    });
};

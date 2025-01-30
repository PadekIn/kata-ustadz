import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
// import apiV1 from '../routes/api/v1/index.js';
import * as ErrorHandler from "../middlewares/errorHandler";

export const app = express();

const corsOptions = {
    // origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));


// apiV1(app);

app.use(ErrorHandler.handleNotFound);
app.use(ErrorHandler.handleOther);
import { Router, Express } from "express";
import contentRouter from "./api/v1/content/content.route";

export default (app: Express) => {
    const router = Router();
    app.use("/api/v1", router);

    contentRouter(router);
};
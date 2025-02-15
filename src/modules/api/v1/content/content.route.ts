import * as ContentController from "./content.controller";
import { Router } from "express";

export default (router: Router) => {
    router.get("/", (req, res) => {res.status(200).json({status: {code: 200, message: "API is working fine"}, data: null});});
    router.get("/content", ContentController.getAllContent);
    router.get("/content/bunny", ContentController.getBunnyContent);
    router.post("/content", ContentController.storeContent);
};
import * as ContentController from "./content.controller";
import { Router } from "express";

export default (router: Router) => {
    router.get("/content", ContentController.getAllContent);
};
import express from "express";
import { retailController } from "../controller/RetailController";

export const retailRouter = express.Router();

retailRouter.post("/new", retailController.createRetail);
retailRouter.get("/all", retailController.getAllRetails);
retailRouter.get("/search", retailController.getRetailByCnpj);
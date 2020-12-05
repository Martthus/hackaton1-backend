import express from "express";
import { productController } from "../controller/ProductController";

export const productRouter = express.Router();

productRouter.post("/new", productController.createProduct);
productRouter.get("/all", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
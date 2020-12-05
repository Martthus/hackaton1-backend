import { ProductInputDTO } from "../model/Product";
import { Request, Response } from "express";
import { productBusiness } from "../business/ProductBusiness";

class ProductController {
    async createProduct(req: Request, res: Response) {
        try {

            const product: ProductInputDTO = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock,
                specifications: req.body.specifications,
                retail: req.body.retail
            }

            const user: any = {
                token: req.headers.authorization as string
            }

            await productBusiness.createProduct(product, user);

            res.status(200).send({ message: "Created new Product!" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getAllProducts(req: Request, res: Response) {
        try {

            const { authorization }: any = req.headers

            const result = await productBusiness.getAllProducts(authorization)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getProductById(req: Request, res: Response) {
        try {

            const input = {
                id: req.params.id,
                token: req.headers.authorization
            }

            const result = await productBusiness.getProductById(input)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export const productController: ProductController = new ProductController();
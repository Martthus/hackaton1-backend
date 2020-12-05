import { productDatabase } from "../data/ProductDatabase";
import { retailDatabase } from "../data/RetailDatabase";
import { CustomError } from "../error/CustomError";
import { ProductInputDTO } from "../model/Product";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class ProductBusiness {
    public async createProduct(product: ProductInputDTO, user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            if (
                !product.name ||
                !product.price ||
                !product.category ||
                !product.stock ||
                !product.specifications ||
                !product.retail
            ) {
                throw new CustomError("Missing input", 422);
            }

            if (verifyToken.role == "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const retail = await retailDatabase.getRetailByCnpj(product.retail)
            
            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const newProduct = await productDatabase.createProduct(
                id, product.name, product.price, product.category, product.stock, product.specifications, product.retail, retail.name
            );

            return newProduct

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getAllProducts(user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user)

            if (verifyToken.role === "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const product = await productDatabase.getAllProducts();

            return product

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getProductById(input: any) {
        try {
            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(input.token)

            if (verifyToken.role === "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const product = await productDatabase.getProductById(input.id);

            if (!input.id) {
                throw new CustomError("invalid id", 401)
            }

            return {
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                category: product.getCategory(),
                stock: product.getStock(),
                specifications: product.getSpecifications()
            }

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }
}

export const productBusiness: ProductBusiness = new ProductBusiness()
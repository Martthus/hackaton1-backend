import { Product } from "../model/Product";
import BaseDataBase from "./BaseDatabase";

class ProductDatabase extends BaseDataBase {

    private static TABLE_PRODUCT = "Product"
    /**
     * createImage
     */
    public async createProduct(
        id: string,
        name: string,
        price: number,
        category: string,
        stock: number,
        specifications: string,
        retail: string,
        retail_name: string
    ): Promise<any> {
        try {
            await BaseDataBase.connection(ProductDatabase.TABLE_PRODUCT)
                .insert({
                    id,
                    name,
                    price,
                    category,
                    stock,
                    specifications,
                    retail,
                    retail_name
                });

            return

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllProducts(): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${ProductDatabase.TABLE_PRODUCT} 
        `);

            return (result[0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getProductById(id: string): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${ProductDatabase.TABLE_PRODUCT} WHERE id = '${id}'
        `);

            return Product.toProductModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export const productDatabase: ProductDatabase = new ProductDatabase();
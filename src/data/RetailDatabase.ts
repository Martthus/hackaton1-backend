import { Retail } from "../model/Retail";
import BaseDataBase from "./BaseDatabase";

class RetailDatabase extends BaseDataBase {

    private static TABLE_RETAIL = "Retail"
    /**
     * createImage
     */
    public async createRetail(
        id: string,
        name: string,
        cnpj: string,
        cep: string,
        address: string,
        owner: string,
        owner_name: string
    ): Promise<any> {
        try {
            await BaseDataBase.connection(RetailDatabase.TABLE_RETAIL)
                .insert({
                    id,
                    name,
                    cnpj,
                    cep,
                    address,
                    owner,
                    owner_name
                });

            return

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getAllRetails(token: string): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${RetailDatabase.TABLE_RETAIL} 
        `);

            return (result[0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getRetailByCnpj(cnpj: string): Promise<any> {
        try {
            const result = await BaseDataBase.connection.raw(`
          SELECT * from ${RetailDatabase.TABLE_RETAIL} WHERE cnpj = '${cnpj}'
        `);

            return Retail.toRetailModel(result[0][0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}

export const retailDatabase: RetailDatabase = new RetailDatabase();
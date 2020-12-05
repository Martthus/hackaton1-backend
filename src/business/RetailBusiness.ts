import { retailDatabase } from "../data/RetailDatabase";
import { userDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { RetailInputDTO } from "../model/Retail";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class RetailBusiness {
    public async createRetail(retail: RetailInputDTO, user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user.token)

            const ownerName = await userDatabase.userById(verifyToken.id)

            if (!retail.name || !retail.cnpj || !retail.address) {
                throw new CustomError("Missing input", 422);
            }

            if (verifyToken.role == "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const newRetail = await retailDatabase.createRetail(
                id, retail.name, retail.cnpj,retail.cep, retail.address, verifyToken.id, ownerName.name
            );

            return newRetail

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getAllRetails(user: any) {
        try {

            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(user)

            if (verifyToken.role === "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const retail = await retailDatabase.getAllRetails(verifyToken.role);

            return retail

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    public async getRetailById(input: any) {
        try {
            const authenticator = new Authenticator();

            const verifyToken = authenticator.getData(input.token)

            if (verifyToken. role === "NORMAL") {
                throw new CustomError("Not authorized", 401);
            }

            const retail = await retailDatabase.getRetailByCnpj(input.cnpj);

            if (!input.cnpj) {
                throw new CustomError("invalid cnpj", 401)
            }

            return {
                id: retail.getId(),
                name: retail.getName(),
                cnpj: retail.getCnpj(),
                address: retail.getAddress(),
                owner: retail.getOwner(),
            }

        } catch (error) {
            throw new CustomError(error.message, error.statusCode)
        }
    }
}

export const retailBusiness: RetailBusiness = new RetailBusiness()
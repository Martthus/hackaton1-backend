import { RetailInputDTO } from "../model/Retail";
import { Request, Response } from "express";
import { retailBusiness } from "../business/RetailBusiness";

class RetailController {
    async createRetail(req: Request, res: Response) {
        try {

            const retail: RetailInputDTO = {
                name: req.body.name,
                cnpj: req.body.cnpj,
                cep: req.body.cep,
                address: req.body.address,
            }

            const user: any = {
                token: req.headers.authorization as string
            }

            await retailBusiness.createRetail(retail, user);

            res.status(200).send({ message: "Created new Retail!" });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getAllRetails(req: Request, res: Response) {
        try {

            const { authorization }: any = req.headers

            const result = await retailBusiness.getAllRetails(authorization)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getRetailByCnpj(req: Request, res: Response) {
        try {

            const input = {
                cnpj: req.query.cnpj,
                token: req.headers.authorization
            }

            const result = await retailBusiness.getRetailById(input)

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}

export const retailController: RetailController = new RetailController();
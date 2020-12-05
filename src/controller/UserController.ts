import { Request, Response } from "express";
import { userBusiness } from "../business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../model/User";

class UserController {
    /**
     * signup
     */
    public async signup(req: Request, res: Response) {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                cpf: req.body.cpf,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const token = await userBusiness.signup(input);

            res.status(200).send({ token });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
    /**
     * login
     */
    public async login(req: Request, res: Response) {
        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await userBusiness.login(loginData);

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

export const userController: UserController = new UserController();
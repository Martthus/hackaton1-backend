import { CustomError } from "../error/CustomError";
import { ROLE, User } from "../model/User";
import BaseDataBase from "./BaseDatabase";

class UserDatabase extends BaseDataBase {

    private static TABLE_NAME = "UserRetailer"
    /**
     * signup
     */
    public async signup(
        id: string,
        name: string,
        cpf: string,
        email: string,
        password: string,
        role: ROLE
    ): Promise<void> {
        try {
            await BaseDataBase.connection
                .insert({
                    id, name, cpf, email, password, role
                })
                .into(UserDatabase.TABLE_NAME)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);

        }
    }
    /**
     * login
     */
    public async login(
        email: string
    ): Promise<any> {
        try {
            const login = await BaseDataBase.connection
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ email });

            if (login.length <= 0) {
                throw new CustomError("Invalid email", 401);
            }

            return User.toUserModel(login[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async userById(
        id: string
    ): Promise<any> {
        try {
            const search = await BaseDataBase.connection
                .select("*")
                .from(UserDatabase.TABLE_NAME)
                .where({ id });

            if (search.length <= 0) {
                throw new CustomError("Invalid email", 401);
            }

            return User.toUserModel(search[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export const userDatabase: UserDatabase = new UserDatabase();
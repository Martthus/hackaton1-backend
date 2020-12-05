import { userDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { LoginInputDTO, UserInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

class UserBusiness {
    /**
     * signup
     */
    public async signup(user: UserInputDTO) {
        try {
            if (!user.name || !user.cpf || !user.email || !user.password || !user.role) {
                throw new CustomError("Missing input", 422);
            }

            if (user.email.indexOf("@") === -1) {
                throw new CustomError("Invalid email", 422);
            }

            if (user.password.length < 6) {
                throw new CustomError("Invalid password", 422);
            }

            if (user.role !== "ADMIN" && "NORMAL") {
                throw new CustomError("ADMIN or NORMAL", 422);
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();


            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);

            await userDatabase.signup(id, user.name, user.cpf, user.email, hashPassword, user.role);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });

            return accessToken;
        } catch (error) {
            throw new CustomError(error.message, error.statusCode);
        }

    }
    /**
     * login
     */
    public async login(
        user: LoginInputDTO
    ) {
        try {
            if (!user.email || !user.password) {
                throw new CustomError("Missing input", 422);
            }

            const userFromDB = await userDatabase.login(user.email);

            const hashManager = new HashManager();
            const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

            if (!hashCompare) {
                throw new CustomError("Invalid credentials", 401);
            }

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

            if (!hashCompare) {
                throw new CustomError("Invalid Password!", 422);
            }

            return accessToken;
        } catch (error) {
            throw new CustomError(error.message, error.statusCode);
        }

    }
}

export const userBusiness: UserBusiness = new UserBusiness()
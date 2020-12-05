export class User {
    constructor(
        private id: string,
        private name: string,
        private cpf: string,
        private email: string,
        private password: string,
        private role: string
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getCpf() {
        return this.cpf;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setCpf(cpf: string) {
        this.cpf = cpf;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setRole(role: string) {
        this.role = role;
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.cpf, user.email, user.password, user.role);
    }
}

export enum ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserInputDTO {
    name: string;
    cpf: string;
    email: string;
    password: string;
    role: ROLE;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}
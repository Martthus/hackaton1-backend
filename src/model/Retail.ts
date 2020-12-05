export class Retail {
    constructor(
        private id: string,
        private name: string,
        private cnpj: string,
        private cep: string,
        private address: string,
        private owner: string,
        private ownerName: string
    ) { }

    getId(): string { return this.id; }

    getName(): string { return this.name; }

    getCnpj(): string { return this.cnpj; }

    getCep(): string { return this.cep; }

    getAddress(): string { return this.address; }

    getOwner(): string { return this.owner; }

    getOwnerName(): string { return this.ownerName }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setCnpj(cnpj: string) {
        this.cnpj = cnpj;
    }

    setCep(cep: string) {
        this.cep = cep;
    }

    setAddress(address: string) {
        this.address = address;
    }

    setOwner(owner: string) {
        this.owner = owner;
    }

    setOwnerName(ownerName: string) {
        this.ownerName = ownerName;
    }

    static toRetailModel(retail: any): Retail {
        return new Retail(retail.id, retail.name, retail.cnpj, retail.cep, retail.address, retail.owner, retail.ownerName);
    }
}

export interface RetailInputDTO {
    name: string,
    cnpj: string,
    cep: string,
    address: string,
}
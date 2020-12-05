export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private category: string,
        private stock: number,
        private specifications: string,
        private retail: string,
        private retailName: string
    ) { }

    getId(): string { return this.id; }

    getName(): string { return this.name; }

    getPrice(): number { return this.price; }

    getCategory(): string { return this.category; }

    getStock(): number { return this.stock; }

    getSpecifications(): string { return this.specifications; }

    getRetail(): string { return this.retail; }

    getRetailName(): string { return this.retailName; }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setPrice(price: number) {
        this.price = price;
    }

    setCategory(category: string) {
        this.category = category;
    }

    setStock(stock: number) {
        this.stock = stock;
    }

    setRetail(retail: string) {
        this.retail = retail
    }

    setRetailName(retailName: string) {
        this.retailName = retailName
    }

    static toProductModel(product: any): Product {
        return new Product(product.id, product.name, product.price, product.category, product.stock, product.specifications, product.retail, product.retailName);
    }
}

export interface ProductInputDTO {
    name: string,
    price: number,
    category: string,
    stock: number,
    specifications: string,
    retail: string
}
Create Table User - Retailer(
    id VARCHAR(64) PRIMARY KEY NOT NULL,
    name VARCHAR(64) NOT NULL,
    cpf FLOAT UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    role VARCHAR(64) DEFAULT("NORMAL")
);

Create Table Retail(
    id VARCHAR(64) PRIMARY KEY NOT NULL,
    name VARCHAR(64) NOT NULL,
    cnpj FLOAT UNIQUE NOT NULL,
    address VARCHAR(64) NOT NULL,
    owner VARCHAR(64) NOT NULL,
    FOREIGN KEY(owner) REFERENCES User(id)
);

Create Table Product(
    id VARCHAR(64) PRIMARY KEY NOT NULL,
    name VARCHAR(64) NOT NULL,
    price FLOAT NOT NULL,
    category VARCHAR(64) NOT NULL,
    stock VARCHAR(64) NOT NULL,
    specifications VARCHAR(240) NOT NULL,
    FOREIGN KEY(id) REFERENCES Retail(id)
)
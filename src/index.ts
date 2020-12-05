import { AddressInfo } from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import cors from 'cors'
import { retailRouter } from "./routes/retailRouter";
import { productRouter } from "./routes/productRouter";


const app = express();

app.use(express.json());
app.use(cors())
app.use("/user", userRouter);
app.use("/retail", retailRouter)
app.use("/product", productRouter)

const server = app.listen(3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
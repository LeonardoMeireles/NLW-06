import "reflect-metadata"; 
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"

import {router} from "./routes";

import "./database";

//@types/express
const app = express(); //inicializa express

app.use(express.json());

app.use(router);

//Middleware precisa ser colocado depois das rotas, pois os erros só acontecem depois que o Controller e o Service é chamado
app.use( (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({ //status(400) é feito para tratar erros
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

//http://localhost:3000
app.listen(3000, () => console.log("Server is running"));
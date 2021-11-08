// const express = require('express');

import  Express  from "express";
import  Cors from 'cors';
import dotenv from 'dotenv';
import {conectarDB, getDB} from './db/db.js'
import rutasProducto from "./views/productos/rutas.js";

dotenv.config({path:'./.env'});

const app = Express();
app.use(Express.json())
app.use(Cors());
app.use(rutasProducto);

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Listening on ${process.env.PORT}`);
    }); // listening port
};

conectarDB(main);
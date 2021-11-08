
// const express = require('express');

import  Express  from "express";
import  {MongoClient, ObjectId}  from "mongodb";
import  Cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});

// const cors = require('cons');

const cadenaConexion= process.env.DATABASE_URL;

const cliente = new MongoClient(cadenaConexion, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let baseDatos;

const app = Express();
app.use(Express.json())
app.use(Cors());

app.get('/productos', (req, res)=>{
    console.log('get to /productos');
    baseDatos
    .collection('producto')
    .find({})
   .limit(50)
    .toArray((err, result)=>{
        if (err){
            res.status(400).send("Error consultando el producto")
        } else { 
            res.json(result);
        }
    })
});

app.post('/productos/nuevo',(req, res)=>{
    console.log('post to /productos/nuevo ',  req.body);
    const datosProducto = req.body;

    console.log('Llaves: ', Object.keys(datosProducto))

    try{
        if(
            Object.keys(datosProducto).includes('nombre') &&
            Object.keys(datosProducto).includes('descripcion') &&
            Object.keys(datosProducto).includes('precio') &&
            Object.keys(datosProducto).includes('estado')
        ){
            // Agregar codigo para crear producto en DB
            baseDatos.collection('producto').insertOne(datosProducto, (err, result)=>{
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);

        }
    }catch{
            res.sendStatus(500);
    }
});

app.patch('/productos/actualizar', (req,res)=>{
    console.log('\nPATCH to /productos/actualizar ',  req.body);
    const edicion = req.body;
    // const idEdicion = new  ObjectId(edicion.id)
    // console.log(edicion, edicion.id);
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    // console.log(filtroProducto);
    const operacion = {
        $set:edicion,
    }
    baseDatos
    .collection('producto')
    .findOneAndUpdate(
        filtroProducto,
        operacion,
        {upsert:true, returnOriginal: true},
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el producto', err);
                res.sendStatus(500);
            } else {
                console.log('Produto Actualizado con exito')
                res.sendStatus(200);
            }
        }); 
});

app.delete('/productos/eliminar', (req,res)=>{
    const filtroProducto = { _id: new ObjectId(req.body.id)}
    baseDatos.collection('producto').deleteOne(filtroProducto, (err, result) =>{
        if (err) {
            console.error('Error al eliminar el producto.');
            res.sendStatus(500);
        } else {
            console.log('Producto eliminado exitosamente');
            res.sendStatus(200);
        }
    })
})


const main = () => {
    cliente.connect((err, bd) =>{
        if(err){
            console.error('Error al conectar a DB.')
        }
        baseDatos = cliente.db('Libreria');
        console.log('Conexion exitosa')
        return app.listen(process.env.PORT, () => {
        console.log(`Listening on ${process.env.PORT}`) }); // listening port
    })
};

main();
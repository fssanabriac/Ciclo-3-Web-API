
import { ObjectId } from 'mongodb';
import {getDB} from '../../db/db.js'

const queryTodosProductos = async(callback) => {
    const baseDatos = getDB();

    await baseDatos
        .collection('producto')
        .find({})
        .limit(50)
        .toArray(callback);
};

const obtenerProducto = async(id, callback) => {
    const baseDatos = getDB();

    await baseDatos.collection('producto').findOne({_id:new ObjectId(id)}, callback);
}

const crearProducto = async(datosProducto, callback) => {
    // const datosProducto = req.body;

    console.log('Llaves: ', Object.keys(datosProducto))

    if (
        Object.keys(datosProducto).includes('description') &&
        Object.keys(datosProducto).includes('price') &&
        Object.keys(datosProducto).includes('state') 
    ) {
            // Agregar codigo para crear producto en DB
        const baseDatos = getDB();
        await baseDatos.collection('producto').insertOne(datosProducto, callback 
        );
    } else {
        return "Error";
    };
};

const actualizarProducto = async(id, edicion, callback) =>{
    const filtroProducto = { _id: new ObjectId(id) };

    const operacion = {
        $set:edicion,
    }
    const baseDatos = getDB();

    await baseDatos
    .collection('producto')
    .findOneAndUpdate(
        filtroProducto,
        operacion,
        {upsert:true, returnOriginal: true}, callback);
        // (err, result) => {
        //     if (err) {
        //         console.error('Error al actualizar el producto', err);
        //         res.sendStatus(500);
        //     } else {
        //         console.log('Produto Actualizado con exito')
        //         res.sendStatus(200);
        //     }
        // }); 
};

const eliminarProducto = async(id, callback) =>{
    const filtroProducto = { _id: new ObjectId(id)}
    const baseDatos = getDB();

    baseDatos.collection('producto').deleteOne(filtroProducto, callback);
}

export {queryTodosProductos, crearProducto, actualizarProducto, eliminarProducto, obtenerProducto};
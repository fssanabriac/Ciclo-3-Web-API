
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

const crearProducto = async(datosProducto, callback) => {
    // const datosProducto = req.body;

    console.log('Llaves: ', Object.keys(datosProducto))

    if (
        Object.keys(datosProducto).includes('nombre') &&
        Object.keys(datosProducto).includes('descripcion') &&
        Object.keys(datosProducto).includes('precio') &&
        Object.keys(datosProducto).includes('estado')
    ) {
            // Agregar codigo para crear producto en DB
        const baseDatos = getDB();
        await baseDatos.collection('producto').insertOne(datosProducto, callback 
        );
    } else {
        return "Error";
    };
};

const actualizarProducto = async(edicion, callback) =>{
    const filtroProducto = { _id: new ObjectId(edicion.id) };

    delete edicion.id;
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

export {queryTodosProductos, crearProducto, actualizarProducto, eliminarProducto};
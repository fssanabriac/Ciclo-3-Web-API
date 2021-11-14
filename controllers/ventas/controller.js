
import { ObjectId } from 'mongodb';
import {getDB} from '../../db/db.js'

const queryTodosVentas = async(callback) => {
    const baseDatos = getDB();

    await baseDatos
        .collection('venta')
        .find({})
        .limit(50)
        .toArray(callback);
};

const obtenerVenta = async(id, callback) => {
    const baseDatos = getDB();

    await baseDatos.collection('venta').findOne({_id:new ObjectId(id)}, callback);
}

const crearVenta = async(datosProducto, callback) => {
    // const datosProducto = req.body;

    console.log('Llaves: ', Object.keys(datosProducto))

    if (
        Object.keys(datosProducto).includes('idSale') &&
        Object.keys(datosProducto).includes('idProduct') &&
        Object.keys(datosProducto).includes('quantity') &&
        Object.keys(datosProducto).includes('unitValue') &&
        Object.keys(datosProducto).includes('totalValue') &&
        Object.keys(datosProducto).includes('date') &&
        Object.keys(datosProducto).includes('idBuyer') &&
        Object.keys(datosProducto).includes('nameBuyer') &&
        Object.keys(datosProducto).includes('nameSeller') 
    ) {
            // Agregar codigo para crear producto en DB
        const baseDatos = getDB();
        await baseDatos.collection('venta').insertOne(datosProducto, callback 
        );
    } else {
        return "Error";
    };
};

const actualizarVenta = async(id, edicion, callback) =>{
    const filtroVenta = { _id: new ObjectId(id) };

    const operacion = {
        $set:edicion,
    }
    const baseDatos = getDB();

    await baseDatos
    .collection('venta')
    .findOneAndUpdate(
        filtroVenta,
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

const eliminarVenta = async(id, callback) =>{
    const filtroVenta = { _id: new ObjectId(id)}
    const baseDatos = getDB();

    baseDatos.collection('venta').deleteOne(filtroVenta, callback);
}

export {queryTodosVentas, crearVenta, actualizarVenta, eliminarVenta, obtenerVenta};
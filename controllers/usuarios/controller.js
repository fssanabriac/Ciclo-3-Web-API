
import { ObjectId } from 'mongodb';
import {getDB} from '../../db/db.js'

const queryTodosUsuarios = async(callback) => {
    const baseDatos = getDB();

    await baseDatos
        .collection('usuario')
        .find({})
        .limit(50)
        .toArray(callback);
};

const obtenerUsuario = async(id, callback) => {
    const baseDatos = getDB();

    await baseDatos.collection('usuario').findOne({_id:new ObjectId(id)}, callback);
}

const crearUsuario = async(datosProducto, callback) => {
    // const datosProducto = req.body;

    console.log('Llaves: ', Object.keys(datosProducto))

    if (
        Object.keys(datosProducto).includes('name') &&
        Object.keys(datosProducto).includes('idNumber') &&
        Object.keys(datosProducto).includes('role') &&
        Object.keys(datosProducto).includes('status')
    ) {
            // Agregar codigo para crear producto en DB
        const baseDatos = getDB();
        await baseDatos.collection('usuario').insertOne(datosProducto, callback 
        );
    } else {
        return "Error";
    };
};

const actualizarUsuario = async(id, edicion, callback) =>{
    const filtroUsuario = { _id: new ObjectId(id) };

    const operacion = {
        $set:edicion,
    }
    const baseDatos = getDB();

    await baseDatos
    .collection('usuario')
    .findOneAndUpdate(
        filtroUsuario,
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

const eliminarUsuario = async(id, callback) =>{
    const filtroUsuario = { _id: new ObjectId(id)}
    const baseDatos = getDB();

    baseDatos.collection('usuario').deleteOne(filtroUsuario, callback);
}

export {queryTodosUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuario};
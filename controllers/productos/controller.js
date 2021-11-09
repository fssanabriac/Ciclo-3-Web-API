
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
        baseDatos.collection('producto').insertOne(datosProducto, callback 
        );
    } else {
        return "Error";
    };
};

export {queryTodosProductos, crearProducto};
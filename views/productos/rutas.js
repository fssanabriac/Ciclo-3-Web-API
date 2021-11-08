import Express from 'express';
import {getDB} from '../../db/db.js'

const rutasProducto = Express.Router();

rutasProducto.route('/productos').get((req, res)=>{
    console.log('get to /productos');
    const baseDatos = getDB();

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

rutasProducto.route('/productos/nuevo').post((req, res)=>{
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
            const baseDatos = getDB();
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

rutasProducto.route('/productos/actualizar').patch((req,res)=>{
    console.log('\nPATCH to /productos/actualizar ',  req.body);
    const edicion = req.body;
    const filtroProducto = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set:edicion,
    }
    const baseDatos = getDB();

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

rutasProducto.route('/productos/eliminar').delete((req,res)=>{
    const filtroProducto = { _id: new ObjectId(req.body.id)}
    const baseDatos = getDB();

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

export default rutasProducto;
import Express from 'express';
import { queryTodosProductos, crearProducto, actualizarProducto } from '../../controllers/productos/controller.js';
import {getDB} from '../../db/db.js'

const rutasProducto = Express.Router();

const callbackGenerico = (res) => (err, result) => {
    if (err) {
        res.status(500).send("Error consultando el producto")
    } else {
        res.json(result);
    };
};

rutasProducto.route('/productos').get((req, res)=>{
    console.log('\tGET to /productos');

    queryTodosProductos(callbackGenerico(res));
});

rutasProducto.route('/productos/nuevo').post((req, res)=>{
    console.log('\tPOST to /productos/nuevo ', req.body);
    
    crearProducto(req.body,callbackGenerico(res));
});

rutasProducto.route('/productos/actualizar').patch((req,res)=>{
    console.log('\tPATCH to /productos/actualizar ',  req.body);
   
    actualizarProducto(req.body, callbackGenerico(res));
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
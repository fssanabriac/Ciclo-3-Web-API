import Express from 'express';
import {
    queryTodosProductos, 
    crearProducto,
    actualizarProducto,
    eliminarProducto } from '../../controllers/productos/controller.js';

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
    console.log('\tDELETE to /productos/eliminar ',  req.body);
    
    eliminarProducto(req.body.id, callbackGenerico(res));
})

export default rutasProducto;
import Express from 'express';
import {
    queryTodosProductos, 
    crearProducto,
    actualizarProducto,
    eliminarProducto, 
    obtenerProducto} from '../../controllers/productos/controller.js';

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

rutasProducto.route('/productos/').post((req, res)=>{
    console.log('\tPOST to /productos/nuevo ', req.body);
    
    crearProducto(req.body,callbackGenerico(res));
});

rutasProducto.route('/productos/:id').get((req, res)=>{
    console.log('\tGET to /productos/:id - Only one item');

    obtenerProducto(req.params.id, callbackGenerico(res));
});

rutasProducto.route('/productos/:id').patch((req,res)=>{
    console.log('\tPATCH to /productos/:id ',  req.body);
   
    actualizarProducto(req.params.id, req.body, callbackGenerico(res));
});

rutasProducto.route('/productos/:id').delete((req,res)=>{
    console.log('\tDELETE to /productos/:id ',  req.body);
    
    eliminarProducto(req.params.id, callbackGenerico(res));
})

export default rutasProducto;


import Express from 'express';
import {
    queryTodosVentas, 
    crearVenta,
    actualizarVenta,
    eliminarVenta, 
    obtenerVenta} from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const callbackGenerico = (res) => (err, result) => {
    if (err) {
        res.status(500).send("Error consultando el venta")
    } else {
        res.json(result);
    };
};

rutasVenta.route('/ventas').get((req, res)=>{
    console.log('\tGET to /ventas');

    queryTodosVentas(callbackGenerico(res));
});

rutasVenta.route('/ventas').post((req, res)=>{
    console.log('\tPOST to /ventas', req.body);
    
    crearVenta(req.body,callbackGenerico(res));
});

rutasVenta.route('/ventas/:id').get((req, res)=>{
    console.log('\tGET to /ventas/:id - Only one item');

    obtenerVenta(req.params.id, callbackGenerico(res));
});

rutasVenta.route('/ventas/:id').patch((req,res)=>{
    console.log('\tPATCH to /ventas/:id ',  req.body);
   
    actualizarVenta(req.params.id, req.body, callbackGenerico(res));
});

rutasVenta.route('/ventas/:id').delete((req,res)=>{
    console.log('\tDELETE to /ventas/:id ',  req.body);
    
    eliminarVenta(req.params.id, callbackGenerico(res));
})

export default rutasVenta;
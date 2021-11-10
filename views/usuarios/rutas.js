
import Express from 'express';
import {
    queryTodosUsuarios, 
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario, 
    obtenerUsuario} from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const callbackGenerico = (res) => (err, result) => {
    if (err) {
        res.status(500).send("Error consultando el usuario")
    } else {
        res.json(result);
    };
};

rutasUsuario.route('/usuarios').get((req, res)=>{
    console.log('\tGET to /usuarios');

    queryTodosUsuarios(callbackGenerico(res));
});

rutasUsuario.route('/usuarios').post((req, res)=>{
    console.log('\tPOST to /usuarios', req.body);
    
    crearUsuario(req.body,callbackGenerico(res));
});

rutasUsuario.route('/usuarios/:id').get((req, res)=>{
    console.log('\tGET to /usuarios/:id - Only one item');

    obtenerUsuario(req.params.id, callbackGenerico(res));
});

rutasUsuario.route('/usuarios/:id').patch((req,res)=>{
    console.log('\tPATCH to /usuarios/:id ',  req.body);
   
    actualizarUsuario(req.params.id, req.body, callbackGenerico(res));
});

rutasUsuario.route('/usuarios/:id').delete((req,res)=>{
    console.log('\tDELETE to /usuarios/:id ',  req.body);
    
    eliminarUsuario(req.params.id, callbackGenerico(res));
})

export default rutasUsuario;
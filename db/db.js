
import  {MongoClient}  from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});
const cadenaConexion= process.env.DATABASE_URL;

const cliente = new MongoClient(cadenaConexion, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let baseDatos;

const conectarDB = (callback) =>{
    cliente.connect((err, bd) => {
        if (err) {
            console.error('Error al conectar a DB.')
        }
        baseDatos = cliente.db('Libreria');
        console.log('Conexion exitosa')
        return callback();
    });
};

const getDB = () => {
    return baseDatos;
};

export {conectarDB, getDB};
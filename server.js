import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {sequelize} from './server/config/mysql.config.js';
import userRoutes from './server/routes/user.routes.js';


const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({extended:true}));
app.use(express.json());


//app.set(...) nos permite renderizar paginas web usando "template files". Este tipo de archivos poseen información predefinida  
app.set('view engine','ejs');

//accedemos a la información que esté contenida en la carpeta "public"
app.use(express.static(__dirname + '/public'));

app.use(userRoutes);

async function main(){
    try{
        await sequelize.sync();
        console.log("Conexion con la base de datos exitosa");
        app.listen(3000,()=>{
            console.log("Escuchando al puerto 3000")
        });
    }catch(err){
        console.log("Error al conectarse con la base de datos o con el servidor",err)
    }
};

main();



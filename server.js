import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import xl from 'excel4node'
import fs from 'fs';
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

//Fechas
// let date = new Date();
// let fehcaDía = date.getUTCDate();
// let fechaMes = (date.getUTCMonth())+1;
// let fechaAno = date.getUTCFullYear();



//rutas y funciones de respuesta 
// app.get("/",function(req,res){
//     res.render("home")
// });

// app.get("/descargar-excel",function(req,res){

//     //configurar excel4node
//     //crear una nueva instancia de Workbook
//     var wb = new xl.Workbook();
//     //definir nombre del archivo
//     let nombreArchivo = "todosUsuarios"+ fehcaDía + "_" + fechaMes + "_" +fechaAno;
//     //definir nombre de la(s) pestaña(s)
//     var ws = wb.addWorksheet("Todos los trabajadores");

//     //Crear estilos
//     var cualColumna = wb.createStyle({
//         font: {
//             name: 'Arial',
//             color: '#000000',
//             size: 12,
//             bold:true
//         }
//     });

//     var contenidoEstilo = wb.createStyle({
//         font: {
//             name: 'Arial',
//             color: '#494949',
//             size: 11,
//         }
//     });

//     //nombres de las columnas - dentro de "cell" el primer número indica la fila y el segundo la columna
//     ws.cell(1,1).string("nombre").style(cualColumna);
//     ws.cell(1,2).string("apellido").style(cualColumna);


//     let cualFila = 2

//     //creacion de datos
//     usuarios.forEach(usuarioActual => {
//         ws.cell(cualFila,1).string(usuarioActual.nombre).style(contenidoEstilo);
//         ws.cell(cualFila,2).string(usuarioActual.apellido).style(contenidoEstilo);
//         cualFila++
//     });



//     //ruta del archivo donde se va a guardar
//     const pathExcel = path.join(__dirname , nombreArchivo +'.xlsx');

//     //escribir o guardar el archivo 
//     wb.write(pathExcel,function(err,stats){
//         if(err) console.log(err);
//         else{
//             //funcion para descargar archivo
//             function downloadFile(){res.download(pathExcel)};
//             downloadFile();

//             //borrar archivo
//             fs.rm(pathExcel,function(err){
//                 if(err) console.log(err)
//                 else{
//                     console.log("Archivo descargado y borrado correctamente")
//                 }
//             })
//         }
//     })


// });

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



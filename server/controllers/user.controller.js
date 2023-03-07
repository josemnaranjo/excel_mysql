import {User} from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';
import {wb, colEstilo, contenidoEstilo} from '../config/excel4node.config.js'
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let date = new Date();
let fechaMes = (date.getUTCMonth())+1;
let fechaAno = date.getFullYear();

export const addUser = async(req,res)=>{
    try{
        const newUser = await User.create({
            name:req.body.name,
            lastName:req.body.lastName,
            horaInicio: req.body.horaInicio,
            horaFinal:req.body.horaFinal
        });
        res.json({message:"Usuario creado exitosamente", newUser})

    }catch(err){
        res.status(500).json({error:"Algo salió mal"})
    }
};


export const getUsers = async(req,res)=>{
    try{
        //definir el nombre del archivo excel
        let nombreArchivo = "usuarios" + fechaMes + "_" + fechaAno;
        //definir nombre de la pestaña
        var ws = wb.addWorksheet("Informe de usuarios");

        ws.cell(1,1).string("nombre").style(colEstilo);
        ws.cell(1,2).string("apellido").style(colEstilo);
        ws.cell(1,3).string("Hora Inicio").style(colEstilo);
        ws.cell(1,4).string("Hora Final").style(colEstilo);

        //obtener a los usuarios
        const users = await User.findAll();


        let cualFila = 2
        users.forEach(usuarioActual => {
            ws.cell(cualFila,1).string(usuarioActual.name).style(contenidoEstilo);
            ws.cell(cualFila,2).string(usuarioActual.lastName).style(contenidoEstilo);
            ws.cell(cualFila,3).string(usuarioActual.horaInicio).style(contenidoEstilo);
            ws.cell(cualFila,4).string(usuarioActual.horaFinal).style(contenidoEstilo);
            cualFila++
        });

        const pathExcel = path.join(__dirname,nombreArchivo + '.xlsx');

        wb.write(pathExcel,function(err,stats){
            if(err) console.log(err);
            else{
                function downloadFile(){res.download(pathExcel)};
                downloadFile();
                fs.rm(pathExcel,function(err){
                    if(err) console.log(err)
                    else{
                        console.log("Archivo descargado y borrado correctamente")
                    }
                })
            }
        })
    }catch(err){
        res.status(500).json({error:"Algo salió mal"})
    }
};



import {User} from '../models/User.js';
import path from 'path';
import xl from 'excel4node';
import fs from 'fs';


export const addUser = async(req,res)=>{
    try{
        const newUser = await User.create({
            name:req.body.name,
            lastName:req.body.lastName
        });
        res.json({message:"Usuario creado exitosamente", newUser})

    }catch(err){
        res.status(500).json({error:"Algo salió mal"})
    }
};


export const getUsers = async(req,res)=>{
    try{
        let date = new Date();
        let fechaMes = (date.getUTCMonth())+1;
        let fechaAno = date.getFullYear();


        //creación de nueva instancia de WorkBook
        var wb = new xl.Workbook();
        //definir el nombre del archivo excel
        let nombreArchivo = "usuarios" + fechaMes + "_" + fechaAno;
        //definir nombre de la pestaña
        var ws = wb.addWorksheet("Informe de usuarios");
        //definir estilos
        var colEstilo = wb.createStyle({
            font:{
                name: 'Arial',
                color:'#000000',
                size: 12,
                bold: true
            }
        });

        var contenidoEstilo = wb.createStyle({
            font:{
                name: 'Arial',
                color:'#494949',
                size: 11,
            }
        });

        ws.cell(1,1).string("nombre").style(colEstilo);
        ws.cell(1,2).string("apellido").style(colEstilo);

        //obtener a los usuarios
        const users = await User.findAll();

        let cualFila = 2
        users.forEach(usuarioActual => {
            ws.cell(cualFila,1).string(usuarioActual.name).style(contenidoEstilo);
            ws.cell(cualFila,2).string(usuarioActual.lastName).style(contenidoEstilo);
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
}

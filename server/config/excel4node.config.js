import xl from 'excel4node';


const wb = new xl.Workbook();

const colEstilo = wb.createStyle({
    font:{
        name: 'Arial',
        color:'#000000',
        size: 12,
        bold: true
    }
});


const contenidoEstilo = wb.createStyle({
    font:{
        name: 'Arial',
        color:'#494949',
        size: 11,
    }
});


export {wb , colEstilo, contenidoEstilo}
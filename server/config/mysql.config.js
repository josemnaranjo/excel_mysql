import  Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    'prueba_excel_mysql',
    'root',
    'josemnaranjoc',
    {
        host:'localhost',
        dialect:'mysql'
    }
);
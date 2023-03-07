import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.config.js";

export const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
    },
    lastName:{
        type: DataTypes.STRING,
    },
    horaInicio: {
        type: DataTypes.TIME,
    },
    horaFinal:{
        type:DataTypes.TIME
    }
},{
    timestamps: false
})
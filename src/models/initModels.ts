import {Rol} from '../models/Rol.model'
import { Usuario } from './Usuario.model'
import { Sequelize, DataType } from 'sequelize-typescript'
import { UserController } from 'src/user/user.controller'

export function initModels(sequelize:Sequelize){
    Rol.init({
        id:{
            primaryKey:true,
            type:DataType.INTEGER,
            autoIncrement:true,
            allowNull:false
        },
        nombre:{
            type:DataType.STRING,
            allowNull:false
        }
    },{timestamps:false,sequelize})

    Usuario.init({
        id:{
            autoIncrement:true,
            type:DataType.INTEGER.UNSIGNED,
            primaryKey:true,
            allowNull:false
        },
    
        email:{
            type:DataType.STRING,
            allowNull:false,
            unique:true
        },
    
        password:{
            type:DataType.STRING,
            allowNull:false
        },
    
        rolId:{
            type:DataType.INTEGER.UNSIGNED,
            allowNull:false
        }
    },{timestamps:false, sequelize})

    //aca asigno las asociaciones

    Usuario.belongsTo(Rol,{
        targetKey:'id',
        as:'rol'
    })

    Rol.hasMany(Usuario,{
        sourceKey:'id',
        as:'usuarios'
    })


}
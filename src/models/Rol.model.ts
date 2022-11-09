import {Table,Column,DataType,Model, HasMany} from 'sequelize-typescript';
import { Usuario } from './Usuario.model';

@Table({timestamps:false})
export class Rol extends Model{
    @Column({
        primaryKey:true,
        autoIncrement:true,
        type: DataType.INTEGER
    })
    id:number

    @Column({
        allowNull:false
    })
    nombre:string

    @HasMany(()=> Usuario)
    usuarios:Usuario[];
}


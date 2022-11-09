import { Table,Column, DataType,Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Producto } from "./Producto.model";
import { Rol } from "./Rol.model";

@Table({timestamps:false})
export class Usuario extends Model{

    @Column({
        autoIncrement:true,
        type:DataType.INTEGER,
        primaryKey:true,
        allowNull:false
    })
    id:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    email:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password:string


    @ForeignKey(()=>Rol)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    rolId:number

    @BelongsTo(()=>Rol)
    rol:Rol

    @HasMany(()=> Producto)
    productos:Producto[];

}
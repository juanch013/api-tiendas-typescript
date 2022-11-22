import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import {Usuario} from '../models/Usuario.model'
import {Producto} from '../models/Producto.model'
import {productoVenta} from '../models/productoVenta.model'
import { Tienda } from "./Tienda.model";

@Table({timestamps:false})
export class Venta extends Model{

    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    })
    id:number

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    usuarioId:number

    @BelongsTo(()=>Usuario)
    usuario:Usuario

    @ForeignKey(()=>Tienda)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    tiendaId:number

    @BelongsTo(()=>Tienda)
    tienda:Tienda

    @BelongsToMany(()=>Producto, ()=>productoVenta)
    productos:Producto[]


}
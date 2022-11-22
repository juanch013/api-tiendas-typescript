import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model , Table } from "sequelize-typescript";
import { Producto } from "./Producto.model";
import { productoTienda } from "./productoTienda.model";
import { productoVenta } from "./productoVenta.model";
import { Usuario } from "./Usuario.model";
import { Venta } from "./Venta.model";


@Table({timestamps:false})
export class Tienda extends Model{
    @Column({
        primaryKey:true,
        type:DataType.INTEGER,
        autoIncrement:true,
        allowNull:false
    })
    id:number


    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    nombre:string

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    calle:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    nroPuerta:number

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    userId:number

   @BelongsToMany(()=>Producto, ()=>productoTienda)
   productos:Producto[]

    @BelongsTo(()=>Usuario)
    duenio:Usuario

    @HasMany(()=>Venta)
    ventas:Venta[]
}
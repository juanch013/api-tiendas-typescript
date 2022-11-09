import {Table,Column,DataType,Model, HasMany, ForeignKey, BelongsTo, BelongsToMany} from 'sequelize-typescript';
import { productoTienda } from './productoTienda.model';
import { Tienda } from './Tienda.model';
import { Usuario } from './Usuario.model';

@Table({timestamps:false})
export class Producto extends Model{
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

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    precio:number

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    userId:number

    @BelongsTo(()=>Usuario)
    usuario:Usuario

    @BelongsToMany(()=>Tienda, ()=>productoTienda)
    tiendas:Tienda[]
}
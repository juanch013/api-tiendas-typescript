import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import { Producto } from "./Producto.model";
import { Venta } from "./Venta.model";

@Table({timestamps:false})
export class productoVenta extends Model {
  @ForeignKey(() => Producto)
  @Column
  productoId: number;

  @Column
  cantidad:number

  @ForeignKey(() => Venta)
  @Column
  ventaId: number;
}
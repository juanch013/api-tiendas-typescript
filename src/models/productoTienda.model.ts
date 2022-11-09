import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import { Producto } from "./Producto.model";
import { Tienda } from "./Tienda.model";

@Table
export class productoTienda extends Model {
  @ForeignKey(() => Producto)
  @Column
  productoId: number;

  @ForeignKey(() => Tienda)
  @Column
  tiendaId: number;
}
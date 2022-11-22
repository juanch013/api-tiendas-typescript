import { IsArray, IsNumber, IsPositive } from "class-validator"
import { AgregarProdVentaDto } from "./agregarProdventa.dto"

export class AgregarVentaDto{
    @IsPositive()
    tienda_id:number
    @IsPositive()
    usuarioId:number
    @IsArray()
    prods:Array<AgregarProdVentaDto>

}
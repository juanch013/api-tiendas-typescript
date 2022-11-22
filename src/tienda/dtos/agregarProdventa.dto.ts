import { IsNumber, IsPositive } from "class-validator"

export class AgregarProdVentaDto{
    @IsPositive()
    prodId:number
    @IsNumber()
    cant:number
} 
import {IsNumber, isNotEmpty, IsNotEmpty} from 'class-validator'

export class AgregarProductoDto{

    @IsNumber()
    tiendaId:number

    @IsNumber()
    productoId:number
    
}
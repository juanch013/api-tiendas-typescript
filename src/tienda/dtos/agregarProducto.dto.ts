import {IsNumber} from 'class-validator'

export class AgregarProductoDto{

    @IsNumber()
    tiendaId:number

    @IsNumber()
    productoId:number
    
}
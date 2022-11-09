import{IsNumber, IsPositive, IsString} from 'class-validator'

export class CrearProductoDto{
    
    @IsPositive()
    @IsNumber()
    precio:number

    @IsString()
    nombre:string

    @IsString()
    descripcion:string

    @IsNumber()
    tiendaId:number
}
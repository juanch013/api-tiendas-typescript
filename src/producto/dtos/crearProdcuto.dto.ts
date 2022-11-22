import{IsNumber, IsPositive, IsString, IsNotEmpty} from 'class-validator'

export class CrearProductoDto{
    
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    precio:number

    @IsNotEmpty()
    @IsString()
    nombre:string

    @IsNotEmpty()
    @IsString()
    descripcion:string

    @IsNotEmpty()
    @IsNumber()
    tiendaId:number
}
import{IsNumber, IsString} from 'class-validator'

export class CrearProductoDto{
    @IsNumber()
    precio:number

    @IsString()
    nombre:string

    @IsString()
    descripcion:string

    // @IsNumber()
    // tiendaId:number
}
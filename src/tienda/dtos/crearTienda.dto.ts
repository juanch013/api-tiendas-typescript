import { IsNumber, IsString } from "class-validator";

export class CrearTiendaDto{

    @IsString()
    nombre:string

    @IsString()
    calle:string

    @IsNumber()
    nroPuerta:number
    
}
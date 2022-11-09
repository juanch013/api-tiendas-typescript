import { IsNumber, IsString, IsOptional } from "class-validator";

export class ModificarTiendaDto{

    @IsOptional()
    @IsString()
    nombre:string

    @IsOptional()
    @IsString()
    calle:string

    @IsOptional()
    @IsNumber()
    nroPuerta:number

    @IsOptional()
    @IsNumber()
    duenioId:number
    
}
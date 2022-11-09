import { IsString, IsNumber, IsEmail } from "class-validator";

export class CrearUsuarioDto{

    @IsEmail()
    email:string

    @IsString()
    password:string

    @IsNumber()
    rolId:number

}
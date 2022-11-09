import { IsEmail, IsOptional, IsString } from "class-validator";


export class ModificarUserDto{
    
    @IsOptional()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    rolId:number

    @IsOptional()
    @IsString()
    password:string

}
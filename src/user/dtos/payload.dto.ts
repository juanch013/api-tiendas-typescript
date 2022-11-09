import { IsEmail, IsNumber, IsString } from "class-validator"


export class PayloadDto{
    @IsNumber()
    id:number

    @IsEmail()
    email:string

    @IsString()
    password:string

    @IsNumber()
    rolId:number
}
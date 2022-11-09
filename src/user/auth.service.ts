import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { PayloadDto } from './dtos/payload.dto';

@Injectable()
export class authService{
    constructor(){}

    async generateJwt(payload:PayloadDto){
        return await sign(payload,process.env.SECRETKEY,{
            expiresIn:'2d',
            algorithm:'HS256'
        })
    }
}
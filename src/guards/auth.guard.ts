import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common'

import {verify} from 'jsonwebtoken'
import { PayloadDto } from 'src/user/dtos/payload.dto';


export class authGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        try {
            const request = context.switchToHttp().getRequest();   
            console.log("hola desde el guard");
            
            let jwt = request.headers.authorization;
    
            let payload = verify(jwt,process.env.SECRETKEY) as PayloadDto
    
            request.user = payload
            if(jwt == undefined ){
                return false
            }
            return true;
            
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
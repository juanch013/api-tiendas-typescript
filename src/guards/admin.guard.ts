import { ExecutionContext,CanActivate } from "@nestjs/common";
import {verify} from 'jsonwebtoken'
import { Observable } from "rxjs";
import { PayloadDto } from "src/user/dtos/payload.dto";


export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        try {
            let request = context.switchToHttp().getRequest()
            let jwt = request.headers.authorization
            let payload = verify(jwt,process.env.SECRETKEY) as PayloadDto
    
            if(payload.rolId == 1){
                return true
            }
            return false;
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
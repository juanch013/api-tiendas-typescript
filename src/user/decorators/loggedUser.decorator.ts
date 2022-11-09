import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'

export const LoggedtUser = createParamDecorator(
    (data:never, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        console.log("hi from currect user decorator");
        return request.user; 
    }
)
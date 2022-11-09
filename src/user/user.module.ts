import { Module } from '@nestjs/common';
import { authService } from './auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers:[UserService,authService]
})
export class UserModule {}

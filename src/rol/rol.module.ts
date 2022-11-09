import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { rolService } from './rol.service';

@Module({
  controllers: [RolController],
  providers:[rolService]
})
export class RolModule {

}

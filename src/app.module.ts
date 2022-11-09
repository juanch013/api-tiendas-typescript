import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { LocationModule } from './location/location.module';
import { ProductoModule } from './producto/producto.module';
import { TiendaModule } from './tienda/tienda.module';

@Module({
  imports: [UserModule, RolModule, LocationModule, ProductoModule, TiendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

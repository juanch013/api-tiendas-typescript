import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize,DataType } from 'sequelize-typescript'
import {Rol} from './models/Rol.model'
import {initModels} from './models/initModels'
import { Usuario } from './models/Usuario.model';

import {config} from 'dotenv'
import { Producto } from './models/Producto.model';
import { Tienda } from './models/Tienda.model';
import { productoTienda } from './models/productoTienda.model';
import { Venta } from './models/Venta.model';
import { productoVenta } from './models/productoVenta.model';
import {ValidationPipe} from '@nestjs/common'
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelize = new Sequelize('baseprueba','root','rootroot',{
    dialect:"mysql",
    models: [Rol,Usuario,Producto,Tienda, productoTienda,Venta,productoVenta]
  });

  // initModels(sequelize);

  // sequelize.sync(
  //   {force:true}
  // )
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  
  await app.listen(3000);

  
}



bootstrap();

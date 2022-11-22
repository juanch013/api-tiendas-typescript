import { Module } from '@nestjs/common';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { VentasService } from './ventas.service';

@Module({
  controllers: [TiendaController],
  providers:[TiendaService,VentasService]
})
export class TiendaModule {}

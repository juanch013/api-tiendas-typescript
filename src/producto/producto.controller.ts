import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearProductoDto } from './dtos/crearProdcuto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
    constructor(private prodSer:ProductoService){}

    @Get('/')
    async listar(){

    }

    @Post('/')
    async crear(@Body() body:CrearProductoDto){
        return await this.prodSer.crear(body.nombre, body.precio, body.descripcion,
            // body.tiendaId
            );
    }
    
}

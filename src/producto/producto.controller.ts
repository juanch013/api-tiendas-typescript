import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { authGuard } from 'src/guards/auth.guard';
import { Usuario } from 'src/models/Usuario.model';
import { LoggedtUser } from 'src/user/decorators/loggedUser.decorator';
import { CrearProductoDto } from './dtos/crearProdcuto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
@UseGuards(authGuard)
export class ProductoController {
    constructor(private prodSer:ProductoService){}

    @Get('/')
    async listar(){
        return await this.prodSer.listar()
    }

    @Post('/')
    async crear(@Body() body:CrearProductoDto, @LoggedtUser() user:Usuario){
        return await this.prodSer.crear(body.nombre, body.precio, body.descripcion, user);
    }

    @Get('/:id')
    async detalle(@Param('id') id:string){
        return await this.prodSer.detalle(Number(id))
    }


    
}

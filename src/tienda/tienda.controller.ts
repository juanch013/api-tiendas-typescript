import { Body, Put , Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CrearTiendaDto } from './dtos/crearTienda.dto';
import { LoggedtUser } from 'src/user/decorators/loggedUser.decorator';
import { Usuario } from 'src/models/Usuario.model';
import { authGuard } from 'src/guards/auth.guard';
import { ModificarTiendaDto } from './dtos/modificarTienda.dto';
import { AgregarProductoDto } from './dtos/agregarProducto.dto';
import { AgregarVentaDto } from './dtos/agregarVenta.dto';
import { VentasService } from './ventas.service';

@Controller('tienda')
@UseGuards(authGuard)
export class TiendaController {
    constructor(private tiendaSer:TiendaService,private ventaSer:VentasService){}

    @Post('/')
    async crear(@Body() body:CrearTiendaDto, @LoggedtUser() user:Usuario){
        return await this.tiendaSer.crear(body.nombre,body.calle, body.nroPuerta,user);
    }

    @Get('/')
    async listar(){
        return await this.tiendaSer.listar()
    }

    @Get('/:id')
    async detalle(@Param('id') id:string){
        return await this.tiendaSer.detalle(Number(id))
    }

    @Delete('/:id')
    async eliminar(@Param('id') id:string){
        return await this.tiendaSer.eliminar(Number(id))
    }

    @Put('/:id')
    async modificar(@Param('id') id:string, @Body() body:ModificarTiendaDto, @LoggedtUser() user:Usuario){
        return await this.tiendaSer.modificar(Number(id), body, user)
    }

    @Post('/producto')
    async agregarProd(@Body() body:AgregarProductoDto,@LoggedtUser() user:Usuario){
        return await this.tiendaSer.agregarProd(body.productoId, body.tiendaId,user)
    }

    @Post('/:tiendaId/ventas')
    async agregarVenta(@Param('tiendaId') tiendaId:number,@Body() body:AgregarVentaDto){
        return await this.ventaSer.crear(tiendaId,body.usuarioId,body.prods);
    }

}

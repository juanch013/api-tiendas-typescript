import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CrearTiendaDto } from './dtos/crearTienda.dto';
import { LoggedtUser } from 'src/user/decorators/loggedUser.decorator';
import { Usuario } from 'src/models/Usuario.model';
import { authGuard } from 'src/guards/auth.guard';

@Controller('tienda')
@UseGuards(authGuard)
export class TiendaController {
    constructor(private tiendaSer:TiendaService){}

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
}

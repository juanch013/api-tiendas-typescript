import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LargeNumberLike } from 'crypto';
import { CreateRolDto } from './dtos/createRol.dto';
import { rolService } from './rol.service';
import { UseGuards } from '@nestjs/common';
import { authGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('rol')
@UseGuards(authGuard)
export class RolController {
    constructor(private rolSer:rolService){}

    @Get('/')
    @UseGuards(AdminGuard)
    async listado(){
        return await this.rolSer.listar(); 
    }

    @Get('/:id')
    async detalle(@Param('id') id:string){
        return await this.rolSer.detalle(parseInt(id)); 
    }

    @Post('/')
    async crear(@Body() body:CreateRolDto){
        return await this.rolSer.crear(body.nombre);
    }

    @Delete('/:id')
    async delete(@Param('id') id:number){
        return await this.rolSer.eliminar(id);  
    }

    @Put('/:id')
    async editar(@Param('id') id:number,@Body() body:CreateRolDto){
        return await this.rolSer.mod(id,body.nombre);   
    }
}

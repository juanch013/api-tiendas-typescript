import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { authGuard } from 'src/guards/auth.guard';
import { CrearUsuarioDto} from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { ModificarUserDto } from './dtos/modificarUser.dto';
import { UserService } from './user.service';

@Controller('usuario')
@UseGuards(authGuard)
export class UserController {
    constructor(private userSer:UserService){}

    @Post('/')
    async create(@Body() body:CrearUsuarioDto){
        return await this.userSer.crear(body.email, body.password, body.rolId)
    }

    @Get('/')
    @UseGuards(AdminGuard)
    async listar(){
        return await this.userSer.listar();
    }

    @Get('/:id')
    @UseGuards(AdminGuard)
    async detalle(@Param('id') id:string){
        return await this.userSer.detalle(Number(id));
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    async eliminar(@Param('id') id:string){
        return await this.userSer.eliminar(Number(id))
    }

    @Put('/:id')
    @UseGuards(AdminGuard)
    async modificar(@Param('id') id:string, @Body() body:ModificarUserDto){
        return await this.userSer.mod(Number(id),body)
    }

    @Post('/login')
    async login(@Body() body:LoginDto){
        return await this.userSer.login(body.email, body.password);
    }

}

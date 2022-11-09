import { BadRequestException, ForbiddenException, ImATeapotException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {Usuario} from '../models/Usuario.model'
import { Rol } from 'src/models/Rol.model';
import { ModificarUserDto } from './dtos/modificarUser.dto';
import { authService } from './auth.service';
import {hash, compare} from 'bcrypt'

@Injectable()
export class UserService{
    constructor(private authSer:authService){}

    async crear(email:string,password:string,rol_id:number){

        try {
            console.log(rol_id);

            let rol = await Rol.findByPk(rol_id);

            if(rol == null){
                return new BadRequestException("El rol que le desea asignar al usuario no es correcto")
            }

            let verifEmail = await Usuario.findOne({where:{
                email:email
            }})

            if(verifEmail != null){
                return new BadRequestException("Ese email ya se encuentra registrado, pruebe con otro")
            }

            const salt = 10;
            const hashedPassword = await hash(password, salt);

            let usuario = await Usuario.create({
                email:email,
                password:hashedPassword,
                rolId:rol_id,
                rol:rol
            })

            return {
                ok:true,
                msg:"Usuario creado correctamente",
                data:usuario
            }

        } catch (error) {
            console.log(error);
            return new InternalServerErrorException('Server error')
        }


    }

    async listar(){
        let usuarios = await Usuario.findAll({
            include:[Rol]
        });

        return {
            ok:true,
            msg:"listado de usuarios",
            data:usuarios
        }
    }

    async detalle(id:number){
        let usuario = await Usuario.findByPk(id,{
            include:[Rol]
        });

        if(usuario == null){
            return new NotFoundException('Usuario no encontrado')
        }

        return {
            ok:true,
            msg:"Detalle de usuario",
            data:usuario
        }
    }

    async eliminar(id:number){
        try {
            let usuario = await Usuario.findByPk(id);
    
            if(usuario == null){
                return new NotFoundException('Usuario no encontrado')
            }
    
            let n = await Usuario.destroy({
                where:{
                    id:id
                }
            })
    
            console.log(n);
            if(n == 1){
                return {
                    ok:true,
                    msg:`Usuario ${id} eliminado correctamente`,
                    data:usuario
                }
            }
    
            return new ImATeapotException()
            
        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server error")
        }

    }

    async mod(id:number,props:ModificarUserDto){
        let usuario = await Usuario.findByPk(id);

        if(usuario == null){
            return new NotFoundException('Usuario no encontrado')
        }

        let {rolId,email} = props;

        //Si manda un rol verifico que exista ese rol
        if(rolId != null){
            let verifRol = await Rol.findByPk(rolId);
            
            if(verifRol == null){
                return new BadRequestException('El rol que usted desea asignar no es correcto')
            }
        }

        // Si manda un email verifico que no lo este usando nadie
        if(email !=  null){
            let verifEmail = Usuario.findOne({where:{
                email:email
            }})


            if(verifEmail != null){
                return new BadRequestException('El email que quiere asignar ya esta en uso por otro usuario , ingrese otro')
            }
        }

        let update = await Usuario.update({
            email: email == undefined? usuario.email : email,
            password: props.password == undefined? usuario.password : props.password,
            rolId: rolId == undefined? usuario.rolId : props.rolId

        },{where:{id:id}})

        

        return {
            ok:true,
            msg: `Usuario ${id} modificado correctamente `,
            data:update
        }

    }

    async login(email:string, password:string){
        let usuario = await Usuario.findOne({where:{email:email}})
        
        if(usuario == null){
            return new NotFoundException('Usuario no encontrado')
        }

        if(!compare(password,(await usuario).password)){
            return new ForbiddenException('email y/o contraseña invalido')
        }
        let payload = {
            id:usuario.id,
            email: usuario.email,
            password: usuario.password,
            rolId: usuario.rolId
        }

        let jwt = await this.authSer.generateJwt(payload)

        return {
            ok:true,
            msg:`loggeado correctamente como ${usuario.email}`,
            data:jwt
        }

    }
}
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import {Rol} from '../models/Rol.model'

@Injectable()
export class rolService {
    constructor(){}

    async crear(nombre:string){
        try {
            
            if(nombre == ""){
                return new BadRequestException("El nombre ingresado no es correcto")
            }

            let r = await Rol.create({nombre:nombre})

            return {
                ok:true ,
                msg:`creo el rol ${nombre}`,
                rol:r
            }

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error")
        }
        
    }


    async eliminar(id:number){
        try {
            let rol = await Rol.findByPk(id);

            if(rol == null){
                throw new NotFoundException(`No existe un rol con id ${id}`)
            }
            
            await Rol.destroy({
                where:{
                    id:id
                }
            })
            
            return {
                ok:true,
                msg:`elimino el rol ${id}`,
                data: rol
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Server error');
        }
    }

    async mod(id:number,nombre:string){

        let rol = Rol.findByPk(id);

        if(nombre == ""){
            return new BadRequestException('Nombre invalido')
        }

        if(rol == null){
            return new NotFoundException('Rol no encontrado')
        }

        let ret = await Rol.update({nombre:nombre},{
                                where:{
                                    id:id
                                }
                            })

        return {
            ok:true,
            msg:`cambio el nombre de el rol ${id} a ${nombre}`,
            data:ret
        }
    }

    async detalle(id:number){
        try {

            let rol = await Rol.findByPk(id);

            if(rol == null){
                return new NotFoundException('Rol no encontrado')
            }

            return {
                ok:true,
                msg:`detalle del rol ${id}`,
                data:rol
            }
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Server error')
        }
    }

    async listar(){
        try {
            let roles = await Rol.findAll();

            return {
                ok:true,
                msg:`listado de roles`,
                data:roles
            }
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Server error')
        }
    }
}
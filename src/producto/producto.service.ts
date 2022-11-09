import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { Producto } from "src/models/Producto.model";
import { productoTienda } from "src/models/productoTienda.model";
import { Tienda } from "src/models/Tienda.model";
import { Usuario } from "src/models/Usuario.model";
import { UserController } from "src/user/user.controller";
import { CrearProductoDto } from "./dtos/crearProdcuto.dto";


@Injectable()
export class ProductoService{

    async crear(nombre:string, precio:number, descripcion:string, user:Usuario){
            
            let u = await Usuario.findByPk(user.id)
            if(u==null){
                return new ForbiddenException("No puedo realizar esta accion")
            }

            //el nombre de los productos es unique tambien , asi que hay que comprobar que no se repita,
            let nombrerep = await Producto.findOne({where:{nombre:nombre}})

            if(nombrerep != null){
                return new BadRequestException('Ya existe un producto con ese nombre , intente con otro')
            }

            let prod = await Producto.create({
                nombre:nombre,
                precio:precio,
                descripcion:descripcion,
                userId:u.id,
                usuario:u
            })

            return {
                ok:true,
                msg:'Producto agregado correctamente',
                data:prod
            }          

    }

    async eliminar(id:number){
        try {
            let prod = await Producto.findByPk(id,{
                include:[
                    {
                        model:Tienda,
                        through:{attributes:[]}
                    }
                ]
            })

            if(prod == null){
                return new NotFoundException('No se encontro el producto con id '+id)
            }

            let del = await Producto.destroy({where:{id:id}})

            if(del == 0){
                return {
                    ok:false,
                    msg:"No se pudo eliminar el producto",
                    data:del
                }
            }

            return {
                ok:true,
                msg:"Producto eliminado correctamente",
                data:prod
            }


        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server error")
        }
    }

    async detalle(id:number){
        try {
            let prod = await Producto.findByPk(id,{
                include:[
                    {
                        model:Tienda,
                        through:{attributes:[]}
                    }
                ]
            })

            if(prod == null){
                return new NotFoundException('No se encontro el producto con id '+id)
            }

            return {
                ok:true,
                msg:"Detalle de producto",
                data:prod
            }


        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server error")
        }
    }

    async listar(){
        try {

            let productos = await Producto.findAll({
                include:[{
                    model:Usuario,
                    attributes:['email','rolId','id']
                },
                {
                    model:Tienda,
                    through:{attributes:[]}
                }
                ]
            })

            return {
                ok:true,
                msg:"listado de productos",
                data:productos
            }
            
        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server Error")
        }

    }
}
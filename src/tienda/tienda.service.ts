import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { Producto } from "src/models/Producto.model";
import { productoTienda } from "src/models/productoTienda.model";
import { Tienda } from "src/models/Tienda.model";
import { Usuario } from "src/models/Usuario.model";
import { Venta } from "src/models/Venta.model";
import { ModificarTiendaDto } from "./dtos/modificarTienda.dto";

@Injectable()
export class TiendaService{
    constructor(){}

    async crear(nombre:string, calle:string, nroPuerta:number, user:Usuario){
        try {
            //primero verifico que el usuario exista
            console.log(user);
            let usuario = await Usuario.findByPk(user.id)
            if(usuario == null){
                return new ForbiddenException('el usuario que se encuentra logeado no puede realizar esta operacion')
            }

            let tienda = await Tienda.create({
                nombre:nombre,
                calle:calle,
                nroPuerta:nroPuerta,
                duenio:usuario,
                userId:usuario.id
            })

            return {
                ok:true,
                msg:'tienda creada correctamente',
                data:tienda
            }



        } catch (error) {
            console.log(error);
            return new InternalServerErrorException('Server Error')
        }
    }

    async listar(){
        
        try {
            let tiendas = await Tienda.findAll({
                include:[
                    {
                        model:Usuario,
                        attributes:['email','rolId','id']
                    },
                    {
                        model:Producto,
                        through:{attributes:[]}
                    },
                    {
                        model:Venta,
                        include:[{
                            model:Producto,
                            through:{attributes:['cantidad']}
                        }]
                    }
                ],
            })


            return {
                ok:true,
                msg:"listado de tiendas",
                data:tiendas
            }


    } catch (error) {
        console.log(error);
        return new InternalServerErrorException("Internal error")
    }
    }

    async detalle(id:number){
        try {
            let tienda = await Tienda.findByPk(id,{
                include:[
                    {
                        model:Usuario,
                        attributes:['email','rolId','id']
                    },
                    {
                        model:Producto,
                        through:{attributes:[]}
                    }
                ],
                attributes:{
                    exclude:['userId']
                }
            })

            if(tienda == null){
                return new NotFoundException('Tienda no encontrada')
            }

            return {
                ok:true,
                msg:"Detalle de tienda",
                data:tienda
            }

        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server error")
        }
    }

    async eliminar(id:number){
        try {
            
            let tienda = await Tienda.findByPk(id,{
                include:[
                    {
                        model:Usuario,
                        attributes:['email','rolId','id']
                    },
                    {
                        model:Producto,
                        through:{attributes:[]}
                    }
                ]
            });


            if(tienda == null){
                return new NotFoundException('Tienda no encontrada');
            }

            let del = await Tienda.destroy({where:{id:id}});

            return {
                ok:true,
                msg:"Tienda eliminada correctamente",
                data:del
            }

        } catch (error) {
         console.log(error);
         return new InternalServerErrorException('Server error')   
        }
    }

    async modificar(id:number, body:ModificarTiendaDto, user:Usuario){

        try {
            let tienda = await Tienda.findByPk(id,
                {
                    include:[{
                        model:Usuario,
                        attributes:['email','id','rolId']
                    }]
                });

            if(tienda == null){
                return new NotFoundException('Tienda not found')
            }

            if(user.id != tienda.duenio.id){
                return new ForbiddenException('No tiene permisos para realizar esta accion')
            }
            let nuevoDuenio = undefined;

            if(body.duenioId != undefined){

                nuevoDuenio = await Usuario.findByPk(body.duenioId);

                if(nuevoDuenio == null){
                    return new NotFoundException('El usuario que desea asignarle a la tienda no fue encontrado')
                }

                console.log(nuevoDuenio.dataValues);
            }

            let update = await Tienda.update({
                nombre: body.nombre == undefined? tienda.nombre : body.nombre,
                calle: body.calle == undefined? tienda.calle : body.calle,
                nroPuerta: body.nroPuerta == undefined? tienda.nroPuerta : body.nroPuerta,
                userId: body.duenioId == undefined? tienda.userId : body.duenioId
            },{where:{id:id}})
            
            if(update[0] == 0){
                return {
                    ok:false,
                    msg:"No se realizó ninguna modificacion",
                    data:tienda
                }
            }

            let ret = await Tienda.findByPk(id,{
                include:[
                        {
                            model:Usuario,
                            attributes:['email','id','rolId']
                        },
                        {
                            model:Producto,
                            through:{attributes:[]}
                        }
                    ]
            })

            return {
                    ok:true,
                    msg:"Se modifico la tienda correctamente",
                    data:ret
                }

        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Server error")
        }
    }

    async agregarProd(producto:number, tienda:number, user:Usuario){
        try {
            let prod = await Producto.findByPk(producto);
            let ti = await Tienda.findByPk(tienda);

            if(ti.duenio.id != user.id){
                return new ForbiddenException("Solo el duenio puede agregar productos a su tienda")
            }

            if(ti == null || prod == null){
                return new BadRequestException('Los identificadores de producto y/o tienda no son correctos')
            }

            let insert = await productoTienda.create({
                tiendaId:ti.id,
                productoId:prod.id
            })

            return {
                ok:true,
                msg:`El producto ${prod.nombre} ya se encuentra disponible en ${ti.nombre}`,
                data:insert
            }


        } catch (error) {
            console.log(error);
            return new InternalServerErrorException("Srever error")
        }
    }
}
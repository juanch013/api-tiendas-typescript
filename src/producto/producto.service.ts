import { Injectable } from "@nestjs/common";
import { Producto } from "src/models/Producto.model";
import { CrearProductoDto } from "./dtos/crearProdcuto.dto";

@Injectable()
export class ProductoService{

    async crear(nombre:string, precio:number, descripcion:string){
            //falta verificar que la tienda exista
    }

    async eliminar(id:number){

    }

    async detalle(id:number){

    }

    async listar(){

    }
}
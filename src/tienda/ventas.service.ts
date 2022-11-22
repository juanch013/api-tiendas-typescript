import { Injectable, NotFoundException } from "@nestjs/common";
import { AgregarProdVentaDto } from "./dtos/agregarProdventa.dto";
import { Venta } from "src/models/Venta.model";
import { Usuario } from "src/models/Usuario.model";
import { Tienda } from "src/models/Tienda.model";

@Injectable()
export class VentasService{
    constructor(){}

    async crear(tiendaId:number, usuarioId:number, prods:Array<AgregarProdVentaDto>){
        let tienda = await Tienda.findByPk(tiendaId);

        if(tienda == null){
            return new NotFoundException("No existe tienda con el id proporcionado")
        }

        let usuario = await Tienda.findByPk(usuarioId);

        if(usuario == null){
            return new NotFoundException("No existe usuario con el id proporcionado")
        }

        console.log(prods);
        return {a:"a"}
    }
}
import { Request, Response } from 'express';
import { GET, PUT, POST, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';

import { PedidoCreateDto, PedidoUpdateDto } from '../dtos/pedidos.dtos';

import { PedidoService } from '../services/pedidos.service';
import { LocatarioService } from '../services/locatarios.service';
import { PlazaService } from '../services/plazas.service';


@route('/pedidos')
export class pedidoController extends BaseController{

    constructor(private readonly pedidoService: PedidoService,
                private readonly plazaService: PlazaService,
                private readonly locatarioService: LocatarioService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        try{
            const {
                pasarela_pagos_id,
                locatorios_id, 
                cliente_id, 
                productos_locatarios_id, 
                total
            } = req.body;
            
            const pedido = await this.pedidoService.store({
                pasarela_pagos_id,
                cliente_id,
                locatorios_id,
                productos_locatarios_id,
                estado: 0,
                total
            } as PedidoCreateDto);

            res.status(200).json({
                ok: true, 
                pedido
            });
            return;            

        } catch(error){
            this.handleException(error, res);
        }
    }

    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);  

            const {
                pasarela_pagos_id,
                plaza_id, 
                locatorios_id,
                cliente_id,
                productos_locatarios_id, 
                total, 
                estado
            } = req.body;
            
            const pedido = await this.pedidoService.update(id, {
                pasarela_pagos_id,
                plaza_id,
                locatorios_id,
                cliente_id,
                productos_locatarios_id,
                estado,
                total
            } as PedidoUpdateDto);

            res.status(200).json({
                ok: true, 
                pedido
            });

        } catch(error){
            this.handleException(error, res);
        }
    }


    @route('/find/:id')
    @GET()
    public async getById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const pedido = await this.pedidoService.findById(id);
          
            res.status(200).json({
                ok: true, 
                pedido
            });
            return;
    
        } catch(error){
            this.handleException(error, res);
        }
    }


    // @route('/pagadoYEntregado/:id')
    // @PUT()
    // public async delete(req: Request, res: Response): Promise<void>{
    //     const user = req.user as {id: number, rol: string};
    //     const id = parseInt(req.params.id);

    //     const rolesPermitidos = ['SUPER_ADMIN', 'ADMIN_LOCATARIO'];
        
    //     if(rolesPermitidos.includes(user.rol)) {
    //         try {
    //             await this.pedidoService.pagadoYEntregado(id);
                
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: "Pedido borrado con exito!"
    //             });
    
    //         } catch(error){
    //             this.handleException(error, res);
    //         }
    //     }
    // }


    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
        try {
            const pedidos = await this.pedidoService.getAll();

            res.status(200).json({
                ok: true,
                pedidos
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }




    @route('/pedidosPorLocatario/:locatarioId')
    @GET()
    public async pedidosPorLocatario(req: Request, res: Response): Promise<void>{
        try {
            const locatarioId = parseInt(req.params.locatarioId);
            console.log(locatarioId);

            const pedidos = await this.pedidoService.pedidosPorLocatario(locatarioId);

            res.status(200).json({
                ok: true,
                pedidos
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }



    @route('/getCantidadDePedidosPorClienteID/:id')
    @GET()
    public async cantidadDePedidosPorClienteID(req: Request, res: Response): Promise<void>{
        try {
            const clienteID = parseInt(req.params.id);

            const pedidos = await this.pedidoService.cantidadDePedidosPorClienteID(clienteID);

            res.status(200).json({
                ok: true,
                pedidos
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }


    // NO: pasarela_id
    // SI: Nombre de plaza 
    // SI: Nombre de locatario
    // SI: Estado
    // SI: Total del pago
    @route('/obtenerPorCliente/:id')
    @GET()
    public async getPedidosPorCliente(req: Request, res: Response): Promise<void>{
        try {
            const clienteID = parseInt(req.params.id);

            const pedidos = await this.pedidoService.getPedidosPorCliente(clienteID);

            let pedidosReturn = [];
            for(let i = 0; i < pedidos.length; i++) {
                
                delete pedidos[i].pasarela_pagos_id;
                const plaza = await this.plazaService.findById(pedidos[i].plaza_id);
                const locatario = await this.locatarioService.findById(pedidos[i].locatorios_id);
                
                // const { values } = await Promise.allSettled([plaza, locatario]);
                
                pedidosReturn.push({
                    plaza: plaza.nombre,
                    locatario: locatario.nombre_local,
                    estado: pedidos[i].estado,
                    total: pedidos[i].total
                });
            }

            res.status(200).json({
                ok: true,
                pedidos: pedidosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }



}
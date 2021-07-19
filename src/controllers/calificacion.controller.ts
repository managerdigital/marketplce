import { Request, Response } from 'express';
import { GET, POST, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';
import { CalificacionService } from '../services/calificacion.service';
import { CalificacionCreateDto, CalificacionUpdateDto } from '../dtos/calificaciones.dto';
import { Calificacion } from '../services/repositories/domain/calificaciones.domain';


@route('/calificaciones')
export class calificacionesController extends BaseController{

    constructor(private readonly calificacionService: CalificacionService){
        super();
    }


    @route('/store')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
 
        const { 
            cliente_id,
            pedido_id,
            plaza_id,
            locatorio_id,
            comentarios,
            calificaciones
       } = req.body;

       try {
            const calificacion = await this.calificacionService.store({
                cliente_id,
                pedido_id,
                plaza_id,
                locatorio_id,
                comentarios,
                calificaciones
            } as CalificacionCreateDto);
           
           res.status(200).json({
               ok: true,
               msg: "Calificación creado exitosamente!",
               calificacion
           });
           
       } catch(error) {
           this.handleException(error, res);
       }   
    }


    @route('/update/:id')
    @POST()
    public async update(req: Request, res: Response): Promise<void>{
 
        const { 
            cliente_id,
            pedido_id,
            plaza_id,
            locatorio_id,
            comentarios,
            calificaciones
       } = req.body;

       const id = parseInt(req.params.id);

       try {
           const calificacion = await this.calificacionService.update(id, {
            cliente_id,
            pedido_id,
            plaza_id,
            locatorio_id,
            comentarios,
            calificaciones
           } as CalificacionUpdateDto);
           
           res.status(200).json({
               ok: true,
               msg: "Calificación creada exitosamente!",
               calificacion
           });
           
       } catch(error) {
           this.handleException(error, res);
       }   
    }


    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
        try{
            const calificaciones = await this.calificacionService.getAll() as Calificacion[];
    
            res.status(200).json({
                ok: true,
                calificaciones
            });    
        } catch(error) {
            this.handleException(error, res); 
        }
    }

}
import { Request, Response } from 'express';
import { POST, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';
import { BoletinesService } from '../services/boletines.service';


@route('/boletines')
export class calificacionesController extends BaseController{

    constructor(private readonly boletinesService: BoletinesService){
        super();
    }

    @route('/guardar')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
 
        const { email } = req.body;

       try {
            await this.boletinesService.store(email);
           
           res.status(200).json({
               ok: true,
               msg: "Boletín creado exitosamente!"
           });
           
       } catch(error) {
           this.handleException(error, res);
       }   
    }
}
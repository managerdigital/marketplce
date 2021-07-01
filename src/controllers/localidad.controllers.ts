  
import { Request, Response } from 'express';
import { GET, POST, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';
import { LocalidadService } from '../services/localidad.service';
import { Localidad } from '../services/repositories/domain/localidades.domain';


@route('/localidades')
export class localidadController extends BaseController{

    constructor(private readonly localidadService: LocalidadService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            try{
                const {nombre} = req.body;
    
                const existeLocalidad = await this.localidadService.find(0, nombre);
    
                if(existeLocalidad) {
                    res.status(404).json({
                        ok: false,
                        msg: 'Esta localidad ya esta registrada'
                    });
                    return;
                }
    
                await this.localidadService.store(nombre);
    
                res.status(200).json({
                    ok: true,
                    msg: 'Localidad creada correctamente'
                });
    
            } catch(error) {
                this.handleException(error, res);
            }
        }
    }


    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try{
            const localidades = await this.localidadService.getAll() as Localidad[];

            if(localidades){
                
                // const localidadesReturn = localidades.map((localidad: Localidad) => {
                //     return {
                //         id: localidad.id,
                //         nombre: localidad.nombre
                //     };
                // });
                
                // console.log(localidadesReturn);
                
                // res.setHeader("Content-Type", "application/json; charset=utf-8");
                res.status(200).json({
                    ok: true,
                    localidades
                });
                return;
            }
            res.status(404).json({
                ok: false,
                msg: 'No hay localidades registradas aun'
            });


        } catch(error){
            this.handleException(error, res);
        }
    }





    @route('/getLocalidad/:id')
    @GET()
    public async getById(req: Request, res: Response): Promise<void>{
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.charset='UTF-8';
        const id = parseInt(req.params.id);

        try{
            const localidad = await this.localidadService.findById(id);

            res.status(200).json({
                ok: true,
                localidad
            });

        } catch(error) {
            this.handleException(error, res);
        }

    }


}
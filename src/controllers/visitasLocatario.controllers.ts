import { Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';
import { VisitasLocatariosService } from '../services/vistasLocatarios.service';
import { LocatarioService } from '../services/locatarios.service';

@route('/visitasLocatario')
export class VentaCategoriasController extends BaseController{
   
    constructor(private readonly visitasLocatariosService: VisitasLocatariosService,
                private readonly locatarioService: LocatarioService){
        super();
    }
    
    @route('/guardar')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        try {
            const { locatario_id } = req.body;

           await this.visitasLocatariosService.store({locatario_id});

            res.status(200).json({
                ok: true,
                msg: 'OK'
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/masVisitadosPoPlazaId/:plazaId')
    @GET()
    public async masVisitadosByPlazaId(req: Request, res: Response): Promise<void>{
        try {
            const plazaId = parseInt(req.params.plazaId);

           const locatariosMasVisitados = await this.visitasLocatariosService.masVisitadosByPlazaId(plazaId);

            const locatarioReturn = [];
            for(let i = 0; i < locatariosMasVisitados.length; i++) {
                const locatario = await this.locatarioService.findById(locatariosMasVisitados[i].locatario_id);
                locatarioReturn.push({
                    id: locatario.id,
                    nombre_propietario: locatario.nombre,
                    nombre_local: locatario.nombre_local,
                    img: locatario.img,
                    logo: locatario.logo,
                    cantidad: locatariosMasVisitados[i].cantidad
                })
            }

            res.status(200).json({
                ok: true,
                locatariosMasVisitados: locatarioReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }

}
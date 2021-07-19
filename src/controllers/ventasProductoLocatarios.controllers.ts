import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';
import { VentasProductosLocatariosService } from '../services/ventasProductosLocatarios.service';

@route('/ventaProductoLocatarios')
export class VentaProductosLocatariosController extends BaseController{
   
    constructor(private readonly ventasProductosLocatariosService: VentasProductosLocatariosService){
        super();
    }
   
    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try {
            const ventas = await this.ventasProductosLocatariosService.getAll();

            res.status(200).json({
                ok: true,
                ventas
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }

    @route('/getMasVendidos')
    @GET()
    public async getMasVendidos(req: Request, res: Response): Promise<void>{

        try {
            const productosMasVendidos = await this.ventasProductosLocatariosService.getMasVendidos();

            res.status(200).json({
                ok: true,
                productosMasVendidos
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }
}
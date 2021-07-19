import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';
import { PromocionService } from '../services/promociones.service';
import { Promociones } from '../services/repositories/domain/promociones.domain';

@route('/promociones')
export class productoLocatariosController extends BaseController{


    constructor(private readonly promocionService: PromocionService){
        super();
    }

    // @route('/crear')
    // @POST()
    // public async store(req: Request, res: Response): Promise<void>{
        
    //     const { 
    //             producto_id, 
    //             plazas_id,
    //             categorias_id, 
    //             imagen
    //         } = req.body;


    //     try{
    //         const promocion = await this.promocionService.store({
    //             producto_id, 
    //             plazas_id,
    //             categorias_id, 
    //             imagen
    //         } as Promociones);

    //         res.status(200).json({
    //             ok: true,
    //             promocion
    //         });

    //     } catch(error) {
    //         this.handleException(error, res);
    //     }
    // }


    // @route('/update/:id')
    // @PUT()
    // public async update(req: Request, res: Response): Promise<void>{
    //     const id = parseInt(req.params.id);  
    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         const { 
    //             producto_id, 
    //             plazas_id,
    //             categorias_id, 
    //             imagen,
    //             activo
    //         } = req.body;
    
    //         try {
    //             await this.promocionService.update(id, {
    //                 producto_id, 
    //                 plazas_id,
    //                 categorias_id, 
    //                 imagen,
    //                 activo
    //             } as Promociones);
    
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: "Promocion actualizada con exito!"
    //             });
                
    //         } catch(error){
    //             this.handleException(error, res);
    //         }
    //     }
    // }



    // @route('/delete/:id')
    // @PUT()
    // public async delete(req: Request, res: Response): Promise<void>{
    //     const id = parseInt(req.params.id);
            
    //     try {
    //         await this.promocionService.delete(id);
            
    //         res.status(200).json({
    //             ok: true,
    //             msg: "Promoción borrado con exito!"
    //         });

    //     } catch(error){
    //         this.handleException(error, res);
    //     }
    // }


    @route('/findById/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  

        try{
            const promocion = await this.promocionService.findById(id);

            res.status(200).json({
                ok: true,
                promocion
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }



    @route('/obtenerTodo')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
    // NOMBRE, IMAGEN, ACTIVA
        try {
            const promociones = await this.promocionService.getAll();

            res.status(200).json({
                ok: true,
                promociones: promociones.map((promo: Promociones) => {
                    return {
                        id: promo.id,
                        imagen: promo.imagen,
                        activo: promo.activo
                    }
                })
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }

}
import { Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';
import { VentasCategoriasService } from '../services/ventasCategorias.service';
import { VentasCategoriaCreateDtoController } from '../dtos/ventasCategorias.dto';
import { CategoriaService } from '../services/categorias.service';

@route('/ventaCategoria')
export class VentaCategoriasController extends BaseController{
   
    constructor(private readonly ventasCategoriasService: VentasCategoriasService,
                private readonly categoriaService: CategoriaService){
        super();
    }
    
    @route('/guardar')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        try {
            const { locatario_id, categoria_id } = req.body;

            await this.ventasCategoriasService.store({
                locatario_id,
                categoria_id
            } as VentasCategoriaCreateDtoController);

            res.status(200).json({
                ok: true,
                msg: 'Creada venta de categoria correctamente'
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorLocatario/:id')
    @GET()
    public async findByLocatario(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id);

            const categorias = await this.ventasCategoriasService.findByLocatario(id);
            
            const categoriasReturn = [];
            for(let i = 0; i < categorias.length; i++) {
                const categoria = await this.categoriaService.findById(categorias[i].categoria_id);
                categoriasReturn.push({
                    id: categoria.id,
                    categoria: categoria.nombre,
                    cantidad: categorias[i].cantidad
                });
            }

            res.status(200).json({
                ok: true,
                categorias: categoriasReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorPlaza/:id')
    @GET()
    public async findByPlazas(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id);

            const categorias = await this.ventasCategoriasService.findByPlazas(id);
            
            const categoriasReturn = [];
            for(let i = 0; i < categorias.length; i++) {
                const categoria = await this.categoriaService.findById(categorias[i].categoria_id);
                categoriasReturn.push({
                    id: categoria.id,
                    categoria: categoria.nombre,
                    cantidad: categorias[i].cantidad
                });
            }

            res.status(200).json({
                ok: true,
                categorias: categoriasReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }
}
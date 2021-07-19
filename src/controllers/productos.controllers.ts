import { Request, Response } from 'express';
import { route, POST, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { ProductoService } from '../services/productos.service';

@route('/productos')
export class productoController extends BaseController{


    constructor(private readonly productoService: ProductoService){
        super();
    }


    @route('/buscarPorID/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  
        
        try{
            const producto = await this.productoService.findById(id);

            res.status(200).json({
                ok: true,
                producto
            });                

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/findByNameAndUnit')
    @POST()
    public async findByNameAndUnit(req: Request, res: Response): Promise<void>{
        const {name, unit} = req.body;   
        
        try{
            const producto = await this.productoService.findByNameAndUnit(name.toLowerCase(), unit.toLowerCase());

            res.status(200).json({
                ok: true,
                producto
            });                

        } catch(error) {
            this.handleException(error, res);
        }
    }

       
    @route('/obtenerTodo')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try {
            const productos = await this.productoService.getAll();

            res.status(200).json({
                ok: true,
                productos
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


}
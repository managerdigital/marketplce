import { Request, Response } from 'express';
import { route, POST, PUT, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { ProductoService } from '../services/productos.service';

import { ProductoCreateDto, ProductoUpdateDto } from '../dtos/productos.dto';

@route('/productos')
export class productoController extends BaseController{


    constructor(private readonly productoService: ProductoService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {

            const { 
                nombre, 
                categorias_id, 
                plazas_id, 
                descripcion, 
                sku,
                imagen_principal,
                imagen_1,
                imagen_2
            } = req.body;

            try{
                const producto = await this.productoService.store({
                    nombre,
                    categorias_id,
                    plazas_id,
                    descripcion,
                    sku,
                    imagen_principal,
                    imagen_1,
                    imagen_2
                } as ProductoCreateDto);

                res.status(200).json({
                    ok: true,
                    msg: 'Producto creado con exito',
                    producto
                });

            } catch(error) {
                this.handleException(error, res);
            }
        }    
    }


    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            const { 
                nombre, 
                categorias_id, 
                plazas_id, 
                descripcion, 
                sku,
                imagen_principal,
                imagen_1,
                imagen_2
            } = req.body;
    
            try {
                await this.productoService.update(id, {
                    nombre,
                    categorias_id,
                    plazas_id,
                    descripcion,
                    sku,
                    imagen_principal,
                    imagen_1,
                    imagen_2
                } as ProductoUpdateDto);
    
                res.status(200).json({
                    ok: true,
                    msg: "Producto actualizado con exito!"
                });
                
            } catch(error){
                this.handleException(error, res);
            }
        }
    }



    
    @route('/delete/:id')
    @PUT()
    public async delete(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};
        
        if(user.rol === 'SUPER_ADMIN') {
            
            try {
                const id = parseInt(req.params.id);
                await this.productoService.delete(id);
                
                res.status(200).json({
                    ok: true,
                    msg: "Producto borrado con exito!"
                });
    
            } catch(error){
                this.handleException(error, res);
            }
        }
    }



    @route('/find/:id')
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



       
    @route('/getAll')
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
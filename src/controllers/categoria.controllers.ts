import { Request, Response } from 'express';
import { GET, PUT, POST, route } from "awilix-express";

import { BaseController } from "../common/controllers/base.controller";

import { CategoriaService } from '../services/categorias.service';
import { CategoriaCreateDto, CategoriaUpdateDto } from '../dtos/categorias.dto';


@route('/categorias')
export class categoriaController extends BaseController{

    
    constructor(private readonly categoriaService: CategoriaService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{

        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            try{
                const {
                    nombre, 
                    slug, 
                    descripcion,
                    icono
                } = req.body;
    
                const categoria = await this.categoriaService.store({
                    nombre,
                    descripcion,
                    slug,
                    icono
                } as CategoriaCreateDto);
    
                res.status(200).json({
                    ok: true,
                    msg: 'Categoria creada correctamente',
                    categoria
                });
    
            } catch(error) {
                this.handleException(error, res);
            }
        }

    }


    // categorias/update/:id
    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            try{
                const {
                    nombre,
                    slug, 
                    descripcion, 
                    icono
                } = req.body;
                
                const id = parseInt(req.params.id);
    
                await this.categoriaService.update({
                    nombre,
                    descripcion,
                    slug,
                    icono
                } as CategoriaUpdateDto, id);
    
                res.status(200).json({
                    ok: true,
                    msg: 'Categoria actualizada correctamente'
                });
    
            } catch(error) {
                this.handleException(error, res);
            }
        }
    }


    @route('/findByID/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{

        try{
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.findById(id);
            
            res.status(200).json({
                ok: true,
                categoria
            });

        }catch(error) {
            this.handleException(error, res);
        }
    }




    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try{
            const categorias = await this.categoriaService.getAllCategorias();
            
            res.status(200).json({
                ok: true,
                categorias
            });

        } catch(error){
            this.handleException(error, res);
        }
    }



    @route('/delete/:id')
    @PUT()
    public async delete(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            const id = parseInt(req.params.id);  
    
            try {
                await this.categoriaService.delete(id);
                
                res.status(200).json({
                    ok: true,
                    msg: "Categoría borrada con exito!"
                });
    
            } catch(error){
                this.handleException(error, res);
            }
        }
    }


}

import { Request, Response } from 'express';
import { GET, route } from "awilix-express";

import { BaseController } from "../common/controllers/base.controller";

import { CategoriaService } from '../services/categorias.service';
import { PlazaService } from '../services/plazas.service';
import { LocatarioService } from '../services/locatarios.service';
import { ApplicationException } from '../common/exceptions/application.exception';


@route('/categorias')
export class categoriaController extends BaseController{

    
    constructor(private readonly categoriaService: CategoriaService,
                private readonly plazaService: PlazaService,
                private readonly locatarioService: LocatarioService){
        super();
    }

    // @route('/crear')
    // @POST()
    // public async store(req: Request, res: Response): Promise<void>{

    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         try{
    //             const {
    //                 nombre, 
    //                 slug, 
    //                 descripcion,
    //                 icono
    //             } = req.body;
    
    //             const categoria = await this.categoriaService.store({
    //                 nombre: nombre.toLowerCase(),
    //                 descripcion,
    //                 slug,
    //                 icono
    //             } as CategoriaCreateDto);
    
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: 'Categoria creada correctamente',
    //                 categoria
    //             });
    
    //         } catch(error) {
    //             this.handleException(error, res);
    //         }
    //     }

    // }


    // // categorias/update/:id
    // @route('/update/:id')
    // @PUT()
    // public async update(req: Request, res: Response): Promise<void>{
    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         try{
    //             const {
    //                 nombre,
    //                 slug, 
    //                 descripcion, 
    //                 icono
    //             } = req.body;
                
    //             const id = parseInt(req.params.id);
    
    //             await this.categoriaService.update({
    //                 nombre: nombre.toLowerCase(),
    //                 descripcion,
    //                 slug,
    //                 icono
    //             } as CategoriaUpdateDto, id);
    
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: 'Categoria actualizada correctamente'
    //             });
    
    //         } catch(error) {
    //             this.handleException(error, res);
    //         }
    //     }
    // }


    @route('/buscarPorID/:id')
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


    @route('/findByName/:name')
    @GET()
    public async finByName(req: Request, res: Response): Promise<void>{

        try{
            const name = req.params.name;
            const categoria = await this.categoriaService.findByName(name);
            
            res.status(200).json({
                ok: true,
                categoria
            });

        }catch(error) {
            this.handleException(error, res);
        }
    }




    @route('/obtenerTodo')
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

    @route('/obtenerCinco')
    @GET()
    public async getAllLimit5(req: Request, res: Response): Promise<void>{

        try{
            const categorias = await this.categoriaService.getAllLimit5();
            
            res.status(200).json({
                ok: true,
                categorias
            });

        } catch(error){
            this.handleException(error, res);
        }
    }

  

    @route('/obtenerPorPlazaId/:id')
    @GET()
    public async getByPlazaId(req: Request, res: Response): Promise<void>{

        try{
            const id = parseInt(req.params.id);

            const plaza = await this.plazaService.findById(id);

            const categorias = plaza.categorias_id;

            const categoriasReturn = [];
            for(let i = 0; i<categorias.length; i++) {
                const categoria = await this.categoriaService.findById(categorias[i]);
                categoriasReturn.push({
                    nombre: categoria.nombre
                })
            }
            
            res.status(200).json({
                ok: true,
                categorias: categoriasReturn
            });

        } catch(error){
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorLocatarioId/:id')
    @GET()
    public async getByLocatarioId(req: Request, res: Response): Promise<void>{

        try{
            const id = parseInt(req.params.id);

            const locatario = await this.locatarioService.findById(id);

            const categorias = locatario.categorias_id;
            
            if(!categorias) throw new ApplicationException("No hay categorias") 

            const categoriasReturn = [];
            for(let i = 0; i<categorias.length; i++) {
                const categoria = await this.categoriaService.findById(categorias[i]);
                categoriasReturn.push({
                    id: categoria.id,
                    nombre: categoria.nombre
                })
            }
            
            res.status(200).json({
                ok: true,
                categorias: categoriasReturn
            });

        } catch(error){
            this.handleException(error, res);
        }
    }



    // @route('/delete/:id')
    // @PUT()
    // public async delete(req: Request, res: Response): Promise<void>{
    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         const id = parseInt(req.params.id);  
    
    //         try {
    //             await this.categoriaService.delete(id);
                
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: "Categoría borrada con exito!"
    //             });
    
    //         } catch(error){
    //             this.handleException(error, res);
    //         }
    //     }
    // }


}

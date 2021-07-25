import { Request, Response } from 'express';
import { GET, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';

import { Plaza } from '../services/repositories/domain/plazas.domain';

import { PlazaService } from '../services/plazas.service';
import { LocalidadService } from '../services/localidad.service';



@route('/plazas')
export class plazaController extends BaseController{


    constructor(private readonly plazaService: PlazaService,
                private readonly localidadService: LocalidadService){
        super();
    }


    // @route('/crear')
    // @POST()
    // public async store(req: Request, res: Response): Promise<void>{
    
    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         const { 
    //             admin_id, 
    //             localidad_id, 
    //             categorias_id, 
    //             nombre, 
    //             direccion, 
    //             telefonos, 
    //             email, 
    //             horarios,
    //             img,
    //             logo
    //         } = req.body;
    
    //         try{
    
    //             const plaza = await this.plazaService.store({
    //                 admin_id,
    //                 localidad_id,
    //                 categorias_id,
    //                 nombre,
    //                 direccion,
    //                 telefonos,
    //                 email,
    //                 horarios,
    //                 img,
    //                 logo
    //             } as PlazaCreateDto);
                
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: 'Plaza creada con exito',
    //                 plaza
    //             });
                                                
    //         }catch(error){
    //             this.handleException(error, res);
    //         }
    
    //     }
        
    // }
    
    
    @route('/categoriasPorPlazaId/:id')
    @GET()
    public async categoriasPorPlazaId(req: Request, res: Response): Promise<void>{
    
        const id = parseInt(req.params.id);  
    
        try{
            const categorias = await this.plazaService.findCategoryByPlazaID(id);
        
            res.status(200).json({
                ok: true,
                categorias
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }
    
    @route('/obtenerTodoCorto')
    @GET()
    public async getAllShort(req: Request, res: Response): Promise<void>{
    
         try {
            const plazas = await this.plazaService.getAll();
    
            res.status(200).json({
                ok: true,
                plazas: plazas.map((plaza: Plaza) => {
                            return {
                                id: plaza.id,
                                nombre: plaza.nombre,
                                logo: plaza.logo,
                                img: plaza.img
                            };
                        })
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }
    
        
    @route('/obtenerTodo')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
    
        try {
            const plazas = await this.plazaService.getAll();
    
            const plazasReturn = [];
            for(let i = 0; i<plazas.length; i++) {
                const localidad = await this.localidadService.findById(plazas[i].localidad_id);
                plazasReturn.push({
                    id: plazas[i].id,
                    localidad: localidad.nombre,
                    categorias_id: plazas[i].categorias_id,
                    nombre: plazas[i].nombre,
                    direccion: plazas[i].direccion,
                    telefonos: plazas[i].telefonos,
                    email: plazas[i].email,
                    img: plazas[i].img,
                    logo: plazas[i].logo,
                    horarios: plazas[i].horarios
                });
            }

            res.status(200).json({
                ok: true,
                plazas: plazasReturn
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }

    
    @route('/buscarPorID/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  
    
        try{
            const plaza = await this.plazaService.findById(id);
    
            res.status(200).json({
                ok: true,
                plaza
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/buscarPorLocalidad/:id')
    @GET()
    public async findByLocalidad(req: Request, res: Response): Promise<void>{
        const localidad_id = parseInt(req.params.id);  
    
        try{
            const plaza = await this.plazaService.findByLocalidad(localidad_id);
    
            res.status(200).json({
                ok: true,
                plaza
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }
    
    
    
    @route('/buscarPorNombre')
    @GET()
    public async findByName(req: Request, res: Response): Promise<void>{
        const {nombre} = req.body;  
    
        try{
            const plaza = await this.plazaService.findByName(nombre);
    
            res.status(200).json({
                ok: true,
                plaza
            });
    
        } catch(error) {
            this.handleException(error, res);
        }
    }
    



    // @route('/update/:id')
    // @PUT()
    // public async update(req: Request, res: Response): Promise<void>{
        
    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         const id = parseInt(req.params.id);  
    //         const { 
    //             admin_id, 
    //             plaza_id, 
    //             localidad_id, 
    //             categorias_id, 
    //             nombre, 
    //             direccion, 
    //             email, 
    //             telefonos, 
    //             horarios, 
    //             activo,
    //             img, 
    //             logo
    //         } = req.body;
    
    //         try {
    //             await this.plazaService.update(id, {
    //                 admin_id,
    //                 plaza_id,
    //                 localidad_id,
    //                 categorias_id,
    //                 nombre,
    //                 direccion,
    //                 telefonos,
    //                 email,
    //                 horarios,
    //                 activo,
    //                 img, 
    //                 logo
    //             } as PlazaUpdateDto);
    
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: "Plaza actualizada con exito!"
    //             });
    //         } catch(error){
    //             this.handleException(error, res);
    //         }
    //     }
    // }



    // @route('/delete/:id')
    // @PUT()
    // public async delete(req: Request, res: Response): Promise<void>{

    //     const user = req.user as {id: number, rol: string};

    //     if(user.rol === 'SUPER_ADMIN') {
    //         const id = parseInt(req.params.id);  
    
    //         try {
    
    //             await this.plazaService.delete(id);
                
    //             res.status(200).json({
    //                 ok: true,
    //                 msg: "Plaza borrada con exito!"
    //             });
    
    //         } catch(error){
    //             this.handleException(error, res);
    //         }
    //     }
    // }

}













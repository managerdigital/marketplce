import { Request, Response } from 'express';
import { GET, PUT, POST, route } from "awilix-express";
import path = require('path');

import { BaseController } from '../common/controllers/base.controller';
import { LocatarioService } from '../services/locatarios.service';
import { LocatarioCreateDto, LocatarioUpdateDto } from '../dtos/locatario.dto';
import { Locatario } from '../services/repositories/domain/locatario.domain';


@route('/locatarios')
export class locatarioController extends BaseController{

    constructor(private readonly locatarioService: LocatarioService){
        super();
    }


    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{

        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            const { 
                admin_id, 
                plaza_id, 
                nombre_local, 
                numero_local, 
                nombre, 
                apellido, 
                cedula, 
                email, 
                productos_locatarios_id, 
                categorias_id, 
                telefonos, 
                horarios,
                img,
                logo
            } = req.body;
    
            try{
    
                const locatario = await this.locatarioService.store({
                    admin_id,
                    plaza_id,
                    categorias_id,
                    productos_locatarios_id,
                    nombre_local,
                    numero_local,
                    nombre,
                    apellido,
                    cedula,
                    email,
                    telefonos,
                    horarios,
                    img, 
                    logo
                } as LocatarioCreateDto);
    
                res.status(200).json({
                    ok: true,
                    locatario
                });
    
            }catch(error){
                this.handleException(error, res);
            }
        }
        
    }



    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{

        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN' || user.rol === 'LOCATARIO') {      
            const id = parseInt(req.params.id);  
            // const user = req.user as {id: number, rol: string};
            const { 
                admin_id, 
                plaza_id, 
                nombre_local, 
                numero_local, 
                nombre, 
                apellido, 
                cedula, 
                email, 
                categorias_id, 
                productos_locatarios_id, 
                telefonos, 
                horarios, 
                activo,
                img,
                logo
            } = req.body;
            
            try {
                await this.locatarioService.update(id, {
                    admin_id,
                    plaza_id,
                    categorias_id,
                    productos_locatarios_id,
                    nombre_local,
                    numero_local,
                    nombre,
                    apellido,
                    cedula,
                    email,
                    telefonos,
                    horarios,
                    activo,
                    img,
                    logo
                } as LocatarioUpdateDto);
    
                res.status(200).json({
                    ok: true,
                    msg: "Local actualizado con exito!"
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
            const id = parseInt(req.params.id);  
    
            try {
    
                await this.locatarioService.delete(id);
                
                res.status(200).json({
                    ok: true,
                    msg: "Local borrada con exito!"
                });
    
            } catch(error){
                this.handleException(error, res);
            }
        }
    }




    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
        try {

            const offset = parseInt(req.body.offset);

            const locatarios = await this.locatarioService.getAll(offset) as [];

            const totalLocatarios = await this.locatarioService.totalLocatarios();

            res.status(200).json({
                ok: true,
                locatarios,
                total: totalLocatarios
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
            const locatario = await this.locatarioService.findById(id);

            res.status(200).json({
                ok: true,
                locatario
            });
            return;         
        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/findByNumeroDeLocalYPlazaId')
    @GET()
    public async findByNumeroDeLocalYPlazaId(req: Request, res: Response): Promise<void>{
        // const plazaId = parseInt(req.params.plazaId);  
        // const numeroLocal = parseInt(req.params.nLocal);  

        const { plazaId, numeroLocal } = req.body;

        try{
            const locatario = await this.locatarioService.findByNumeroDeLocalYPlazaId(numeroLocal, plazaId);

            res.status(200).json({
                ok: true,
                locatario
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/findByCedula/:cedula')
    @GET()
    public async findByCedula(req: Request, res: Response): Promise<void>{

        const cedula = parseInt(req.params.cedula);

        try{
            const locatario = await this.locatarioService.findByCedula(cedula);
            
            res.status(200).json({
                ok: true,
                locatario
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }




    @route('/totalLocatarioPorPlaza')
    @GET()
    public async getTotalLocatariosDePlaza(req: Request, res: Response): Promise<void>{
        try{
            // const id = parseInt(req.params.id);  
            const cantidadLocales = await this.locatarioService.getTotalLocatariosDePlaza();

            res.status(200).json({
                ok: true,
                cantidadLocales
            });

        }catch(error){
            this.handleException(error, res);
        }
    }




    @route('/locatariosPorPlaza/:plazaid')
    @GET()
    public async getLocatariosPorPlaza(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const locatarios = await this.locatarioService.getLocatariosPorPlaza(plaza_id);

            res.status(200).json({
                ok: true,
                locatarios
            });

        }catch(error){
            this.handleException(error, res);
        }
    }


    @route('/locatariosPorPlazaCorto/:plazaid')
    @GET()
    public async getLocatariosPorPlazaCorto(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const locatarios = await this.locatarioService.getLocatariosPorPlaza(plaza_id);

            res.status(200).json({
                ok: true,
                locatarios: locatarios.map((locatario: Locatario) => {
                    return {
                        id: locatario.id,
                        nombre_propietario: locatario.nombre,
                        nombre_local: locatario.nombre_local,
                        img: locatario.img,
                        logo: locatario.logo
                    };
                })
            });

        }catch(error){
            this.handleException(error, res);
        }
    }


    @route('/locatariosPorPlazaCortoPaginado/:plazaid')
    @GET()
    public async locatariosPorPlazaCortoPaginado(req: Request, res: Response): Promise<void>{
        try{
            const {desde, hasta} = req.body;
            const plaza_id = parseInt(req.params.plazaid);  

            const locatarios = await this.locatarioService.getLocatariosPorPlazaPaginado(plaza_id, hasta, desde);
            
            res.status(200).json({
                ok: true,
                locatarios: locatarios.map((locatario: Locatario) => {
                    return {
                        id: locatario.id,
                        nombre_propietario: locatario.nombre,
                        nombre_local: locatario.nombre_local,
                        img: locatario.img,
                        logo: locatario.logo
                    };
                })
            });

        }catch(error){
            this.handleException(error, res);
        }
    }


    @route('/subirCSV')
    @POST()
    public async subirCSV(req: Request, res: Response): Promise<void>{

        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') { 
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).json({
                    ok: false,
                    msg: 'No hay ningun archivo'
                });
                return;
            }
    
            const file = req.files.archivo;
    
            try{
                
                await this.locatarioService.convert2Excel(file, user.id);
    
                res.status(200).json({
                    ok: true,
                    msg: 'Se subio el archivo con exito'
                });
    
            } catch(error){
                this.handleException(error, res);
            }
        }
    }


    
    @route('/descargaPlantilla')
    @GET()
    public async descargaPlantilla(req: Request, res: Response): Promise<void>{
        // const user = req.user as {id: number, rol: string};

        // if(user.rol === 'SUPER_ADMIN') {     
            try{
                const pathXLSX = path.join(__dirname, `../../uploads/XLSX/formato.xlsx`);
                res.download(pathXLSX, 'formato.xlsx');

            } catch(error){
                this.handleException(error, res);
            }
        // }
    }


}
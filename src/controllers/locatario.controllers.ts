import { Request, Response } from 'express';
import { GET, POST, route } from "awilix-express";

import { BaseController } from '../common/controllers/base.controller';
import { LocatarioService } from '../services/locatarios.service';
import { Locatario } from '../services/repositories/domain/locatario.domain';


@route('/locatarios')
export class locatarioController extends BaseController{

    constructor(private readonly locatarioService: LocatarioService){
        super();
    }


    @route('/obtenerTodo')
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
    

    @route('/findByNumeroDeLocalYPlazaId/:numeroLocal/:plazaId')
    @GET()
    public async findByNumeroDeLocalYPlazaId(req: Request, res: Response): Promise<void>{

        // const { plazaId, numeroLocal } = req.body;
        const numeroLocal = parseInt(req.params.numeroLocal);  
        const plazaId = parseInt(req.params.plazaId);  

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

        try{
            const cedula = parseInt(req.params.cedula);

            const locatarios = await this.locatarioService.findByCedula(cedula) as Locatario[];
            
            res.status(200).json({
                ok: true,
                locatarios
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }




    @route('/totalLocatarioPorPlaza')
    @GET()
    public async getTotalLocatariosDePlaza(req: Request, res: Response): Promise<void>{
        try{
            const cantidadLocales = await this.locatarioService.getTotalLocatariosDePlaza();

            res.status(200).json({
                ok: true,
                cantidadLocales
            });

        }catch(error){
            this.handleException(error, res);
        }
    }


    @route('/locatariosPorPlazaYCategoria/:plazaid/:categoriaid')
    @GET()
    public async getLocatariosPorPlazaYCategoria(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const categoria_id = parseInt(req.params.categoriaid);  

            const locatarios = await this.locatarioService.getLocatariosPorPlazaYCategoria(plaza_id, categoria_id);

            res.status(200).json({
                ok: true,
                locatarios
            });

        }catch(error){
            this.handleException(error, res);
        }
    }



    @route('/buscadorPorPlazaIdYCategoriaId/:plazaid/:categoriaid/:texto')
    @GET()
    public async buscadorPorPlazaIdYCategoriaId(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const categoria_id = parseInt(req.params.categoriaid);  
            const texto = req.params.texto;

            const locatarios = await this.locatarioService.buscadorPorPlazaIdYCategoriaId(plaza_id, categoria_id, texto);

            res.status(200).json({
                ok: true,
                locatarios
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


    @route('/quinceLocatariosPorPlaza/:plazaid')
    @GET()
    public async getquinceLocatariosPorPlaza(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const locatarios = await this.locatarioService.getquinceLocatariosPorPlaza(plaza_id);

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
    @POST()
    public async locatariosPorPlazaCortoPaginado(req: Request, res: Response): Promise<void>{
        try{
            const plaza_id = parseInt(req.params.plazaid);  
            const { locatarioId, limite } = req.body;

            const locatarios = await this.locatarioService.getLocatariosPorPlazaPaginado(plaza_id, locatarioId, limite);
            
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
    

}
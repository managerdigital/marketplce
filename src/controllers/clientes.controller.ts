import { Request, Response } from 'express';
import { GET, PUT, POST, route } from "awilix-express";
import path=require('path');

import { BaseController } from "../common/controllers/base.controller";

import { ClienteService } from '../services/clientes.service';
import { ClienteCreateDto, ClienteUpdatedDto } from '../dtos/clientes.dto';


// SUPER_ADMIN, ADMIN_LOCATARIO, LOCATARIO
@route('/clientes')
export class clienteController extends BaseController{

    constructor(private readonly clienteService: ClienteService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        try{
            const {
                email, 
                password, 
                nombre, 
                telefono, 
                direccion, 
                cedula,
                img
            } = req.body;

            const cliente = await this.clienteService.store({
                email,
                password,
                nombre,
                cedula,
                telefono,
                direccion,
                img
            } as ClienteCreateDto);
            
            res.status(200).json({
                ok: true, 
                cliente
            });

        } catch(error){
            this.handleException(error, res);
        }
    }


    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);  
            const {
                email, 
                password, 
                nombre, 
                telefono, 
                direccion, 
                cedula,
                img
            } = req.body;

            const cliente = await this.clienteService.update(id, {
                email,
                password,
                nombre,
                cedula,
                telefono,
                direccion,
                img
            } as ClienteUpdatedDto);

        
            res.status(200).json({
                ok: true, 
                cliente
            });
            return;

        } catch(error){
            this.handleException(error, res);
        }
    }

    @route('/find/:id')
    @GET()
    public async getById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const cliente = await this.clienteService.find(id);
          
            res.status(200).json({
                ok: true, 
                cliente
            });
            return;
    
        } catch(error){
            this.handleException(error, res);
        }
    }


    @route('/delete/:id')
    @PUT()
    public async delete(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};
        const id = parseInt(req.params.id);

        if(user.rol === 'SUPER_ADMIN') {
            
            try {
                await this.clienteService.delete(id);
                
                res.status(200).json({
                    ok: true,
                    msg: "Cliente borrado con exito!"
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
            const clientes = await this.clienteService.getAll();

            res.status(200).json({
                ok: true,
                clientes
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    
    @route('/downladXLSX')
    @GET()
    public async downladXLSX(req: Request, res: Response): Promise<void>{

        try {
            await this.clienteService.generateXLSX();
            
            const pathXLSX = path.join(__dirname, `../../uploads/XLSX/clientes_regitrados.xlsx`);
            res.download(pathXLSX, 'clientes_regitrados.xlsx');

        } catch(error) {
            this.handleException(error, res);
        }
    }

 
}
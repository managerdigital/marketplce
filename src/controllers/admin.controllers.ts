import { Request, Response } from 'express';
import { GET, PUT, POST, route } from "awilix-express";

import { BaseController } from "../common/controllers/base.controller";

import { AdminService } from '../services/admin.service';

import { AdminCreateDto, AdminUpdateDto } from '../dtos/admin.dto';
import { AdminController } from '../services/repositories/domain/admin.domain';

// SUPER_ADMIN, ADMIN_LOCATARIO, LOCATARIO
@route('/admins')
export class adminController extends BaseController{

    constructor(private readonly adminService: AdminService){
        super();
    }

    @route('/getAdmin/:id')
    @GET()
    public async getById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const admin = await this.adminService.findById(id) as AdminController;
            
            delete admin.password;
            delete admin.token_reset;
    
            res.status(200).json({
                ok: true,
                admin
            });    
        } catch(error) {
            this.handleException(error, res); 
        }
    }

    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try {
            const admins = await this.adminService.getAll();

            res.status(200).json({
                ok: true,
                admins
            });

        } catch(error){
            this.handleException(error, res);
        }

    }

    @route('/updateAdmin/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        const user = req.user as {id: number, rol: string};

        if(user.rol === 'SUPER_ADMIN') {
            
            const id = parseInt(req.params.id);
            
            const {
                nombre,
                apellido, 
                telefono, 
                cedula,
                img
            } = req.body;

            try{
                await this.adminService.update(id, {
                    nombre,
                    apellido,
                    telefono,
                    img,
                    cedula
                } as AdminUpdateDto);
    
                res.status(200).json({
                    ok: true,
                    msg: 'Admin Actualizado'
                });
    
            } catch(error) {
                this.handleException(error, res);
            }
            
        }
    }




    @route('/change-password')
    @PUT()
    public async changePassword(req: Request, res: Response): Promise<void> {

        const { email, newPassword, oldPassword } = req.body;

        const user = req.user as {id: number};

        try {
            await this.adminService.changePassword(user.id, email, oldPassword, newPassword);

            res.status(200).json({
                ok: true,
                msg: 'Cambio de contraseña con exito!'
            });
        } catch(error) {
            this.handleException(error, res);
        }
    }




     @route('/registerAdmin')
     @POST()
     public async registro(req: Request, res: Response): Promise<void>{
 
         const { 
            nombre, 
            apellido, 
            telefono, 
            cedula, 
            email, 
            password,
            img, 
            rol 
        } = req.body;

        try {
            const emailLowerCase = email.toLowerCase();
            const admin = await this.adminService.store({
                nombre,
                apellido,
                telefono,
                cedula,
                email: emailLowerCase,
                password,
                img,
                rol 
            } as AdminCreateDto) as AdminController;
            
            delete admin.password;
            delete admin.token_reset;

            res.status(200).json({
                ok: true,
                msg: "Administrador creado exitosamente!",
                admin
            });
            
        } catch(error) {
            this.handleException(error, res);
        }   
     }



    @route('/renewToken')
    @GET()
    public async reNewToken(req: Request, res: Response): Promise<void>{
        
        const token = req.headers.token as string;

        try {
            // const newToken = await this.adminService.renewToken(token);
            const newToken = await this.adminService.renewToken(token);

            res.status(200).json({
                ok: true,
                token: newToken,
            });

        }catch(error) {
            this.handleException(error, res);     
        }
    }



    @route('/findByCedula/:cedula')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{

        try{
            const cedula = parseInt(req.params.cedula);
            const admin = await this.adminService.findByCedula(cedula);
            
            res.status(200).json({
                ok: true,
                admin
            });

        }catch(error) {
            this.handleException(error, res);
        }
    }


}
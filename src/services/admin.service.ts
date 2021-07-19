import jwt from "jsonwebtoken";
// import { QueryResult } from 'pg';
import bcrypt from "bcryptjs";

import { Admin } from './repositories/domain/admin.domain';
import { AdminPGRepository } from './repositories/implementation/pg/admin.imp';
import { ApplicationException } from '../common/exceptions/application.exception';
import { AdminCreateDto, AdminUpdateDto } from '../dtos/admin.dto';
// import { pool } from '../common/persistence/pg.persistence';


export class AdminService {
    
  
    constructor(private readonly adminRepository: AdminPGRepository) {}


    public async getAll(): Promise<Admin[] | null>{
      const admins: Admin[] = await this.adminRepository.getAll() as Admin[];

      if(!admins) throw new ApplicationException("No hay admins registrados");

      return admins.map((admin: Admin) => {
        admin.password = '';
        return admin;
      });
    }



    public async update(id: number, entry: AdminUpdateDto): Promise<void>{
      try{
        const originalEntry = await this.adminRepository.findById(id) as Admin;
        
        if(!originalEntry) throw new ApplicationException("Admin no encontrado");
          
        originalEntry.nombre = entry.nombre || originalEntry.nombre;
        originalEntry.apellido = entry.apellido || originalEntry.apellido;
        originalEntry.telefono = entry.telefono || originalEntry.telefono;
        originalEntry.cedula = entry.cedula || originalEntry.cedula;
        originalEntry.img = entry.img || originalEntry.img;
            
        await this.adminRepository.update(originalEntry);
      }catch(error){
        throw new ApplicationException("Hubo un error" + error);
      }
    }


    public async findById(id: number): Promise<Admin> {
      try{
        const admin = await this.adminRepository.findById(id);
        if(!admin) throw new ApplicationException("No existe un admin con ese id");
        return admin;
      } catch(error){
        throw new ApplicationException("Hubo un error" + error);
      }
    }


    public async findByCedula(cedula: number): Promise<Admin> {
      try{
        const admin = await this.adminRepository.findByCedula(cedula);
        if(!admin) throw new ApplicationException("No existe un admin con esa cedula");
        return admin;
      } catch(error){
        throw new ApplicationException("Hubo un error" + error);
      }
    }

        
    // Cuando el usuario ya esta en la aplicación
    public async changePassword(id: number, email:string, oldPassword: string, newPassword: string): Promise<void> {

      if (!email || !newPassword || !oldPassword ) throw new ApplicationException("El email, la contraseña antigua y la nueva son requeridos");
      
      try {
        const admin = await this.adminRepository.findById(id);
        if (!admin) throw new ApplicationException("No existe");
        
        // Valido Password
        if(!admin.password) throw new ApplicationException("Hubo un error");
        await this.validaciones(newPassword);

        const validPassword = bcrypt.compareSync(
          oldPassword,
          admin.password
        );

        if (!validPassword) throw new ApplicationException("Hubo un error");
        // Encriptar contraseña nueva
        admin.password = await this.encriptarContraseña(newPassword);
        // const salt = bcrypt.genSaltSync();
        // admin.password = bcrypt.hashSync(newPassword, salt);
        await this.adminRepository.changePassword(admin);
      } catch (error) {
        throw new ApplicationException("Hubo un error" + error);
      }      
    }


    private async validaciones(cadena: string): Promise<void>{
      if(cadena.indexOf("<") > 0) throw new ApplicationException("No se permiten <");
      if(cadena.indexOf(">") > 0) throw new ApplicationException("No se permiten <");
      if(cadena.indexOf("'") > 0) throw new ApplicationException("No se permiten <");
      if(cadena.indexOf('"') > 0) throw new ApplicationException("No se permiten >");
    }

    private async encriptarContraseña(password: string): Promise<string>{
      const salt = bcrypt.genSaltSync();
      return bcrypt.hashSync(password, salt);
    }


    public async store(admin: AdminCreateDto): Promise<Admin> {
      if(!admin.password) throw new ApplicationException("El password es necesario");
      if(admin.password.length < 6) throw new ApplicationException("La contraseña es muy corta");
      
      admin.apellido = admin.apellido || '';
      admin.nombre = admin.nombre || '';
      
      const email = admin.email;
      
      const user = await this.adminRepository.findByEmail(email);
      if(user) throw new ApplicationException("Ya existe ese correo en el sistema");
      

      // Note: Validaciones
      await this.validaciones(admin.password);
      await this.validaciones(admin.nombre);
      await this.validaciones(admin.apellido);
      
      // Encriptar contraseña
      admin.password = await this.encriptarContraseña(admin.password);
      // const salt = bcrypt.genSaltSync();
      // admin.password = bcrypt.hashSync(admin.password, salt);

      try {
        const adminReturn = await this.adminRepository.store({
          nombre: admin.nombre,
          apellido: admin.apellido,
          telefono: admin.telefono,
          cedula: admin.cedula,
          rol: admin.rol,
          email,
          password: admin.password,
          img: admin.img
        } as AdminCreateDto);
        
        if(!adminReturn) throw new ApplicationException("Hubo un error");
        return adminReturn;

      } catch (error) {
        throw new ApplicationException("Hubo un error" + error);
      }
    }

    



    // TODO: Revisar el token de los headders
    public async renewToken(token: string): Promise<string> {
      
      if(!token) throw new ApplicationException('Hubo un error');

      const secretKey = process.env.jwt_secret_key;
      
      if(!secretKey) throw new ApplicationException("No existe");

      try {
        const admin = jwt.verify(token, secretKey) as {id:string, rol: string};
        if(!admin) throw new ApplicationException("No existe");
        
        return jwt.sign(
            {
                id: admin.id,
                rol: admin.rol
              },
              secretKey,
              { expiresIn: "3h", algorithm: "HS256" }
        );  
      
      } catch(error) {
        throw new Error("Hubo un error en los campos solicitados");
      } 
    }

}
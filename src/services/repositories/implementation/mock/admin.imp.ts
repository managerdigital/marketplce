
import { Admin } from "../../domain/admin.domain";
// import { Locatario } from '../../domain/locatario.domain';

import { AdminCreateDto } from '../../../../dtos/admin.dto';

import { AdminRepository } from '../../admins.repository';
import db from '../../../../common/persistence/mock.persistence';


export class AdminMockRepository implements AdminRepository {


    changePassword(entry: Admin): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async remove(id: number): Promise<void> {
        const table = db.admins as Admin[];
        db.admins = table.find(x => x.id === id) as any;
    }


    async getAll(): Promise<Admin[] | null> {
        const table = db.admins as Admin[];
        if(table) return Object.assign({...table});
        return null;
    }

    
    public async store(entry: AdminCreateDto): Promise<Admin | null> {
       const table = db.admins as Admin[];
       const now  = new Date();

       db._admnisId++;
       table.push({
            id: db._admnisId,
            nombre: entry.nombre,
            apellido: entry.apellido,
            telefono: entry.telefono,
            cedula: entry.cedula,
            email: entry.email.toLocaleLowerCase(),
            password: entry.password,
            rol: entry.rol, 
            create_at: now,
            updated_at: now
       } as Admin);
    
       const result = table.find(x => x.id === db._admnisId);

       if(result) return Object.assign({...result});
       return null;
    }



    public async findById(id: number): Promise<Admin | null>{
        const table = db.admins as Admin[];
        const result = table.find(x => x.id === id);

        if(result) return Object.assign({...result});
        return null;
    }


    public async findByEmail(email: string): Promise<Admin | null> {
        const table = db.admins as Admin[];
        const result = table.find(x => x.email === email);

        if(result) return Object.assign({...result});
        return null;
    }

    public async findByCedula(cedula: number): Promise<Admin | null> {
        const table = db.admins as Admin[];
        const result = table.find(x => x.cedula === cedula);

        if(result) return Object.assign({...result});
        return null;
    }


    public async update(entry: Admin, changePassword = false): Promise<void> {
        const table = db.admins as Admin[];
        const now  = new Date();

        const originaleEntry = table.find(x => x.id === entry.id);

        if(originaleEntry){
            originaleEntry.nombre = entry.nombre;
            originaleEntry.apellido = entry.apellido;
            originaleEntry.telefono = entry.telefono;
            originaleEntry.cedula = entry.cedula;
            originaleEntry.email = entry.email.toLocaleLowerCase();
            originaleEntry.password = entry.password;
            originaleEntry.rol = entry.rol;
            originaleEntry.updated_at = now;
        }
    }




}

import { Admin } from "../../domain/admin.domain";
// import { Locatario } from '../../domain/locatario.domain';

import { AdminCreateDto } from '../../../../dtos/admin.dto';

import { AdminRepository } from '../../admins.repository';
import db from '../../../../common/persistence/mock.persistence';


export class AdminMockRepository implements AdminRepository {


    async changePassword(entry: Admin): Promise<void> {
        const table = db.admins as Admin[];
        db.admins = table.map(x => {
            if(x.id === entry.id) {
                x.password = entry.password;
            }
        }) as any;
    }

    async remove(id: number): Promise<void> {
        const table = db.admins as Admin[];
        db.admins = table.map(x => {
            if(x.id === id) x.activo = false;
        }) as any;
    }


    async getAll(): Promise<Admin[] | null> {
        const table = db.admins as Admin[];
        if(table) return Object.assign({...table});
        return null;
    }

    
    public async store(entry: AdminCreateDto): Promise<Admin | null> {
        const table = db.admins as Admin[];
        const now  = new Date();

        table.push({
            id: db._admnisId,
            cedula: entry.cedula,
            nombre: entry.nombre,
            apellido: entry.apellido,
            telefono: entry.telefono,
            email: entry.email.toLocaleLowerCase(),
            password: entry.password,
            img: entry.img,
            rol: entry.rol,
            activo: true,
            created_at: now,
            updated_at: now
        } as Admin);
    
        const result = table.find(x => x.id === db._admnisId);

        if(result) return Object.assign({...result});
        return null;
    }



    public async findById(id: number): Promise<Admin | null>{
        const table = db.admins as Admin[];
        const result = table.find(x => x.id === id);
        
        // Note: Para romper la mutabilidad
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


    public async update(entry: Admin): Promise<void> {
        const table = db.admins as Admin[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === entry.id);

        if(originalEntry){
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.apellido = entry.apellido || originalEntry.apellido;
            originalEntry.telefono = entry.telefono || originalEntry.telefono;
            originalEntry.cedula = entry.cedula || originalEntry.cedula;
            originalEntry.email = entry.email.toLocaleLowerCase() || originalEntry.email;
            originalEntry.password = entry.password || originalEntry.password;
            originalEntry.rol = entry.rol || originalEntry.rol;
            originalEntry.img = entry.img || originalEntry.img;
            originalEntry.updated_at = now;
        }
    }




}
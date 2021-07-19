import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';
import db from '../../../../common/persistence/mock.persistence';

import { Locatario } from '../../domain/locatario.domain';
import { LocatarioRepository } from '../../locatario.repository';
import { LocatarioCreateDto, LocatarioUpdateDto } from '../../../../dtos/locatario.dto';


export class LocatarioMockRepository implements LocatarioRepository {

    async store(entry: LocatarioCreateDto): Promise<Locatario | null> {
        const table = db.locatarios as Locatario[];
        const now  = new Date();

        db._locatariosId++;
        table.push({
            id: db._plazasId,
            admin_id: entry.admin_id,
            plaza_id: entry.plaza_id,
            categorias_id: entry.categorias_id,
            numero_local: entry.numero_local,
            productos_locatarios_id: entry.productos_locatarios_id,
            nombre_local: entry.nombre_local,
            nombre: entry.nombre,
            apellido: entry.apellido,
            cedula: entry.cedula,
            email: entry.email,
            img: entry.img,
            logo: entry.logo,
            telefonos: entry.telefonos,
            horarios: entry.horarios,
            created_at: now,
            updated_at: now
        } as Locatario);
        
        const result = table.find(x => x.id === db._plazasId);

        if(result) return Object.assign({...result});
        return null;
    }





    async update(id: number, entry: LocatarioUpdateDto): Promise<void> {
        const table = db.locatarios as Locatario[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === id) as any;
 
        if(originalEntry){
            originalEntry.admin_id = entry.admin_id || originalEntry.admin_id;
            originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
            originalEntry.numero_local = entry.numero_local || originalEntry.numero_local;
            originalEntry.nombre_local = entry.nombre_local || originalEntry.nombre_local;
            originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
            originalEntry.productos_locatarios_id = entry.productos_locatarios_id || originalEntry.productos_locatarios_id;
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.apellido = entry.apellido || originalEntry.apellido;
            originalEntry.cedula = entry.cedula || originalEntry.cedula;
            originalEntry.email = entry.email || originalEntry.email;
            originalEntry.telefonos = entry.telefonos || originalEntry.telefonos;
            originalEntry.horarios = entry.horarios || originalEntry.horarios;
            originalEntry.img = entry.img || originalEntry.img;
            originalEntry.logo = entry.logo || originalEntry.logo;
            originalEntry.updated_at = now;
        } 
    }


    async findById(id: number): Promise<Locatario | null> {
        const table = db.locatarios as Locatario[];
        const result = table.find(x => x.id === id);
        if(result) return Object.assign({...result});
        return null;
    }


    async findByEmail(email:string): Promise<Locatario | null> {
        const table = db.locatarios as Locatario[];
        const result = table.find(x => x.email === email);
        if(result) return Object.assign({...result});
        return null;
    }


    async findByCedula(cedula: number): Promise<Locatario[] | null> {
        const table = db.locatarios as Locatario[];
        const result = table.find(x => x.cedula === cedula);
        if(result) return Object.assign({...result});
        return null;
    }


    // SELECT * FROM locatarios WHERE '(408)-783-5731' = ANY (numero_local);
    async findPorNumeroLocalPlazaId(noLocal: number, plazaId: number): Promise<Locatario | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE $1 = ANY (numero_local) AND plaza_id = $2",
            [
                noLocal,
                plazaId
            ]
            );
        if (response.rows.length) return response.rows[0] as Locatario; 
        return null;
    }



    async getAll(offset: number): Promise<Locatario[]| null> {
        const table = db.locatarios as Locatario[];
        if(table) return Object.assign({...table});
        return null;
    }


    async totalLocatarios(): Promise<number>{
        const table = db.locatarios as Locatario[];
        if(!table.length) return 0;
        return table.length;
    }


    async delete(id: number): Promise<void> {
        const table = db.locatarios as Locatario[];
        db.plazas = table.map(x => {
            if(x.id === id) x.activo = false;
        }) as any;  
    }
        

    public async getLocatariosPorPlaza(plaza_id: number): Promise<Locatario[] | null>{
        const table = db.locatarios as Locatario[];
        const result = table.filter(x => x.plaza_id === plaza_id);
        if(result) return Object.assign({...result});
        return null;
    }


    public async getTotalLocatariosDePlaza(): Promise<[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT plaza_id, COUNT(plaza_id) AS total FROM locatarios GROUP BY plaza_id");
        
        if (response.rows.length) return response.rows as [];
        return null;
    }

}


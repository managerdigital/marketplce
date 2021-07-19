/* eslint-disable no-case-declarations */
import db from '../../../../common/persistence/mock.persistence';

import { PlazaCreateDto, PlazaUpdateDto } from '../../../../dtos/plazas.dto';
import { Plaza } from '../../domain/plazas.domain';
import { PlazaRepository } from '../../plazas.repository';


export class PlazaMockRepository implements PlazaRepository{

 
    
    async store(entry: PlazaCreateDto): Promise<Plaza | null> {
        const table = db.plazas as Plaza[];
        const now  = new Date();

        db._plazasId++;
        table.push({
            id: db._plazasId,
            admin_id: entry.admin_id,
            localidad_id: entry.localidad_id,
            categorias_id: entry.categorias_id,
            nombre: entry.nombre,
            direccion: entry.direccion,
            telefonos: entry.telefonos,
            email: entry.email,
            img: entry.img,
            logo: entry.logo,
            horarios: entry.horarios, 
            activo: true,
            token_reset: null, 
            created_at: now,
            updated_at: now
        } as any);
        
        const result = table.find(x => x.id === db._plazasId);

        if(result) return Object.assign({...result});
        return null;

    }



    async update(id: number, entry: PlazaUpdateDto): Promise<void> {
        const table = db.plazas as Plaza[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === id) as any;
        
        if(originalEntry){
            originalEntry.admin_id = entry.admin_id || originalEntry.admin_id;
            originalEntry.localidad_id = entry.localidad_id || originalEntry.localidad_id;
            originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.direccion = entry.direccion || originalEntry.direccion;
            originalEntry.telefonos = entry.telefonos || originalEntry.telefonos;
            originalEntry.email = entry.email || originalEntry.email;
            originalEntry.img = entry.img || originalEntry.img;
            originalEntry.logo = entry.logo || originalEntry.logo;
            originalEntry.horarios = entry.horarios || originalEntry.horarios;
            originalEntry.updated_at = now;
        }
    }


    async delete(id: number): Promise<void> {
        const table = db.plazas as Plaza[];
        db.plazas = table.map(x => {
            if(x.id === id) x.activo = false;
        }) as any;
    }



    async getAll(): Promise<Plaza[] | null> {
        const table = db.plazas as Plaza[];
        if(table) return Object.assign({...table});
        return null;
    }

    
    public async findByName(nombre: string): Promise<Plaza | null>{
        const table = db.plazas as Plaza[];
        const result = table.find(plaza => plaza.nombre === nombre);
        if(!result) return null;
        return result;
    }


    public async findByEmail(email: string): Promise<Plaza | null>{
        const table = db.plazas as Plaza[];
        const result = table.find(plaza => plaza.email === email);
        if(!result) return null;
        return result;
    }

    
    async findById(id: number): Promise<Plaza | null> {
        const table = db.plazas as Plaza[];
        const result = table.find((plaza: Plaza) => plaza.id === id);
        if(!result) return null;
        return Object.assign({...result});
    }
 

}
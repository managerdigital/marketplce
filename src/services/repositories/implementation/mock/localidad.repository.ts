import db from '../../../../common/persistence/mock.persistence';

import { Localidad } from '../../domain/localidades.domain';
import { LocalidadRepository } from '../../localidades.repository';


export class LocalidadMockRepository implements LocalidadRepository {


    async store(nombre: string): Promise<void> {
        const table = db.localidades as Localidad[];
        const now  = new Date();
   
        table.push({
            id: db._localidadesId,
            nombre: nombre,
            created_at: now,
            updated_at: now
        } as Localidad);
    }
    
    
    async getAll(): Promise<Localidad[] | null> {
        const table = db.localidades as Localidad[];
        if(table) return Object.assign({...table});
        return null;
    }


    async findById(id: number): Promise<Localidad | null> {
        const table = db.localidades as Localidad[];
        const result = table.find(x => x.id === id);
        if(result) return Object.assign({...result});
        return null;
    }

    async findByName(nombre: string): Promise<Localidad | null> {
        const table = db.localidades as Localidad[];
        const result = table.find(x => x.nombre === nombre);
        if(result) return Object.assign({...result});
        return null;
    }


    async update(entry: Localidad): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
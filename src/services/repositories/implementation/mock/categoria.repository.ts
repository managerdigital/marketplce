import db from '../../../../common/persistence/mock.persistence';

import { CategoriaCreateDto } from '../../../../dtos/categorias.dto';
import { Categoria } from '../../domain/categoria.domain';
import { CategoriaRepository } from '../../categorias.repository';



export class CategoriaMockRepository implements CategoriaRepository{


    async store(entry: CategoriaCreateDto): Promise<Categoria | null> {
        const table = db.categorias as Categoria[];
        const now  = new Date();
   
        table.push({
            id: db._categoriasId,
            nombre: entry.nombre,
            descripcion: entry.descripcion,
            icono: entry.icono,
            slug: entry.slug,
            created_at: now,
            updated_at: now
        } as Categoria);
    
        const result = table.find(x => x.id === db._categoriasId);

        if(result) return Object.assign({...result});
        return null;   
    }
   

    
    async update(entry: Categoria): Promise<void> {
        const table = db.categorias as Categoria[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === entry.id);

        if(originalEntry){
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;
            originalEntry.icono = entry.icono || originalEntry.icono;
            originalEntry.slug = entry.slug || originalEntry.slug;
            originalEntry.updated_at = now;
        }
    }



   async getAllCategorias(): Promise<Categoria[] | null> {
        const table = db.categorias as Categoria[];
        if(table) return Object.assign({...table});
        return null;
   }


   async findById(id: number): Promise<Categoria | null> {
        const table = db.categorias as Categoria[];
        const result = table.find(x => x.id === id);
        if(result) return Object.assign({...result});
        return null;
   }


   async findByName(nombre: string): Promise<Categoria | null> {
        const table = db.categorias as Categoria[];
        const result = table.find(x => x.nombre === nombre);
        if(result) return Object.assign({...result});
        return null;
   }
   
    
    async delete(id: number): Promise<void> {
        const table = db.categorias as Categoria[];
        db.categorias = table.filter(x => x.id !== id);
    }



}
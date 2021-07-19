import db from '../../../../common/persistence/mock.persistence';


import { ProductoCreateDto, ProductoUpdateDto } from '../../../../dtos/productos.dto';
import { Productos } from '../../domain/productos.domain';
import { ProductoRepository } from '../../productos.repository';

export class ProductosMockRepository implements ProductoRepository {

    
    async store(entry: ProductoCreateDto): Promise<Productos | null> {
        const table = db.productos as Productos[];
        const now  = new Date();

        db._productosId++;
        table.push({
            id: db._productosId,
            categorias_id: entry.categorias_id,
            plazas_id: entry.plazas_id,
            nombre: entry.nombre,
            descripcion: entry.descripcion,
            unidad: entry.unidad,
            sku: entry.sku,
            imagen_principal: entry.imagen_principal,
            imagen_1: entry.imagen_1,
            imagen_2: entry.imagen_2,
            created_at: now,
            updated_at: now
        } as Productos);
        
        const result = table.find(x => x.id === db._productosId);

        if(result) return Object.assign({...result});
        return null;
    }




    async update(id: number, entry: ProductoUpdateDto): Promise<void> {
        const table = db.productos as Productos[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === id) as any;
        
        if(originalEntry){
            originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
            originalEntry.plazas_id = entry.plazas_id || originalEntry.plazas_id;
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;
            originalEntry.unidad = entry.unidad || originalEntry.unidad;
            originalEntry.sku = entry.sku || originalEntry.sku;
            originalEntry.imagen_principal = entry.imagen_principal || originalEntry.imagen_principal;
            originalEntry.imagen_1 = entry.imagen_1 || originalEntry.imagen_1;
            originalEntry.imagen_2 = entry.imagen_2 || originalEntry.imagen_2;
            originalEntry.updated_at = now;
        } 
    }



    async delete(id: number): Promise<void> {
        const table = db.productos as Productos[];
        db.plazas = table.map(x => {
            if(x.id === id) x.activo = false;
        }) as any; 
    }



    async findById(id: number): Promise<Productos | null> {
        const table = db.productos as Productos[];
        const result = table.find(x => x.id === id);
        if(result) return Object.assign({...result});
        return null;
    }

    
    async findByName(nombre: string): Promise<Productos | null> {
        const table = db.productos as Productos[];
        const result = table.find(x => x.nombre === nombre);
        if(result) return Object.assign({...result});
        return null;
    }


    async getAll(): Promise<Productos[] | null> {
        const table = db.productos as Productos[];
        if(table) return Object.assign({...table});
        return null;
    }

}
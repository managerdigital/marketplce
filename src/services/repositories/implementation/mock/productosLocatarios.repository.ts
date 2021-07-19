import db from '../../../../common/persistence/mock.persistence';
import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { ProductosLocatarios } from '../../domain/productos.domain';

import { ProductosLocatariosRepository } from '../../productosLocatarios.repository';
import { ProductosLocatariosCreateDto } from '../../../../dtos/productos.dto';



export class ProductosLocatariosMockRepository implements ProductosLocatariosRepository {


    async store(entry: ProductosLocatariosCreateDto): Promise<ProductosLocatarios | null> {
        const table = db.productos_locatarios as ProductosLocatarios[];
        const now  = new Date();

        db._productosLocatariosId++;
        table.push({
            id: db._productosId,
            producto_id: entry.producto_id,
            locatario_id: entry.locatario_id,
            stock: entry.stock,
            en_promocion: entry.en_promocion,
            precio: entry.precio,
            precio_rebajado: entry.precio_rebajado,
            descripcion: entry.descripcion,
            sku: entry.sku,
            created_at: now,
            updated_at: now
        } as any);
        
        const result = table.find(x => x.id === db._productosLocatariosId);

        if(result) return Object.assign({...result});
        return null;
        
    }



    async update(id: number, entry: ProductosLocatarios): Promise<void> {
        const table = db.productos_locatarios as ProductosLocatarios[];
        const now  = new Date();

        const originalEntry = table.find(x => x.id === id) as any;
        
        if(originalEntry){
            originalEntry.producto_id = entry.producto_id || originalEntry.producto_id;
            originalEntry.locatario_id = entry.locatario_id || originalEntry.locatario_id;
            originalEntry.stock = entry.stock;
            originalEntry.en_promocion = entry.en_promocion || originalEntry.en_promocion;
            originalEntry.precio = entry.precio || originalEntry.precio;
            originalEntry.precio_rebajado = entry.precio_rebajado || originalEntry.precio_rebajado;
            originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;
            originalEntry.sku = entry.sku || originalEntry.sku;
            originalEntry.updated_at = now;
        } 
    }



    async delete(id: number): Promise<void> {
        const table = db.productos_locatarios as ProductosLocatarios[];
        db.plazas = table.map(x => {
            if(x.id === id) x.activo = false;
        }) as any;  
    }



    async findById(id: number): Promise<ProductosLocatarios | null> {
           const table = db.productos_locatarios as ProductosLocatarios[];
        const result = table.find(x => x.id === id);
        if(!result) return null;
        return result;
    }


    async getAll(): Promise<ProductosLocatarios[] | null> {
        const table = db.productos_locatarios as ProductosLocatarios[];
        if(table) return Object.assign({...table});
        return null;
    }


    async getByLocatarios(locatarioId: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos_locatarios WHERE locatario_id = $1",
            [locatarioId]
        );

        if (response.rows.length) return response.rows as ProductosLocatarios[];
        return null;
    }


    async getByLocatariosPaginado(locatarioId: number, hasta: number, desde: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos_locatarios WHERE locatario_id = $1 LIMIT $2 OFFSET $3",
            [
                locatarioId,
                hasta,
                desde
            ]
        );

        if (response.rows.length) return response.rows as ProductosLocatarios[];
        return null;
    }
    
}
import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { ProductoCreateDto, ProductoUpdateDto } from '../../../../dtos/productos.dto';
import { Productos } from '../../domain/productos.domain';
import { ProductoRepository } from '../../productos.repository';

export class ProductosPGRepository implements ProductoRepository {
    
    async store(entry: ProductoCreateDto): Promise<Productos | null> {
        const now = new Date();
        const res = await pool.query(
            "INSERT INTO productos(nombre, descripcion, unidad, sku, categorias_id, plazas_id, imagen_principal, imagen_1, imagen_2, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)  RETURNING id",
            [
                entry.nombre, 
                entry.descripcion, 
                entry.unidad,
                entry.sku, 
                entry.categorias_id, 
                entry.plazas_id, 
                entry.imagen_principal,
                entry.imagen_1,
                entry.imagen_2,
                now,
                now
            ]
         );

         const producto = await this.findById(res.rows[0].id);
         if(!producto) return null;
         return producto as Productos;
    }




    async update(id: number, entry: ProductoUpdateDto): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE productos SET nombre = $1, descripcion = $2, sku = $3, categorias_id = $4, plazas_id = $5, imagen_principal = $6,  imagen_1 = $7, imagen_2 = $8, unidad = $9, updated_at = $10 WHERE id = $11",
            [ 
                entry.nombre, 
                entry.descripcion, 
                entry.sku, 
                entry.categorias_id, 
                entry.plazas_id, 
                entry.imagen_principal,
                entry.imagen_1,
                entry.imagen_2,
                entry.unidad,
                now, 
                id 
            ]
        ); 
    }




    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE productos SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        );  
    }


    async findById(id: number): Promise<Productos | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos WHERE id = $1 AND activo = true",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Productos;
        return null;
    }


    async findByCategoriaId(id: number): Promise<Productos[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos WHERE $1 = ANY (categorias_id)",
            [id]
        );
        if (response.rows.length) return response.rows as Productos[];
        return null;
    }

    
    async findByName(nombre: string): Promise<Productos | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos WHERE nombre = $1",
            [nombre]
        );
        if (response.rows.length) return response.rows[0] as Productos;
        return null;
    }


    async findByNameAndUnit(name: string, unit: string): Promise<Productos | null> {
         const response: QueryResult = await pool.query(
            "SELECT * FROM productos WHERE nombre = $1 AND unidad = $2",
            [
                name,
                unit
            ]
        );
        if (response.rows.length) return response.rows[0] as Productos;
        return null;
    }
    


    async getAll(): Promise<Productos[] | null> {

        const response: QueryResult = await pool.query("SELECT * FROM productos WHERE activo = true ORDER BY id DESC");

        if (response.rows.length) return response.rows as Productos[];
        return null;
    }

}
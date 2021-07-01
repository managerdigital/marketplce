import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { ProductoCreateDto, ProductoUpdateDto } from '../../../../dtos/productos.dto';
import { Productos } from '../../domain/productos.domain';
import { ProductoRepository } from '../../productos.repository';

export class ProductosPGRepository implements ProductoRepository {
    

    
    async store(entry: ProductoCreateDto): Promise<Productos | null> {
        const now = new Date();

        const res = await pool.query(
            "INSERT INTO productos(nombre, descripcion, sku, categorias_id, plazas_id, imagen_principal, imagen_1, imagen_2, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING id",
            [
                entry.nombre, 
                entry.descripcion, 
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
            "UPDATE productos SET nombre = $1, descripcion = $2, sku = $3, categorias_id = $4, plazas_id = $5, imagen_principal = $6,  imagen_1 = $7, imagen_2 = $8, updated_at = $9 WHERE id = $10",
            [ 
                entry.nombre, 
                entry.descripcion, 
                entry.sku, 
                entry.categorias_id, 
                entry.plazas_id, 
                entry.imagen_principal,
                entry.imagen_1,
                entry.imagen_2,
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
            "SELECT * FROM productos WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Productos;
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


    // async find(id: number, buscarPor = ''): Promise<Productos | null> {
    //     if(!buscarPor){
    //         const response: QueryResult = await pool.query(
    //                         "SELECT * FROM productos WHERE id = $1",
    //                         [id]
    //                     );
    //                     if (response.rows.length){
    //                         return response.rows[0];
    //                     }
    //                     return null;
    //     }

    //     const response: QueryResult = await pool.query(
    //                     "SELECT * FROM productos WHERE nombre = $1",
    //                     [buscarPor]
    //                 );
    //                 if (response.rows.length){
    //                     return response.rows[0];
    //                 }
    //                 return null;
    // }



    async getAll(): Promise<Productos[] | null> {

        const response: QueryResult = await pool.query("select * from productos ORDER BY id DESC");

        if (response.rows.length) return response.rows as Productos[];
        return null;
    }

}
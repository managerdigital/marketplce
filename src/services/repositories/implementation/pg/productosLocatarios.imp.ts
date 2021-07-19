import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { ProductosLocatarios } from '../../domain/productos.domain';

import { ProductosLocatariosRepository } from '../../productosLocatarios.repository';


export class ProductosLocatariosPGRepository implements ProductosLocatariosRepository {


    // async store(entry: ProductosLocatariosStore): Promise<ProductosLocatarios | null> {
        // const now = new Date();

        // const res = await pool.query(
        //      "INSERT INTO productos_locatarios(producto_id, locatario_id, stock, en_promocion, precio, precio_rebajado, descripcion, sku, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING id",
        //      [
        //         entry.producto_id,
        //         entry.locatario_id, 
        //         entry.stock,
        //         entry.en_promocion, 
        //         entry.precio,
        //         entry.precio_rebajado,
        //         entry.descripcion, 
        //         entry.sku, 
        //         now, 
        //         now
        //     ]
        //  );

        // const producto = await this.findById(res.rows[0].id);
        // return producto as ProductosLocatarios;
    // }



    async update(id: number, entry: ProductosLocatarios): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE productos_locatarios SET producto_id = $1, stock = $2, en_promocion = $3, precio = $4, precio_rebajado = $5, descripcion = $6, sku =$7, locatario_id = $8, updated_at = $9 WHERE id = $10",
            [   entry.producto_id, 
                entry.stock,
                entry.en_promocion, 
                entry.precio,
                entry.precio_rebajado,
                entry.descripcion, 
                entry.sku, 
                entry.locatario_id,
                now, 
                id 
            ]
        ); 
    }



    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE productos_locatarios SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        );  
    }



    async findById(id: number): Promise<ProductosLocatarios | null> {
        const response: QueryResult = await pool.query(
                        "SELECT * FROM productos_locatarios WHERE id = $1",
                        [id]
                    );
        if (response.rows.length) return response.rows[0] as ProductosLocatarios;
        return null;
    }




    async getAll(): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM productos_locatarios ORDER BY id DESC");

        if (response.rows.length) return response.rows as ProductosLocatarios[];
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


    async getByCategoriaIdLocatarioId(categoriaId: number, locatarioId: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos_locatarios L, productos P WHERE L.locatario_id = $1 AND $2 = ANY (P.categorias_id)",
            [locatarioId, categoriaId]
        );

        if (response.rows.length) return response.rows as ProductosLocatarios[];
        return null;
    }

    async getByProductoIdYPlazaId( plazaId: number, productoId: number, locatarioId: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM productos_locatarios WHERE plaza_id = $1 AND producto_id = $2 AND locatario_id = $3",
            [plazaId, productoId, locatarioId]
        );

        if (response.rows.length) return response.rows as ProductosLocatarios[];
        return null;
    }

    async getProductosByPlazaYEnPromocion(plazaId: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "select * from productos_locatarios where en_promocion = true AND plaza_id = $1 AND stock = true AND activo = true",
            [plazaId]
        );

        if (response.rows.length) return response.rows as ProductosLocatarios[];
        return null;
    }


    async getProductosByLocatarioYEnPromocion(locatarioId: number): Promise<ProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query(
            "select * from productos_locatarios where locatario_id = $1 AND en_promocion = true AND activo = true AND stock = true",
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
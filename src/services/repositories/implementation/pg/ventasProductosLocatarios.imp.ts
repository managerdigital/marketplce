import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { VentasProductosLocatariosRepository } from '../../ventasProductosLocatarios.repository';

import { VentasProductosLocatarios } from '../../domain/ventasProductoLocatarios.domain';
import { VentasProductosLocatariosCreateDto } from '../../../../dtos/ventasProductosLocatarios.dto';

export class VentasProductosLocatariosPGRepository implements VentasProductosLocatariosRepository {
    
    async store(entry: VentasProductosLocatariosCreateDto): Promise<VentasProductosLocatarios | null> {
        const now = new Date();
        console.log(entry);
        const res = await pool.query(
             "INSERT INTO ventas_productos_locatarios(plaza_id, producto_locatario_id, locatario_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING id",
             [
                entry.plaza_id,
                entry.producto_locatario_id, 
                entry.locatario_id,
                now, 
                now
            ]
         );

        const producto = await this.findById(res.rows[0].id);
        return producto as VentasProductosLocatarios;
    }


    async findById(id: number): Promise<VentasProductosLocatarios | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM ventas_productos_locatarios WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as VentasProductosLocatarios;
        return null;
    }


    async findByPlazaId(plazaiId: number): Promise<VentasProductosLocatarios | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM ventas_productos_locatarios WHERE plaza_id = $1",
            [plazaiId]
        );
        if (response.rows.length) return response.rows[0] as VentasProductosLocatarios;
        return null;
    }


    async findByProductoLocatarioId(productoLocatarioId: number): Promise<VentasProductosLocatarios | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM ventas_productos_locatarios WHERE producto_locatario_id = $1",
            [productoLocatarioId]
        );
        if (response.rows.length) return response.rows[0] as VentasProductosLocatarios;
        return null;
    }


    async getAll(): Promise<VentasProductosLocatarios[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM ventas_productos_locatarios");

        if (response.rows.length) return response.rows as VentasProductosLocatarios[];
        return null;
    }


    async getMasVendidos(): Promise<[] | null> {
        const response: QueryResult = await pool.query("SELECT producto_locatario_id, COUNT(producto_locatario_id) FROM ventas_productos_locatarios GROUP BY producto_locatario_id ORDER BY COUNT(producto_locatario_id) DESC");

        if (response.rows.length) return response.rows as [];
        return null;
    }
    

}
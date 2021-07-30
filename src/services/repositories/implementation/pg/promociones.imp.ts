import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { PromocionesRepository } from '../../promociones.repository';

import { Promociones } from '../../domain/promociones.domain';
import { PromocionesCreateDto } from '../../../../dtos/promociones.dto';


export class PromocionesPGRepository implements PromocionesRepository {

    async store(entry: PromocionesCreateDto): Promise<Promociones | null> {
        const now = new Date();
  
        const res = await pool.query(
             "INSERT INTO promociones(producto_id, plazas_id, categorias_id, imagen, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
             [
                entry.producto_id,
                entry.plazas_id, 
                entry.categorias_id,
                entry.imagen,
                now, 
                now
            ]
         );

        const producto = await this.findById(res.rows[0].id);
        return producto as Promociones;
    }
    
    
    // TODO: ACTUALIZAR EL ACTIVO
    async update(id: number, entry: Promociones): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE promociones SET producto_id = $1, plazas_id = $2, categorias_id = $3, imagen = $4, updated_at = $5 WHERE id = $6",
            [   entry.producto_id, 
                entry.plazas_id,
                entry.categorias_id, 
                entry.imagen,
                now, 
                entry.id 
            ]
        ); 
    }
    
    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE promociones SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        ); 
    }
    
    async findById(id: number): Promise<Promociones | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM promociones WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Promociones;
        return null;
    }
    
    async getAll(): Promise<Promociones[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM promociones");

        if (response.rows.length) return response.rows as Promociones[];
        return null;
    }

}
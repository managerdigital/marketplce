import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { VentasCategoriaCreateDto } from '../../../../dtos/ventasCategorias.dto';
import { VentasCategoriasRepository } from '../../ventasCategorias.repository';



export class VentasCategoriasPGRepository implements VentasCategoriasRepository {
    
    async store(entry: VentasCategoriaCreateDto): Promise<void> {
        const now = new Date();
        
        await pool.query(
             "INSERT INTO ventas_categorias(plaza_id, categoria_id, locatario_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING id",
             [
                entry.plaza_id,
                entry.categoria_id, 
                entry.locatario_id,
                now, 
                now
            ]
         );
    }

    async findByLocatario(id: number): Promise<{cantidad: number, categoria_id: number}[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT COUNT(*) AS cantidad, categoria_id FROM ventas_categorias WHERE locatario_id = $1 GROUP BY categoria_id",
            [id]
        );
        if (response.rows.length) return response.rows;
        return null;
    }

    async findByPlazas(id: number): Promise<{cantidad: number, categoria_id: number}[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT COUNT(categoria_id) AS cantidad, categoria_id FROM ventas_categorias WHERE plaza_id = $1 GROUP BY categoria_id",
            [id]
        );
        if (response.rows.length) return response.rows;
        return null;
    }
}
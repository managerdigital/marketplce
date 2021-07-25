import { pool } from '../../../../common/persistence/pg.persistence';

import { Favorito } from '../../domain/favoritos.domain';
import { FavoritoRepository } from '../../favoritos.repository';
import { FavoritoCreateDto } from '../../../../dtos/favorito.dto';
import { QueryResult } from 'pg';

export class FavoritosPGRepository implements FavoritoRepository {
 
    async store(entry: FavoritoCreateDto): Promise<void> {
        const now = new Date();

        await pool.query(
             "INSERT INTO favoritos(cliente_id, producto_locatario_id, producto_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING id",
             [
                entry.cliente_id, 
                entry.producto_locatario_id,
                entry.producto_id,
                now, 
                now
            ]
         );
    }


    async delete(id: number): Promise<void> {
        await pool.query(
            "DELETE FROM favoritos WHERE id = $1",
            [ id ]
        );
    }
    
    
    async getByCliente(clienteId: number): Promise<Favorito[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM favoritos WHERE cliente_id = $1",
            [clienteId]
        );
        if (!response.rows.length) return null;
        return response.rows as Favorito[];
    }
}
import { VisitasLocatarios } from '../../domain/visitasLocatarios.domain';
import { VisitasLocatariosRepository } from '../../visitasLocatarios.repository';
import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

export class VisitasLocatariosPGRepository implements VisitasLocatariosRepository {
    
    async store(entry: VisitasLocatarios): Promise<void> {
        const now = new Date();
        await pool.query(
             "INSERT INTO visitas_locatarios(locatario_id, plaza_id, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING id",
             [
                entry.locatario_id,
                entry.plaza_id, 
                now, 
                now
            ]
         );
    }

    async masVisitadosByPlazaId(PlazaId: number): Promise<{cantidad: number, locatario_id: number}[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT COUNT(locatario_id) AS cantidad, locatario_id FROM visitas_locatarios WHERE plaza_id = $1 GROUP BY locatario_id",
            [PlazaId]
        );
        if (response.rows.length) return response.rows;
        return null;
    }

}
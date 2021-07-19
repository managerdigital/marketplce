import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { Balance } from '../../domain/balance.domain';

import { BalanceRepository } from '../../balance.repository';
import { BalanceCreateDto, BalanceUpdateDto } from '../../../../dtos/balance.dto';


export class BalancePGRepository implements BalanceRepository{


    async store(entry: BalanceCreateDto): Promise<Balance | null> {
        const now = new Date();

        const res = await pool.query(
             "INSERT INTO balances(total, plaza_id, locatorio_id, cliente_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
             [
                entry.total, 
                entry.plaza_id,
                entry.locatorio_id, 
                entry.cliente_id, 
                now, 
                now
            ]
        );

        const balance = await this.findById(res.rows[0].id);
        return balance as Balance;
    }

    
    async update(entry: BalanceUpdateDto, id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE balances SET total = $1, plaza_id = $2, locatorio_id = $3, cliente_id = $4, estado = $5, updated_at = $6 WHERE id = $7",
            [    
                entry.total, 
                entry.plaza_id,
                entry.locatorio_id, 
                entry.cliente_id, 
                entry.estado,
                now,  
                id 
            ]
        ); 
    }


    async findById(id: number): Promise<Balance | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM balances WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Balance;
        return null;
    }


    async findByPlazaId(plazaId: number): Promise<Balance | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM balances WHERE plaza_id = $1",
            [plazaId]
        );
        if (response.rows.length) return response.rows[0] as Balance;
        return null;
    }


    async findByLocatarioId(locatarioId: number): Promise<Balance | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM balances WHERE locatorio_id = $1",
            [locatarioId]
        );
        if (response.rows.length) return response.rows[0] as Balance;
        return null;
    }


    async findByClienteId(clienteId: number): Promise<Balance | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM balances WHERE cliente_id = $1",
            [clienteId]
        );
        if (response.rows.length) return response.rows[0] as Balance;
        return null;
    }


    async getAll(): Promise<Balance[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM balances ORDER BY id DESC");

        if (response.rows.length) return response.rows as Balance[];
        return null;
    }


    async getGananciasPorLocatarioID(locatarioID: number): Promise<{sum: number} | null> {
        const response: QueryResult = await pool.query(
            "SELECT SUM(total) FROM balances GROUP BY locatorio_id = $1",
            [locatarioID]
            );

        if (response.rows.length) return response.rows[0];
        return null;
    }


    async getGananciasTotales(): Promise<{sum: number} | null> {
        const response: QueryResult = await pool.query(
            "SELECT SUM(total) FROM balances");

        if (response.rows.length) return response.rows[0];
        return null;
    }

   
}
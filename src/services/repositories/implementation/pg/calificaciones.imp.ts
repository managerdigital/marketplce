import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { CalificacionCreateDto } from '../../../../dtos/calificaciones.dto';

import { CalificacionesRepository } from '../../calificaciones.repository';

import { Calificacion } from '../../domain/calificaciones.domain';


export class CalificacionPGRepository implements CalificacionesRepository{


    async store(entry: CalificacionCreateDto): Promise<Calificacion | null> {
        const now = new Date();

        const res = await pool.query(
             "INSERT INTO calificaciones(cliente_id, pedido_id, plaza_id, locatorio_id, comentarios, calificacion, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
             [
                entry.cliente_id, 
                entry.pedido_id,
                entry.plaza_id, 
                entry.locatorio_id,
                entry.comentarios,
                entry.calificaciones, 
                now, 
                now
            ]
        );

        const calificacion = await this.findById(res.rows[0].id);
        return calificacion as Calificacion;
    }



    async update(id: number, entry: Calificacion): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE calificaciones SET cliente_id = $1, pedido_id = $2, plaza_id = $3, locatorio_id = $4, comentarios = $5, calificacion = $6, updated_at = $7 WHERE id = $8",
            [    
                entry.cliente_id, 
                entry.pedido_id,
                entry.plaza_id, 
                entry.locatorio_id, 
                entry.comentarios,
                entry.calificaciones,
                now,  
                id 
            ]
        ); 
    }


    async findById(id: number): Promise<Calificacion | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM calificaciones WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Calificacion;
        return null;
    }


    async findByClienteId(clienteId: number): Promise<Calificacion | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM calificaciones WHERE cliente_id = $1",
            [clienteId]
        );
        if (response.rows.length) return response.rows[0] as Calificacion;
        return null;
    }


    async findByPedidoId(pedidoId: number): Promise<Calificacion | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM calificaciones WHERE pedido_id = $1",
            [pedidoId]
        );
        if (response.rows.length) return response.rows[0] as Calificacion;
        return null;
    }


    async findByPlazaId(plazaId: number): Promise<Calificacion | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM calificaciones WHERE plaza_id = $1",
            [plazaId]
        );
        if (response.rows.length) return response.rows[0] as Calificacion;
        return null;
    }


    async findByLocatarioId(locatarioId: number): Promise<Calificacion | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM calificaciones WHERE locatorio_id = $1",
            [locatarioId]
        );
        if (response.rows.length) return response.rows[0] as Calificacion;
        return null;
    }

    
    async getAll(): Promise<Calificacion[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM calificaciones ORDER BY id DESC");

        if (response.rows.length) return response.rows as Calificacion[];
        return null;
    }

}
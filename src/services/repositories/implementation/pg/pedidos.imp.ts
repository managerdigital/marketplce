import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { PedidoCreateDto, PedidoUpdateDto } from '../../../../dtos/pedidos.dtos';
import { Pedido } from '../../domain/pedidos.domain';

import { PedidoRepository } from '../../pedidos.repository';

export class PedidoPGRepository implements PedidoRepository {

    
    async store(entry: PedidoCreateDto): Promise<Pedido | null> {
        const now = new Date();

        const res = await pool.query(
            "INSERT INTO pedidos(pasarela_pagos_id, plaza_id, locatorios_id, cliente_id, productos_locatarios_id, estado, total, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
            [
                entry.pasarela_pagos_id, 
                entry.plaza_id, 
                entry.locatorios_id, 
                entry.cliente_id, 
                entry.productos_locatarios_id, 
                entry.estado, 
                entry.total, 
                now, 
                now
            ]
         );
 
         const pedido = await this.findById(res.rows[0].id);
         if(!pedido) return null;
         return pedido as Pedido;
    }


    async update(id: number, entry: PedidoUpdateDto): Promise<Pedido | null> {
        const now = new Date();

        await pool.query(
            "UPDATE pedidos SET plaza_id = $1, locatorios_id = $2, cliente_id = $3, productos_locatarios_id = $4, estado = $5, total = $6, updated_at = $7 WHERE id = $8",
            [ 
                entry.plaza_id, 
                entry.locatorios_id, 
                entry.cliente_id, 
                entry.productos_locatarios_id, 
                entry.estado, 
                entry.total, 
                now, 
                id 
            ]
        ); 

        const pedido = await this.findById(id);
        if(!pedido) return null;
        return pedido as Pedido;
    }


    async pagadoYEntregado(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE pedidos SET pagado = $1, estado = $2, updated_at = $3 WHERE id = $4",
            [ 
                true,
                2,
                now,
                id
            ]
        ); 
    }


    async getAll(): Promise<Pedido[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM pedidos ORDER BY id DESC");

        if (response.rows.length) return response.rows as Pedido[];
        return null;
    }


    async findById(id: number): Promise<Pedido | null> {

        const response: QueryResult = await pool.query(
            "SELECT * FROM pedidos WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Pedido;
        return null;
    }


    async pedidosPorLocatario(locatarioId: number): Promise<Pedido[] | null>  {
        const response: QueryResult = await pool.query(
            "SELECT * FROM pedidos WHERE locatorios_id = $1 ORDER BY id DESC",
            [locatarioId]
        );
        if (response.rows.length) return response.rows as Pedido[];
        return null;
    }


    async cantidadDePedidosPorClienteID(clienteId: number): Promise<number | null>  {
        const response: QueryResult = await pool.query(
            "SELECT COUNT(cliente_id) FROM pedidos WHERE cliente_id = $1 GROUP BY cliente_id ",
            [clienteId]
        );
        if (response.rows.length) return response.rows[0];
        return null;
    }


    async getPedidosPorCliente(clienteId: number): Promise<Pedido[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM pedidos WHERE cliente_id = $1 AND estado != '3' ORDER BY id DESC LIMIT 5",
            [clienteId]
        );
        if (response.rows.length) return response.rows;
        return null;
    }
}
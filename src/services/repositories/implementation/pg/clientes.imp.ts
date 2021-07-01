import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { ClienteCreateDto, ClienteUpdatedDto } from '../../../../dtos/clientes.dto';
import { ClienteRepository } from '../../clientes.repository';
import { Cliente } from '../../domain/clientes.domain';


export class ClientePGRepository implements ClienteRepository{

    async store(entry: ClienteCreateDto): Promise<Cliente | null> {
        
        const now = new Date();

        const res = await pool.query(
             "INSERT INTO clientes(email, password, nombre, telefono, direccion, cedula, img, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id",
             [
                entry.email, 
                entry.password, 
                entry.nombre, 
                entry.telefono, 
                entry.direccion, 
                entry.cedula,
                entry.img, 
                now, 
                now
            ]
         );

         const cliente = await this.findById(res.rows[0].id);
         if(!cliente) return null;
         return cliente as Cliente;
    }


    async update(id: number, entry: ClienteUpdatedDto): Promise<Cliente | null> {
        const now = new Date();

        await pool.query(
            "UPDATE clientes SET email = $1, nombre = $2, telefono = $3, direccion = $4, cedula = $5, img = $6, updated_at = $7 WHERE id = $8",
            [ 
                entry.email, 
                entry.nombre, 
                entry.telefono, 
                entry.direccion,
                entry.cedula,
                entry.img, 
                now, 
                id 
            ]
        ); 

        
        const cliente = await this.findById(id);
        if(!cliente) return null;
        return cliente as Cliente;
    }

    
    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE clientes SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        ); 
    }


    async getAll(): Promise<Cliente[] | null> {
        const response: QueryResult = await pool.query("select * from clientes ORDER BY id DESC");

        if (response.rows.length) return response.rows;
        return null;
    }


    // async find(id: number, buscapor='', busca=''): Promise<Cliente | null> {
        
    //     if(!buscapor && !busca){
    //         const response: QueryResult = await pool.query(
    //                             "SELECT * FROM clientes WHERE id = $1",
    //                             [id]
    //                         );
    //         if (response.rows.length) return response.rows[0];
    //         return null;
    //     }
    //     const response: QueryResult = await pool.query(
    //         "SELECT * FROM clientes WHERE email = $1",
    //         [busca]
    //     );
    //     if (response.rows.length){
    //         return response.rows[0];
    //     }
    //     return null;
    // }

    async findById(id: number): Promise<Cliente | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM clientes WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Cliente;
        return null;
    }


    async findByEmail(email: string): Promise<Cliente | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM clientes WHERE email = $1",
            [email]
        );
        if (response.rows.length) return response.rows[0] as Cliente;
        return null;
    }

}
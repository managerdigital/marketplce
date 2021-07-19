import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { Localidad } from '../../domain/localidades.domain';
import { LocalidadRepository } from '../../localidades.repository';


export class LocalidadPGRepository implements LocalidadRepository {


    async store(nombre: string): Promise<void> {
        const now = new Date();

        await pool.query(
            "INSERT INTO localidades(nombre, created_at, updated_at) VALUES($1, $2, $3)",
            [nombre, now, now]
        );
    }
    
    
    async getAll(): Promise<Localidad[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM localidades",
          );
        if (response.rows.length){
            return response.rows;
        }
        return null;
    }


    async findById(id: number): Promise<Localidad | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM localidades WHERE id = $1",
            [id]
        );

        if (response.rows.length) return response.rows[0] as Localidad;
        
        return null;
    }

    async findByName(nombre: string): Promise<Localidad | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM localidades WHERE nombre = $1",
            [nombre]
        );

        if (response.rows.length) return response.rows[0] as Localidad;
        
        return null;
    }

    // async find(id = 0, nombre = ''): Promise<Localidad | null> {
    //     if(id > 0){
    //         const response: QueryResult = await pool.query(
    //             "SELECT * FROM localidades WHERE id = $1",
    //             [id]
    //         );

    //         if (response.rows.length){
    //             return response.rows[0];
    //         }
    //         return null;
    //     }

    //     const response: QueryResult = await pool.query(
    //         "SELECT * FROM localidades WHERE nombre = $1",
    //         [nombre]
    //       );
    //     if (response.rows.length){
    //         return response.rows[0];
    //     }
    //     return null;
    // }



    async update(entry: Localidad): Promise<void> {
        throw new Error('Method not implemented.');
    }

}
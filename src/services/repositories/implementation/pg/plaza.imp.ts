/* eslint-disable no-case-declarations */
import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { PlazaCreateDto, PlazaUpdateDto } from '../../../../dtos/plazas.dto';
import { Plaza } from '../../domain/plazas.domain';
import { PlazaRepository } from '../../plazas.repository';


export class PlazaPGRepository implements PlazaRepository{

    
    async store(entry: PlazaCreateDto): Promise<Plaza | null> {
        const now = new Date();
        // '{"6am - 12pm", "2pm - 6pm"}', '{"Artesanías", "Hierbas"}' '{4385964, 2342345}'
      
        // const horariosDB = this.horariosDB(entry.horarios);
        // const telefonosDB = this.telefonosDB(entry.telefonos);

        const res = await pool.query(
            "INSERT INTO plazas(admin_id, localidad_id, categorias_id, nombre, direccion, telefonos, email, horarios, img, logo, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
            [
                entry.admin_id,
                entry.localidad_id,
                entry.categorias_id,
                entry.nombre,
                entry.direccion,
                entry.telefonos,
                entry.email,
                entry.horarios,
                entry.img,
                entry.logo,
                now,
                now
            ]
        );

        const plaza = await this.findById(res.rows[0].id);
        if(!plaza) return null;
        return plaza;    
        // if (response.rows.length){
        //     console.log(response.rows);
        //     return response.rows[0] as Plaza;
        // }
        // return null;
    }



    async update(id: number, entry: PlazaUpdateDto): Promise<void> {

        const now = new Date();

        // const horariosDB = this.horariosDB(entry.horarios);
        
        // Note: Verifico que si no viene el estado lo ponga en true y si viene ponga lo que venga
        let activo = true;
        if(entry.activo === false) {
            activo = entry.activo;
        }

        await pool.query(
            "UPDATE plazas SET admin_id = $1, localidad_id = $2, categorias_id = $3, nombre = $4, direccion = $5, img = $6, logo = $7, telefonos = $8, email = $9, horarios = $10, activo = $11, updated_at = $12 WHERE id = $13",
            [ 
                entry.admin_id,
                entry.localidad_id,
                entry.categorias_id,
                entry.nombre,
                entry.direccion,
                entry.img,
                entry.logo,
                entry.telefonos,
                entry.email,
                entry.horarios,
                activo,
                now,
                id
            ]
        );  
    }



    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE plazas SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        );  
    }




    async getAll(): Promise<Plaza[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE activo = true ORDER BY id DESC",
          );
        if (response.rows.length){
            return response.rows as Plaza[];
        }
        return null;
    }

    
    public async findByName(nombre: string): Promise<Plaza | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE nombre = $1",
            [nombre]
        );
        if (response.rows.length) return response.rows[0] as Plaza;
        return null;
    }


    public async findByEmail(email: string): Promise<Plaza | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE email = $1",
            [email]
        );
        if (response.rows.length) return response.rows[0] as Plaza;
        return null;
    }


    public async findByLocalidad(localidad_id: number): Promise<Plaza | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE localidad_id = $1",
            [localidad_id]
        );
        if (response.rows.length) return response.rows[0] as Plaza;
        return null;
    }


    async findById(id: number): Promise<Plaza | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE id = $1 AND activo = true",
            [id]
        );

        console.log(response.rows);

        if (response.rows.length) return response.rows[0] as Plaza;
        return null;
    }
    
 

}
/* eslint-disable no-case-declarations */
import { pool } from '../../../../common/persistence/pg.persistence';
import { QueryResult } from 'pg';

import { PlazaCreateDto, PlazaUpdateDto } from '../../../../dtos/plazas.dto';
import { Plaza } from '../../domain/plazas.domain';
import { PlazaRepository } from '../../plazas.repository';


export class PlazaPGRepository implements PlazaRepository{

    
    private horariosDB(horariosLlega: any): string{
 
        let horarios = '';
        let c = 1;
        for(const x in horariosLlega){
            if(c < horariosLlega.length) {
                horarios += '"' + horariosLlega[x] + '", ';
            } else {
                horarios += '"' + horariosLlega[x] + '" ';
            }
            c += 1;
        }

        const horariosDB = "{" + horarios + "}";
        return horariosDB;
    }

    
    private categoriasDB(categoriasLlega: any): string{
        let categorias = '';
        let contador = 1;
        for(const x in categoriasLlega){
            if(contador < categoriasLlega.length) {
                categorias += '"' + categoriasLlega[x] + '", ';
            } else {
                categorias += '"' + categoriasLlega[x] + '" ';
            }
            contador += 1;
        }

        const categoriasDB = "{" + categorias + "}";
        // console.log(categoriasDB);
        return categoriasDB;
    }
    
    
    private telefonosDB(telefonosLllega: any): string{
        let telefonos = '';
        let con = 1;
        for(const x in telefonosLllega){
            if(con < telefonosLllega.length) {
                telefonos += telefonosLllega[x] + ', ';
            } else {
                telefonos += telefonosLllega[x];
            }
            con += 1;
        }

        const telefonosDB = "{" + telefonos + "}";
        return telefonosDB;
    }

    
    async store(entry: PlazaCreateDto): Promise<Plaza | null> {
        const now = new Date();
        // '{"6am - 12pm", "2pm - 6pm"}', '{"Artesanías", "Hierbas"}' '{4385964, 2342345}'
        // const existePlaza: QueryResult = await pool.query(
        //     "SELECT * FROM plazas where nombre = $1", 
        //     [entry.nombre]
        //     );
        // if(existePlaza.rows.length){
        //     return null;
        // }
      
        const horariosDB = this.horariosDB(entry.horarios);
        const telefonosDB = this.telefonosDB(entry.telefonos);

        const res = await pool.query(
            "INSERT INTO plazas(admin_id, localidad_id, categorias_id, nombre, direccion, telefonos, email, horarios, img, logo, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
            [
                entry.admin_id,
                entry.localidad_id,
                entry.categorias_id,
                entry.nombre,
                entry.direccion,
                telefonosDB,
                entry.email,
                horariosDB,
                entry.img,
                entry.logo,
                now,
                now
            ]
        );

        // const response: QueryResult = await pool.query(
        //     "SELECT * FROM plazas WHERE id = $1",
        //     [res.rows[0].id]
        //     );

        const plaza = await this.findById(res.rows[0].id);
        if(!plaza) return null;
        return plaza;    
        // if (response.rows.length){
        //     // TODO: ACA ME IMPRIME LAS PLAZAS AL CREAR
        //     console.log(response.rows);
        //     return response.rows[0] as Plaza;
        // }
        // return null;
    }



    async update(id: number, entry: PlazaUpdateDto): Promise<void> {

        const now = new Date();

        // const categoriasDB = this.categoriasDB(entry.categorias_id);
        const horariosDB = this.horariosDB(entry.horarios);
        const telefonosDB = this.telefonosDB(entry.telefonos);
        
        // Verifico que si no viene el estado lo ponga en true y si viene ponga lo que venga
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
                telefonosDB,
                entry.email,
                horariosDB,
                activo,
                now,
                id
            ]
        );  
    }

    async updateCategoria(id: number, categorias: [] ): Promise<void> {
        const now = new Date();
        const categoriasDB = this.categoriasDB(categorias);

        await pool.query(
            "UPDATE plazas SET categorias_nombres = $1, updated_at = $2 WHERE id = $3",
            [ 
                categoriasDB,
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
            "SELECT * FROM plazas ORDER BY id DESC",
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


    async findById(id: number): Promise<Plaza | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM plazas WHERE id = $1",
            [id]
        );

        // TODO: ACA ME IMPRIME LAS PLAZAS AL CREAR
        console.log(response.rows);

        if (response.rows.length) return response.rows[0] as Plaza;
        return null;
    }
    
 

}
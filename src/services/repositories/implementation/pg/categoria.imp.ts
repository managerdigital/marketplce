import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { CategoriaCreateDto } from '../../../../dtos/categorias.dto';
import { Categoria } from '../../domain/categoria.domain';

import { CategoriaRepository } from '../../categorias.repository';



export class CategoriaPGRepository implements CategoriaRepository{


    async store(entry: CategoriaCreateDto): Promise<Categoria | null> {
        const now = new Date();

       const res = await pool.query(
            "INSERT INTO categorias(nombre, slug, descripcion, icono, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)  RETURNING id",
            [
                entry.nombre,
                entry.slug, 
                entry.descripcion, 
                entry.icono,
                now, 
                now
            ]
        );

        const categoria = await this.findById(res.rows[0].id);
        if(categoria) return categoria;
        return null;
    }
   

    
    async update(entry: Categoria): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE categorias SET nombre = $1, slug = $2, descripcion = $3, icono = $4, activo = $5, updated_at = $6 WHERE id = $7",
            [ 
                entry.nombre, 
                entry.slug, 
                entry.descripcion,
                entry.icono, 
                true, 
                now, 
                entry.id 
            ]
        ); 
    }



   async getAllCategorias(): Promise<Categoria[] | null> {
        const response: QueryResult = await pool.query("SELECT * FROM categorias WHERE activo = true ORDER BY id DESC");
        if (!response.rows.length) return null;
        return response.rows;
   }


   async getAllLimit5(): Promise<Categoria[] | null> {
    const response: QueryResult = await pool.query("SELECT * FROM categorias WHERE activo = true ORDER BY id DESC LIMIT 5");
    if (!response.rows.length) return null;
    return response.rows;
}


   async findById(id: number): Promise<Categoria | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM categorias WHERE id = $1 AND activo = true",
            [id]
        );
        if (response.rows.length) return response.rows[0] as Categoria;
        return null;
   }


   async findByName(nombre: string): Promise<Categoria | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM categorias WHERE nombre = $1",
            [nombre]
        );
        if (response.rows.length) return response.rows[0] as Categoria;
        return null;
   }

    
    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE categorias SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        );  
    }



}
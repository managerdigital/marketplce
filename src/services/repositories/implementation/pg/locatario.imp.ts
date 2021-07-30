import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';




import { Locatario } from '../../domain/locatario.domain';
import { LocatarioRepository } from '../../locatario.repository';
import { LocatarioCreateDto, LocatarioUpdateDto } from '../../../../dtos/locatario.dto';


export class LocatarioPGRepository implements LocatarioRepository {

    // private horariosDB(horariosLlega: any): string{
 
    //     let horarios = '';
    //     let c = 1;
    //     for(const x in horariosLlega){
    //         if(c < horariosLlega.length) {
    //             horarios += '"' + horariosLlega[x] + '", ';
    //         } else {
    //             horarios += '"' + horariosLlega[x] + '" ';
    //         }
    //         c += 1;
    //     }

    //     const horariosDB = "{" + horarios + "}";
    //     return horariosDB;
    // }

    async store(entry: LocatarioCreateDto): Promise<Locatario | null> {

        const now = new Date();
        // '{"6am - 12pm", "2pm - 6pm"}', '{"Artesanías", "Hierbas"}' '{4385964, 2342345}'
        // INSERT INTO locatarios(admin_id, plaza_id, categorias, nombre, horarios) VALUES(1, 2, '{"Ropa", "Mascotas"}', 'Locatario Nombre', '{"6am - 12pm", "2pm - 6pm"}');
        // const categoriasDB = this.categoriasDB(entry.categorias);
        // const horariosDB = this.horariosDB(entry.horarios);

        const res = await pool.query(
            "INSERT INTO locatarios(admin_id, plaza_id, categorias_id, numero_local, productos_locatarios_id, nombre_local, nombre, apellido, cedula, email, img, logo, telefonos, horarios, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)  RETURNING id",
            [
                entry.admin_id,
                entry.plaza_id,
                entry.categorias_id,
                entry.numero_local,
                entry.productos_locatarios_id,
                entry.nombre_local,
                entry.nombre,
                entry.apellido,
                entry.cedula,
                entry.email,
                entry.img,
                entry.logo,
                entry.telefonos,
                entry.horarios,
                now,
                now
            ]
        );

        const locatario = await this.findById(res.rows[0].id);
        if(!locatario) return null;
        return locatario;
    }





    async update(id: number, entry: LocatarioUpdateDto): Promise<void> {
        const now = new Date();

        // const categoriasDB = this.categoriasDB(entry.categorias);
        // const horariosDB = this.horariosDB(entry.horarios);
        // console.log(entry.activo);
        // const activo = !entry.activo ? entry.activo: true;
        let activo = true;
        if(entry.activo === false) {
            activo = entry.activo;
        }
        // console.log(activo); 

        await pool.query(
            "UPDATE locatarios SET admin_id = $1, plaza_id = $2, categorias_id = $3, productos_locatarios_id = $4, nombre_local = $5, numero_local = $6, nombre = $7, apellido = $8, cedula = $9, email = $10, img = $11, logo = $12, telefonos = $13, horarios = $14, activo = $15, updated_at = $16 WHERE id = $17",
            [ 
                entry.admin_id,
                entry.plaza_id,
                entry.categorias_id,
                entry.productos_locatarios_id,
                entry.nombre_local,
                entry.numero_local,
                entry.nombre,
                entry.apellido,
                entry.cedula,
                entry.email,
                entry.img,
                entry.logo,
                entry.telefonos,
                entry.horarios,
                activo,
                now,
                id
            ]
        ); 
    }


    async findById(id: number): Promise<Locatario | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE id = $1",
            [id]
            );
            if (response.rows.length) return response.rows[0] as Locatario;
            return null;
    }


    async findByEmail(email:string): Promise<Locatario | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE email = $1",
            [email]
            );
            if (response.rows.length) return response.rows[0] as Locatario;
            return null;
    }


    async findByCedula(cedula: number): Promise<Locatario[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE cedula = $1",
            [cedula]
            );
            if (response.rows.length) return response.rows as Locatario[];
            return null;
    }


    // SELECT * FROM locatarios WHERE '(408)-783-5731' = ANY (numero_local);
    async findPorNumeroLocalPlazaId(noLocal: number, plazaId: number): Promise<Locatario | null> {
       
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE $1 = ANY (numero_local) AND plaza_id = $2",
            [
                noLocal,
                plazaId
            ]
            );
        if (response.rows.length) return response.rows[0] as Locatario; 
        return null;
    }



    async getAll(offset: number): Promise<Locatario[]| null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios ORDER BY id DESC "
            );
        // const response: QueryResult = await pool.query(
        //     "SELECT * FROM locatarios ORDER BY id DESC LIMIT 10 OFFSET $1", [offset]
        //     );
           
        if (response.rows.length) return response.rows;
        return null;
    }


    async totalLocatarios(): Promise<number>{
        const totalLocatarios: QueryResult = await pool.query(
            "SELECT COUNT(id) FROM locatarios"
            );
        if (totalLocatarios.rows.length) return totalLocatarios.rows[0].count as number;
        return 0;
    }


    async delete(id: number): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE locatarios SET activo = $1, updated_at = $2 WHERE id = $3",
            [ 
                false,
                now,
                id
            ]
        );  
    }
        

    public async getLocatariosPorPlazaYCategoria(plazaId: number, categoriaId: number): Promise<Locatario[] | null>{
        
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE plaza_id = $1 AND $2 = ANY (categorias_id) ORDER BY updated_at DESC;", 
            [
            plazaId,
            categoriaId
            ]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }

    // TODO: Buscador
    public async buscadorPorPlazaIdYCategoriaId(plazaId: number, categoriaId: number, texto: string): Promise<Locatario[] | null>{
        
        const response: QueryResult = await pool.query(
            'SELECT * FROM locatarios WHERE plaza_id = $1 AND $2 = ANY (categorias_id) AND (nombre LIKE UPPER("%$3%") OR nombre_local LIKE UPPER("%$4%")) ORDER BY updated_at DESC', 
            [
                plazaId,
                categoriaId,
                texto,
                texto
            ]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }

    
    public async getLocatariosPorPlaza(plaza_id: number): Promise<Locatario[] | null>{
        
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE plaza_id = $1 ORDER BY updated_at DESC;", 
                [plaza_id]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }


    public async getquinceLocatariosPorPlaza(plaza_id: number): Promise<Locatario[] | null>{
        
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE plaza_id = $1 ORDER BY updated_at DESC LIMIT 15;", 
                [plaza_id]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }


    async getLocatariosPorPlazaPaginado(plazaId: number, locatarioId: number, limite: number): Promise<Locatario[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE plaza_id = $1 AND id > $2 ORDER BY id LIMIT $3 ",
            [
                plazaId,
                locatarioId,
                limite
            ]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }


    async getLocatariosPorPlazaPaginadoHelper(plazaId: number, limite: number): Promise<Locatario[] | null> {
        const response: QueryResult = await pool.query(
            "SELECT * FROM locatarios WHERE plaza_id = $1 ORDER BY id LIMIT $2 ",
            [
                plazaId,
                limite
            ]
        );

        if (response.rows.length) return response.rows as Locatario[];
        return null;
    }

    
    public async getTotalLocatariosDePlaza(): Promise<[] | null> {

        // const response: QueryResult = await pool.query(
        //     "SELECT COUNT(plaza_id), plaza_id FROM locatarios WHERE plaza_id = $1 GROUP BY plaza_id",
        //     [id]
        //     );
        const response: QueryResult = await pool.query(
            "SELECT plaza_id, COUNT(plaza_id) AS total FROM locatarios GROUP BY plaza_id");
        
        if (response.rows.length) return response.rows as [];
        return null;
    }

}


import { QueryResult } from 'pg';
import { pool } from '../../../../common/persistence/pg.persistence';

import { Admin } from "../../domain/admin.domain";

import { AdminCreateDto } from '../../../../dtos/admin.dto';

import { AdminRepository } from '../../admins.repository';


export class AdminPGRepository implements AdminRepository {

    async remove(id: number): Promise<void> {
        await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
    }


    async getAll(): Promise<Admin[] | null> {
        const response = await pool.query("SELECT * FROM admins ORDER BY id DESC");
        if (response.rows.length){
            return response.rows;
        }
        return null;
    }

    
    public async store(entry: AdminCreateDto): Promise<Admin | null> {
        const now = new Date();
        // console.log('ENTRO');
        const res = await pool.query(
                "INSERT INTO admins(nombre, apellido, telefono, cedula, email, password, rol, img, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
            [
                entry.nombre,
                entry.apellido,
                entry.telefono,
                entry.cedula,
                entry.email,
                entry.password,
                entry.rol,
                entry.img, 
                now,
                now
            ]
        );

        const admin = await this.findById(res.rows[0].id);
        if(!admin) return null;
        return admin;
    }


    public async findByEmail(email: string): Promise<Admin | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
            );
            if (response.rows.length) return response.rows[0];
            return null;
    }


    public async findById(id: number): Promise<Admin | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM admins WHERE id = $1",
            [id]
        );
        if (response.rows.length) return response.rows[0];
        return null;
    }

    public async findByCedula(cedula: number): Promise<Admin | null>{
        const response: QueryResult = await pool.query(
            "SELECT * FROM admins WHERE cedula = $1",
            [cedula]
        );
        if (response.rows.length) return response.rows[0];
        return null;
    }


    // public async find(id: number, email = ''): Promise<Admin | null>{
    //     if (email) {
    //         const response: QueryResult = await pool.query(
    //             "SELECT * FROM admins WHERE email = $1",
    //             [email]
    //             );
    //             if (response.rows.length){
    //                 return response.rows[0];
    //             }
    //             return null;
    //         } else {
    //         const response: QueryResult = await pool.query(
    //             'SELECT * FROM admins where id = $1',
    //             [id]
    //             );
    //             if (response.rows.length){
    //                 return response.rows[0];
    //             }
    //             return null;
    //     }
    // }


    public async changePassword(entry: Admin): Promise<void> {
        const now = new Date();

        await pool.query(
            "UPDATE admins SET password = $1, updated_at = $2 WHERE id = $3",
            [ 
                entry.password, 
                now, 
                entry.id 
            ]
        ); 
    }


    public async update(entry: Admin): Promise<void> {
        const now = new Date();
    
        await pool.query(
            "UPDATE admins SET nombre = $1, apellido = $2, telefono = $3, cedula = $4, img = $5, updated_at = $6 WHERE id = $7",
            [ 
                entry.nombre, 
                entry.apellido, 
                entry.telefono, 
                entry.cedula,
                entry.img,
                now, 
                entry.id 
            ]
        );       
    }




}
export interface Admin {
    id?: number;
    cedula: number;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    password: string;
    img: string;
    rol: string;
    activo: boolean;
    token_reset?: string | null;
    created_at?: Date;
    updated_at?: Date;
}


export interface AdminController {
    id?: number;
    cedula: number;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    password?: string;
    img: string;
    rol: string;
    activo: boolean;
    token_reset?: string | null;
    created_at?: Date;
    updated_at?: Date;
}



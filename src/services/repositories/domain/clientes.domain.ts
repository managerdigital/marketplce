// CREATE TABLE clientes(
//     id SERIAL PRIMARY KEY,
//     nombre VARCHAR (50) DEFAULT NULL,
//     telefono NUMERIC DEFAULT NULL,
//     direccion TEXT DEFAULT NULL,
//     email VARCHAR (50) not null,
//     password VARCHAR (50) not null,
//     img VARCHAR (50) DEFAULT NULL,
//     activo boolean DEFAULT TRUE,
//     token_reset VARCHAR(250) DEFAULT NULL,
//     created_at DATE DEFAULT NULL,
//     updated_at DATE DEFAULT NULL,
//     UNIQUE(email)
// )

export interface Cliente{
    id: number;
    email: string;
    password?: string;
    nombre: string;
    telefono: number;
    direccion: string;
    cedula: number;
    img: string;
    activo: boolean;
    token_reset?: string | null;
    created_at: Date | null;
    updated_at: Date | null;  
}
export interface Plaza {
    id: number,
    admin_id: number[],
    localidad_id: number;
    categorias_id: number[];
    nombre: string,
    direccion: string,
    telefonos: number[],
    email: string,
    img: string,
    logo: string,
    horarios: string[],
    activo: boolean,
    created_at: Date | null,
    updated_at: Date | null,
}

// export interface PlazaTest {
//     id?: number,
//     admin_id: number,
//     localidad_nombre: string,
//     categorias_nombres: string[],
//     nombre: string,
//     direccion: string,
//     telefonos: number[],
//     email?: string,
//     img?: string | null,
//     logo?: string | null,
//     horarios?: string[],
//     activo?: boolean,
//     estrellas?: string | null,
//     created_at?: Date | null,
//     updated_at?: Date | null,
// }


// CREATE TABLE plazastest(
//     id SERIAL PRIMARY KEY,
//     admin_id  INT DEFAULT NULL,
//     localidad_nombre VARCHAR (50) DEFAULT NULL,
//     categorias_nombres text[] DEFAULT NULL,
//     nombre VARCHAR (50) NOT NULL,
//     direccion VARCHAR (50) NOT NULL,
//     telefonos bigint[],
//     email VARCHAR (50) DEFAULT null,
//     img VARCHAR (250) DEFAULT NULL,
//     logo VARCHAR (250) DEFAULT NULL,
//     horarios text[],
//     activo boolean DEFAULT TRUE,
//     estrellas VARCHAR (250) DEFAULT NULL,
//     created_at date DEFAULT NULL,
//     updated_at date DEFAULT NULL
// );
export interface ClienteCreateDto{
    email: string,
    password?: string,
    nombre?: string;
    direccion?: string;
    telefono?: number;
    cedula?: number;
    img?: string;
}

export interface ClienteUpdatedDto{
    email?: string,
    password?: string,
    nombre?: string;
    telefono?: number;
    direccion?: string;
    cedula?: number;
    img?: string;
}
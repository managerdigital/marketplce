export interface LocatarioCreateDto{
    admin_id: number[];
    plaza_id: number;
    categorias_id?: number[],
    productos_locatarios_id?: number[],
    nombre_local?: string;
    numero_local?: number[];
    nombre?: string;
    apellido?: string;
    cedula: number;
    email?: string;
    telefonos?: number[];
    horarios?: string[];
    img?: string;
    logo?: string;
}




export interface LocatarioUpdateDto{
    admin_id: number[];
    plaza_id: number;
    numero_local?: number[];
    nombre_local?: string;
    categorias_id?: number[],
    productos_locatarios_id: number[],
    nombre?: string;
    apellido?: string;
    cedula?: number;
    email?: string;
    telefonos?: number[];
    horarios?: string[];
    activo?: boolean;
    img?: string;
    logo?: string;
}
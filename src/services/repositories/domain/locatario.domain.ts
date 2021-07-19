export interface Locatario {
    id: number;
    admin_id: number[];
    plaza_id: number;
    categorias_id: number[],
    productos_locatarios_id?: number[],
    nombre_local: string;
    numero_local: number[];
    nombre: string;
    apellido: string;
    cedula: number;
    email: string;
    telefonos: number[],
    horarios: string[],
    img: string | null;
    logo: string | null;
    activo: boolean;
    created_at?: Date | null;
    updated_at?: Date | null;  
}

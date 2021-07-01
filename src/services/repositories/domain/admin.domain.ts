export interface Admin {
    id?: number;
    cedula?: number;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    password?: string;
    img?: string | null;
    rol?: string;
    token_reset?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}



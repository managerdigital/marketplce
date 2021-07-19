
export interface Productos {
    id: number,
    categorias_id: number[],
    plazas_id: number[],
    nombre: string,
    descripcion: string,
    unidad: string,
    sku: string,
    imagen_principal: string,
    imagen_1: string,
    imagen_2: string,
    activo: boolean;
    created_at?: Date,
    updated_at?: Date,
}



export interface ProductosLocatarios{
    id: number,
    producto_id: number,
    locatario_id: number,
    plaza_id: number,
    stock: boolean,
    en_promocion: boolean,
    precio: number,
    precio_rebajado: number,
    descripcion?: string,
    sku?: string,
    activo: boolean,
    created_at?: Date,
    updated_at?: Date
}


export interface ProductosLocatariosStore{
    producto_id: number,
    locatario_id: number,
    plaza_id: number,
    stock: boolean,
    en_promocion: boolean,
    precio: number,
    precio_rebajado: number,
    descripcion: string,
    sku?: string,
    activo: boolean,
    created_at?: Date,
    updated_at?: Date
}
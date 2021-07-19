export interface ProductoCreateDto {
    categorias_id?: number[];
    plazas_id: number[];
    nombre?: string;
    descripcion?: string;
    unidad?: string;
    sku?: string;
    imagen_principal?: string;
    imagen_1?: string;
    imagen_2?: string;
}

export interface ProductoUpdateDto {
    categorias_id?: number[];
    plazas_id?: number[];
    nombre: string;
    descripcion?: string;
    unidad?: string;
    sku?: string;
    imagen_principal?: string;
    imagen_1?: string;
    imagen_2?: string;
}


export interface ProductosLocatariosCreateDto{
    producto_id: number;
    locatario_id: number,
    stock: boolean,
    en_promocion: boolean,
    // unidad: string;
    cantidad_unidad: number;
    precio: number;
    precio_rebajado: number;
    descripcion?: string;
    sku: string;
}

export interface ProductosLocatariosUpdateDto{
    producto_id: number;
    locatario_id: number,
    stock: boolean,
    en_promocion: boolean,
    // unidad?: string;
    // cantidad_unidad?: number;
    precio?: number;
    precio_rebajado?: number;
    descripcion?: string;
    sku?: string;
}

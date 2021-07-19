export interface Promociones {
    id: number,
    producto_id: number[],
    plazas_id: number[],
    categorias_id: number[],
    imagen: string,
    activo: boolean;
    created_at?: Date,
    updated_at?: Date,
}


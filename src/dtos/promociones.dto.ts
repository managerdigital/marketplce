export interface PromocionesCreateDto{
    producto_id: number[],
    plazas_id: number[],
    categorias_id: number[],
    imagen: string,
}


export interface PromocionesUpdateDto{
    producto_id: number[],
    plazas_id: number[],
    categorias_id: number[],
    imagen: string,
    activo: boolean;
}
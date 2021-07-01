export interface CalificacionCreateDto{
    cliente_id: number,
    pedido_id?: number,
    plaza_id?: number,
    locatorio_id?: number,
    comentarios?: string,
    calificaciones?: number,
}


export interface CalificacionUpdateDto{
    cliente_id?: number,
    pedido_id?: number,
    plaza_id?: number,
    locatorio_id?: number,
    comentarios?: string,
    calificaciones?: number,
}


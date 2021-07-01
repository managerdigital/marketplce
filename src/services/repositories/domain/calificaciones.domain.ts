export interface Calificacion{
    id: number,
    cliente_id: number,
    pedido_id: number,
    plaza_id: number,
    locatorio_id: number,
    comentarios: string,
    calificaciones: number,
    created_at?: Date,
    updated_at?: Date
}
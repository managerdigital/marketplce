import { PedidosEstados } from '../../../common/enums/pedidos-estados';

export interface Pedido {
    id: number;
    pasarela_pagos_id: number;
    plaza_id: number;
    cliente_id: number;
    locatorios_id: number;
    productos_locatarios_id: number[];
    pagado: boolean;
    estado: PedidosEstados;
    total: number;
    created_at: Date | null;
    updated_at: Date | null;
}
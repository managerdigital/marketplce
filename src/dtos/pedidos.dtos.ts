import { PedidosEstados } from '../common/enums/pedidos-estados';

export interface PedidoCreateDto{
    pasarela_pagos_id?: number;
    plaza_id: number,
    cliente_id: number;
    locatorios_id: number,
    productos_locatarios_id: number[];
    estado: PedidosEstados;
    total: number;
}


// pasarela_pagos_id?: number;
export interface PedidoUpdateDto{
    plaza_id?: number,
    cliente_id?: number;
    locatorios_id?: number,
    productos_locatarios_id?: number[];
    estado: PedidosEstados;
    total?: number;
}    

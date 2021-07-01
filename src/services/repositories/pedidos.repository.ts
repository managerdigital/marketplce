import { PedidoCreateDto, PedidoUpdateDto } from '../../dtos/pedidos.dtos';
import { Pedido } from './domain/pedidos.domain';



export interface PedidoRepository { 
    store(entry: PedidoCreateDto): Promise<Pedido | null>;
    update(id: number, entry: PedidoUpdateDto): Promise<Pedido | null>;
    getAll(): Promise<Pedido[] | null>;
    findById(id: number): Promise<Pedido | null>;
    pagadoYEntregado(id: number): Promise<void>;
}
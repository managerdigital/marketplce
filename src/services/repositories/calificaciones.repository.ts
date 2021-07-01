import { Calificacion } from './domain/calificaciones.domain';
import { CalificacionCreateDto } from '../../dtos/calificaciones.dto';

export interface CalificacionesRepository { 
    store(entry: CalificacionCreateDto): Promise<Calificacion | null>;
    update(id: number, entry: Calificacion): Promise<void>;
    findById(id: number): Promise<Calificacion | null>;
    findByClienteId(clienteId: number): Promise<Calificacion | null>;
    findByPedidoId(pedidoId: number): Promise<Calificacion | null>;
    findByPlazaId(plazaId: number): Promise<Calificacion | null>;
    findByLocatarioId(locatarioId: number): Promise<Calificacion | null>;
    getAll(): Promise<Calificacion[] | null>;
}
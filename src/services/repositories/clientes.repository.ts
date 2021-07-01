import { Cliente } from './domain/clientes.domain';
import { ClienteCreateDto, ClienteUpdatedDto } from '../../dtos/clientes.dto';

export interface ClienteRepository { 
    store(entry: ClienteCreateDto): Promise<Cliente | null>;
    update(id: number, entry: ClienteUpdatedDto): Promise<Cliente | null>;
    delete(id: number): Promise<void>;
    getAll(): Promise<Cliente[] | null>;
    findById(id: number): Promise<Cliente | null>;
    findByEmail(email: string): Promise<Cliente | null>;
}
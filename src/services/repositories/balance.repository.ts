import { BalanceUpdateDto, BalanceCreateDto } from '../../dtos/balance.dto';
import { Balance } from './domain/balance.domain';

export interface BalanceRepository { 
    store(entry: BalanceCreateDto): Promise<Balance | null>;
    update(entry: BalanceUpdateDto, id: number): Promise<void>;
    findById(id: number): Promise<Balance | null>;
    findByPlazaId(plazaId: number): Promise<Balance | null>;
    findByLocatarioId(locatarioId: number): Promise<Balance | null>;
    findByClienteId(clienteId: number): Promise<Balance | null>;
    getAll(): Promise<Balance[] | null>;
}
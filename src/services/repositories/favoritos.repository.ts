import { FavoritoCreateDto } from '../../dtos/favorito.dto';
import { Favorito } from './domain/favoritos.domain';

export interface FavoritoRepository {
    store(entry: FavoritoCreateDto): Promise<void>;
    delete(id: number): Promise<void>;
    getByCliente(clienteId: number): Promise<Favorito[] | null>;
} 
import { VentasCategoriaCreateDto } from '../../dtos/ventasCategorias.dto';

export interface VentasCategoriasRepository {
    store(entry: VentasCategoriaCreateDto): Promise<void>;
    findByLocatario(id: number): Promise<any | null>;
    findByPlazas(id: number): Promise<any | null>;
}
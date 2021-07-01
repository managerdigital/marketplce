import { Plaza } from './domain/plazas.domain';
import { PlazaCreateDto, PlazaUpdateDto } from '../../dtos/plazas.dto';


export interface PlazaRepository {

    store(entry: PlazaCreateDto): Promise<Plaza | null>;
    getAll(): Promise<Plaza[] | null>;
    // find(id: number, buscarPor: string, busca: string): Promise<Plaza | null>;
    update(id: number, entry: PlazaUpdateDto): Promise<void>;
    updateCategoria(id: number, categorias: [] ): Promise<void>;
    delete(id: number): Promise<void>;
    findByName(nombre: string): Promise<Plaza | null>;
    findByEmail(email: string): Promise<Plaza | null>;
    findById(id: number): Promise<Plaza | null>;


}
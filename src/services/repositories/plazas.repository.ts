import { Plaza } from './domain/plazas.domain';
import { PlazaCreateDto, PlazaUpdateDto } from '../../dtos/plazas.dto';


export interface PlazaRepository {

    store(entry: PlazaCreateDto): Promise<Plaza | null>;
    update(id: number, entry: PlazaUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
    getAll(): Promise<Plaza[] | null>;
    findByName(nombre: string): Promise<Plaza | null>;
    findByEmail(email: string): Promise<Plaza | null>;
    findById(id: number): Promise<Plaza | null>;


}
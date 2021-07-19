import { Promociones } from './domain/promociones.domain';
import { PromocionesCreateDto } from '../../dtos/promociones.dto';


export interface PromocionesRepository { 
    store(entry: PromocionesCreateDto): Promise<Promociones | null>;
    update(id: number, entry: Promociones): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<Promociones | null>;
    getAll(): Promise<Promociones[] | null>;
}
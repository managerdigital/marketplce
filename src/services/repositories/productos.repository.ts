import { ProductoCreateDto, ProductoUpdateDto } from '../../dtos/productos.dto';
import { Productos } from './domain/productos.domain';


export interface ProductoRepository { 
    store(entry: ProductoCreateDto): Promise<Productos | null>;
    update(id: number, entry: ProductoUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
    findByName(nombre: string): Promise<Productos | null>;
    findById(id: number): Promise<Productos | null>
    // findByNameAndUnit(name: string, unit: string): Promise<Productos | null>
    getAll(): Promise<Productos[] | null>;
}
import { ProductosLocatarios } from './domain/productos.domain';
import { ProductosLocatariosCreateDto } from '../../dtos/productos.dto';


export interface ProductosLocatariosRepository { 
    store(entry: ProductosLocatariosCreateDto): Promise<ProductosLocatarios | null> 
    update(id: number, entry: ProductosLocatarios): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ProductosLocatarios | null>;
    getAll(): Promise<ProductosLocatarios[] | null>;
}
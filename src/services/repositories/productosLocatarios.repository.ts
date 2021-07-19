import { ProductosLocatarios } from './domain/productos.domain';


export interface ProductosLocatariosRepository { 
    // store(entry: ProductosLocatariosStore): Promise<ProductosLocatarios | null>;
    update(id: number, entry: ProductosLocatarios): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<ProductosLocatarios | null>;
    getAll(): Promise<ProductosLocatarios[] | null>;
}
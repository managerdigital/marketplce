import { CategoriaCreateDto } from '../../dtos/categorias.dto';
import { Categoria } from './domain/categoria.domain';

export interface CategoriaRepository { 

    store(entry: CategoriaCreateDto): Promise<Categoria | null>;
    update(entry: Categoria): Promise<void>;
    delete(id: number): Promise<void>;
    getAllCategorias(): Promise<Categoria[] | null>;
    findById(id: number): Promise<Categoria | null>;
    findByName(nombre: string): Promise<Categoria | null>;
}
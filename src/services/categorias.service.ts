import { Categoria } from './repositories/domain/categoria.domain';

import { ApplicationException } from '../common/exceptions/application.exception';

import { CategoriaPGRepository } from './repositories/implementation/pg/categoria.imp';
// import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';
import { CategoriaCreateDto, CategoriaUpdateDto } from '../dtos/categorias.dto';



export class CategoriaService {
    

    constructor(private readonly categoriaRepository: CategoriaPGRepository) {}


    async findById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findById(id);
        if(categoria) return categoria;
        throw new ApplicationException("No existen categoria");
    }

    
    async findByName(nombre: string): Promise<Categoria | null> {
        const categoria = await this.categoriaRepository.findByName(nombre);
        if(categoria) return categoria;
        throw new ApplicationException("No existen categoria");
    }


    async getAllCategorias(): Promise<Categoria[] | null>{
        const categorias =  await this.categoriaRepository.getAllCategorias();
        if(!categorias)  throw new ApplicationException("No existen categorias en el sistema");
        return categorias;
    }


    async store(entry: CategoriaCreateDto): Promise<Categoria> {
        const existeCategoria = await this.categoriaRepository.findByName(entry.nombre);
        if(existeCategoria) throw new ApplicationException("Existe una categoria con ese nombre");
        
        const categoria = await this.categoriaRepository.store({
            nombre: entry.nombre,
            descripcion: entry.descripcion,
            icono: entry.icono,
            slug: entry.slug
        } as Categoria);
        if(!categoria) throw new ApplicationException("Hubo un error");
        return categoria;
    }


    async update(entry: CategoriaUpdateDto, id: number): Promise<void>{
        const originalEntry = await this.categoriaRepository.findById(id);
        
        if(!originalEntry) throw new ApplicationException("No existen categorias en el sistema");

        originalEntry.nombre = entry.nombre || originalEntry.nombre;
        originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;
        originalEntry.slug = entry.slug || originalEntry.slug;
        originalEntry.icono = entry.icono || originalEntry.icono;

        await this.categoriaRepository.update(originalEntry);
    }


    
    public async delete(id: number): Promise<void>{
        const existe = await this.categoriaRepository.findById(id);

        if(!existe) throw new ApplicationException("No existe una categoria con ese ID");

        await this.categoriaRepository.delete(id);
    }
}
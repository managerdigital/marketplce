import { ApplicationException } from '../common/exceptions/application.exception';

import { ProductosPGRepository } from './repositories/implementation/pg/productos.imp';
import { CategoriaPGRepository } from './repositories/implementation/pg/categoria.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';

import { Productos } from './repositories/domain/productos.domain';

import { ProductoCreateDto, ProductoUpdateDto } from '../dtos/productos.dto';




export class ProductoService{


    constructor(private readonly productoRepository: ProductosPGRepository,
                private readonly categoriaRepository: CategoriaPGRepository,
                private readonly plazaRepository: PlazaPGRepository){}


    private async buscarCategoriasSiExisten(categorias_id: number[]): Promise<boolean>{
        for(const key in categorias_id){
            const existeCategoria = await this.categoriaRepository.findById(categorias_id[key]);
            if(!existeCategoria) return false;
        }
        return true;
    }


    private async buscarPlazaSiExisten(plazas_id: number[]): Promise<boolean>{
        if(plazas_id.length === 0) return false;
        for(let i=0; i<(plazas_id.length-1); i++) {
            const existePlaza = await this.plazaRepository.findById(plazas_id[i] as number);
            if(!existePlaza) return false;
        }
        return true;
    }
    

    async store(entry: ProductoCreateDto): Promise<Productos | null> {
        if(!entry.nombre) throw new ApplicationException("El nombre debe estar");
        // const productoExiste = await this.productoRepository.findByName(entry.nombre);
        // if(productoExiste) throw new ApplicationException("Ya existe producto con ese nombre");
        
        if(entry.categorias_id) {
            const existenCategorias = await this.buscarCategoriasSiExisten(entry.categorias_id) as boolean;
            if(!existenCategorias) throw new ApplicationException("No existe una de las categorias");
        }

        if(entry.plazas_id){
            const existenPLazas = await this.buscarPlazaSiExisten(entry.plazas_id) as boolean;
            if(!existenPLazas) throw new ApplicationException("No existe una de las plazas");
        }
        if(entry.unidad) entry.unidad = entry.unidad.toLocaleLowerCase();
        const producto = await this.productoRepository.store(entry);
        if(!producto) throw new ApplicationException("Hubo un error");
        return producto;
    }



    async update(id: number, entry: ProductoUpdateDto): Promise<void> {
        const originalEntry = await this.productoRepository.findById(id);
        
        if(!originalEntry) throw new ApplicationException("No existe un producto con ese id");

        if(entry.categorias_id) {
            const existenCategorias = await this.buscarCategoriasSiExisten(entry.categorias_id);
            if(!existenCategorias) throw new ApplicationException("No existe una de las categorias");
        }

        if(entry.plazas_id){
            const existenPLazas = await this.buscarPlazaSiExisten(entry.plazas_id);
            if(!existenPLazas) throw new ApplicationException("No existe una de las plazas");
        }
        if(entry.unidad) entry.unidad = entry.unidad.toLocaleLowerCase();
        
        originalEntry.nombre = entry.nombre || originalEntry.nombre;
        originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
        originalEntry.plazas_id = entry.plazas_id || originalEntry.plazas_id;
        originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;
        originalEntry.unidad = entry.unidad|| originalEntry.unidad;
        originalEntry.sku = entry.sku || originalEntry.sku;
        originalEntry.imagen_principal = entry.imagen_principal || originalEntry.imagen_principal;
        originalEntry.imagen_1 = entry.imagen_1 || originalEntry.imagen_1;
        originalEntry.imagen_2 = entry.imagen_2 || originalEntry.imagen_2;

        return await this.productoRepository.update(id, originalEntry);
    }


    async delete(id: number): Promise<void> {
        const productoExiste = await this.productoRepository.findById(id);
        if(!productoExiste) throw new ApplicationException("No existe un producto con ese id");
        return await this.productoRepository.delete(id);
    }


    async findById(id: number): Promise<Productos> {
        const producto = await this.productoRepository.findById(id);
        if(!producto) throw new ApplicationException("No existe ese producto");
        return producto;
    }


    async findByNameAndUnit(name: string, unit: string): Promise<Productos> {
        const producto = await this.productoRepository.findByNameAndUnit(name, unit)
        if(!producto) throw new ApplicationException("No existe ese producto");
        return producto;
    }


    async getAll(): Promise<Productos[] | null> {
        const productos = await this.productoRepository.getAll();
        if(!productos) throw new ApplicationException("No existe productos");
        return productos;
    }


 

}
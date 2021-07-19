import { ApplicationException } from '../common/exceptions/application.exception';

import { ProductosPGRepository } from './repositories/implementation/pg/productos.imp';
import { CategoriaPGRepository } from './repositories/implementation/pg/categoria.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';
import { PromocionesPGRepository } from './repositories/implementation/pg/promociones.imp';

import { Promociones } from './repositories/domain/promociones.domain';

import { PromocionesCreateDto, PromocionesUpdateDto } from '../dtos/promociones.dto';


export class PromocionService{


    constructor(private readonly promocionesRepository: PromocionesPGRepository,
                private readonly productoRepository: ProductosPGRepository,
                private readonly categoriaRepository: CategoriaPGRepository,
                private readonly plazaRepository: PlazaPGRepository){}
          

    private async verificaIds(entry: PromocionesCreateDto | PromocionesUpdateDto): Promise<void>{
        if(entry.producto_id){
            for(const key in entry.producto_id){
                const existeProducto = await this.productoRepository.findById(entry.producto_id[key]);
                if(!existeProducto) throw new ApplicationException("No encontrada una de los productos");  
            }    
        }
        
        if(entry.categorias_id){
            for(const key in entry.categorias_id){
                const existeCategoria = await this.categoriaRepository.findById(entry.categorias_id[key]);
                if(!existeCategoria) throw new ApplicationException("No existe una de las categorias");
            }
        }
        
        for(const key in entry.plazas_id){
            const existePlazas = await this.plazaRepository.findById(entry.plazas_id[key]);
            if(!existePlazas) throw new ApplicationException("No existe una de las plazas");
        }
    }

    async store(entry: PromocionesCreateDto): Promise<Promociones> {
        if(!entry.producto_id) throw new ApplicationException("El producto Id es necesario");

        await this.verificaIds(entry);

        const promocion = await this.promocionesRepository.store(entry);
        if(!promocion) throw new ApplicationException("Hubo un error");
        return promocion as Promociones;
    }


    async update(id: number, entry: PromocionesUpdateDto): Promise<void> {
       
        const originalEntry = await this.promocionesRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existe la promoción con ese id");
 
        originalEntry.producto_id = entry.producto_id || originalEntry.producto_id;
        originalEntry.plazas_id = entry.plazas_id || originalEntry.plazas_id;
        originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
        originalEntry.imagen = entry.imagen || originalEntry.imagen;
        originalEntry.activo = entry.activo;

        await this.promocionesRepository.update(id, originalEntry as Promociones);
    }


    async delete(id: number): Promise<void> {
        return await this.promocionesRepository.delete(id);
    }

    async findById(id: number): Promise<Promociones> {
        const producto = await this.promocionesRepository.findById(id);
        if(!producto) throw new ApplicationException("No existe esa promoción");
        return producto as Promociones;
    }

    async getAll(): Promise<Promociones[]> {
        const productos = await this.promocionesRepository.getAll();
        if(!productos) throw new ApplicationException("No hay promociones");
        return productos as Promociones[];
    }

}
import { ApplicationException } from '../common/exceptions/application.exception';

import { ProductosLocatariosUpdateDto } from '../dtos/productos.dto';

import { ProductosLocatarios } from './repositories/domain/productos.domain';

import { ProductosPGRepository } from './repositories/implementation/pg/productos.imp';
import { ProductosLocatariosPGRepository } from './repositories/implementation/pg/productosLocatarios.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';


export class ProductosLocatariosService{

    constructor(private readonly productosLocatariosRepository: ProductosLocatariosPGRepository,
                private readonly productoRepository: ProductosPGRepository,
                private readonly locatarioRepository: LocatarioPGRepository){}

    // async store(entry: ProductosLocatariosCreateDto): Promise<ProductosLocatarios> {
    //     if(!entry.producto_id) throw new ApplicationException("El producto Id es necesario");

    //     const existeLocatario = await this.locatarioRepository.findById(entry.locatario_id);
    //     if(!existeLocatario) throw new ApplicationException("No existe ese locatario");
        
    //     const existeProductoGeneral = await this.productoRepository.findById(entry.producto_id);
    //     if(!existeProductoGeneral) throw new ApplicationException("No existe el producto general con ese id");

    //     const productoLocatario = await this.productosLocatariosRepository.store(entry);
    //     if(!productoLocatario) throw new ApplicationException("Hubo un error");

    //     return productoLocatario as ProductosLocatarios;
    // }


    async update(id: number, entry: ProductosLocatariosUpdateDto): Promise<void> {
        const existeProductoGeneral = await this.productoRepository.findById(entry.producto_id);   
        if(!existeProductoGeneral) throw new ApplicationException("No existe el producto general con ese id");

        const existeLocatario = await this.locatarioRepository.findById(entry.locatario_id);
        if(!existeLocatario) throw new ApplicationException("No existe ese locatario");
        
        const originalEntry = await this.productosLocatariosRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existe el producto con ese id");
 
        originalEntry.producto_id = entry.producto_id || originalEntry.producto_id;
        originalEntry.locatario_id = entry.locatario_id || originalEntry.locatario_id;
        originalEntry.precio = entry.precio || originalEntry.precio;

        originalEntry.precio_rebajado = entry.precio_rebajado || 0;

        originalEntry.descripcion = entry.descripcion || originalEntry.descripcion;

        if(originalEntry.sku) originalEntry.sku = entry.sku || originalEntry.sku;

        originalEntry.stock = entry.stock;
        originalEntry.en_promocion = entry.en_promocion;


        await this.productosLocatariosRepository.update(id, originalEntry as ProductosLocatarios);
    }


    async delete(id: number): Promise<void> {
        return await this.productosLocatariosRepository.delete(id);
    }


    async findById(id: number): Promise<ProductosLocatarios> {
        const producto = await this.productosLocatariosRepository.findById(id);
        if(!producto) throw new ApplicationException("No existe ese producto");
        return producto as ProductosLocatarios;
    }

    async getAll(): Promise<ProductosLocatarios[]> {
        const productos = await this.productosLocatariosRepository.getAll();
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

    async getByLocatarios(locatarioId: number): Promise<ProductosLocatarios[]> {
        const productos = await this.productosLocatariosRepository.getByLocatarios(locatarioId);
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

    async getByCategoriaIdLocatarioId(categoriaId: number, locatarioId: number): Promise<ProductosLocatarios[]> {
        const productos = await this.productosLocatariosRepository.getByCategoriaIdLocatarioId(categoriaId, locatarioId);
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

    async getProductosByPlazaYEnPromocion(plazaId: number): Promise<ProductosLocatarios[]> {
        const productos = await this.productosLocatariosRepository.getProductosByPlazaYEnPromocion(plazaId);
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

    async getProductosByLocatarioYEnPromocion(locatarioId: number): Promise<ProductosLocatarios[]> {
        const productos = await this.productosLocatariosRepository.getProductosByLocatarioYEnPromocion(locatarioId);
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

    async getByLocatariosPaginado(locatarioId: number, desdeLocatarioId: number, limite: number): Promise<ProductosLocatarios[]> {
        if(!desdeLocatarioId) {
            const productos = await this.productosLocatariosRepository.getByLocatariosPaginadoHelper(locatarioId, limite);
            if(!productos) throw new ApplicationException("No hay productos");
            return productos as ProductosLocatarios[];
        }
        
        const productos = await this.productosLocatariosRepository.getByLocatariosPaginado(locatarioId, desdeLocatarioId, limite);
        if(!productos) throw new ApplicationException("No hay productos");
        return productos as ProductosLocatarios[];
    }

}
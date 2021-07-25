import { ApplicationException } from '../common/exceptions/application.exception';

import { Favorito } from './repositories/domain/favoritos.domain';
import { FavoritoCreateDto } from '../dtos/favorito.dto';

import { FavoritosPGRepository } from './repositories/implementation/pg/favoritos.imp';
import { ProductosLocatariosPGRepository } from './repositories/implementation/pg/productosLocatarios.imp';
import { ClientePGRepository } from './repositories/implementation/pg/clientes.imp';

export class FavoritoService {

    constructor(private readonly favoritoRepository: FavoritosPGRepository,
                private readonly productosLocatariosRepository: ProductosLocatariosPGRepository,
                private readonly clienteRepository: ClientePGRepository) {}

    async store(entry: FavoritoCreateDto): Promise<void> {
        const cliente = await this.clienteRepository.findById(entry.cliente_id);
        if(!cliente) throw new ApplicationException('No existe ese cliente');

        const productolocatario = await this.productosLocatariosRepository.findById(entry.producto_locatario_id);
        if(!productolocatario) throw new ApplicationException('Producto Locatario No existe');
        
        entry.producto_id = productolocatario.producto_id;
        await this.favoritoRepository.store(entry);
    }


    async delete(id: number): Promise<void> {
        await this.favoritoRepository.delete(id);
    }


    async getByCliente(clienteId: number): Promise<Favorito[]> {
        const productos = await this.favoritoRepository.getByCliente(clienteId);
        if(!productos) throw new ApplicationException('Hubo un error');
        return productos as Favorito[];
    }

}
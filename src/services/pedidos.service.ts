import { ApplicationException } from '../common/exceptions/application.exception';

import { PedidoCreateDto, PedidoUpdateDto } from '../dtos/pedidos.dtos';

import { Pedido } from './repositories/domain/pedidos.domain';

import { PedidosEstados } from '../common/enums/pedidos-estados';

import { PedidoPGRepository } from './repositories/implementation/pg/pedidos.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';
import { ClientePGRepository } from './repositories/implementation/pg/clientes.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';
import { ProductosLocatariosPGRepository } from './repositories/implementation/pg/productosLocatarios.imp';
import { BalancePGRepository } from './repositories/implementation/pg/balance.imp';
import { BalanceCreateDto } from '../dtos/balance.dto';


export class PedidoService {

    constructor(private readonly pedidoRepository: PedidoPGRepository,
                private readonly plazaRepository: PlazaPGRepository,
                private readonly clienteRepository: ClientePGRepository,
                private readonly locatarioRepository: LocatarioPGRepository,
                private readonly productosLocatariosRepository: ProductosLocatariosPGRepository,
                private readonly balanceRepository: BalancePGRepository) {}
            



    private async verificaIds(entry: PedidoCreateDto | PedidoUpdateDto): Promise<void>{
        if(entry.plaza_id){
            const plazaExiste = await this.plazaRepository.findById(entry.plaza_id);
            if(!plazaExiste) throw new ApplicationException("Plaza con ese id no existe");
        }

        if(entry.locatorios_id){
            const locatarioExiste = await this.locatarioRepository.findById(entry.locatorios_id);
            if(!locatarioExiste) throw new ApplicationException("Locatarios con ese id no existe");
        }
        
        if(entry.cliente_id){
            const clienteExiste = await this.clienteRepository.findById(entry.cliente_id);
            if(!clienteExiste) throw new ApplicationException("No existe cliente con ese id");
        }

        if(entry.productos_locatarios_id){
            const productosLocatariosId: [] = entry.productos_locatarios_id as [];
            for(const key in productosLocatariosId){
                const existeProductoLocal = await this.productosLocatariosRepository.findById(productosLocatariosId[key]);
                if(!existeProductoLocal) throw new ApplicationException("No existe uno de los productos");
            }  
        }
    }


    // TODO: VERIFICAR POR EL ID DE LA PASARELA
    public async store(entry: PedidoCreateDto): Promise<Pedido>{
        await this.verificaIds(entry);
        const pedido = await this.pedidoRepository.store(entry);
        if(!pedido) throw new ApplicationException("Hubo un error");
        return pedido;
    }


    public async update(id: number, entry: PedidoUpdateDto): Promise<Pedido>{
        await this.verificaIds(entry);
        
        if(entry.estado > 3) throw new ApplicationException("Hubo un error en los estados del pedido");

        const originalEntry = await this.pedidoRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existe un pedido con ese id");

        originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
        originalEntry.locatorios_id = entry.locatorios_id || originalEntry.locatorios_id;
        originalEntry.cliente_id = entry.cliente_id || originalEntry.id;
        originalEntry.productos_locatarios_id = entry.productos_locatarios_id || originalEntry.productos_locatarios_id;
        originalEntry.total = entry.total || originalEntry.total;
        originalEntry.pagado = entry.pagado || originalEntry.pagado;
        originalEntry.estado = entry.estado || originalEntry.estado;
        
        // ESTADO = entragado(2) ENTONCES PAGADO = TRUE
        if (originalEntry.estado === PedidosEstados.entregado) {
            const balance = await this.balanceRepository.store({
                total: entry.total || originalEntry.total,
                plaza_id: entry.plaza_id || originalEntry.id,
                locatorio_id: entry.locatorios_id || originalEntry.locatorios_id,
                cliente_id: entry.cliente_id || originalEntry.cliente_id
            } as BalanceCreateDto);
            if(!balance) throw new ApplicationException("Hubo un error");
        }

        const pedido = await this.pedidoRepository.update(originalEntry.id, originalEntry);
        if(!pedido) throw new ApplicationException("Hubo un error");
        return pedido;
    }


    public async pagadoYEntregado(id: number): Promise<void>{
        const existePedido = await this.pedidoRepository.findById(id);
        if(!existePedido) throw new ApplicationException("No existe un pedido con ese id");
        return await this.pedidoRepository.pagadoYEntregado(id);
    }


    public async findById(id: number): Promise<Pedido>{
        const pedido = await this.pedidoRepository.findById(id);
        if(!pedido) throw new ApplicationException("No existe un pedido con ese id");
        return pedido;
    }


    public async getAll(): Promise<Pedido[] | null>{
        const pedidos = await this.pedidoRepository.getAll();
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");
        return pedidos as Pedido[];
    }


    public async pedidosPorLocatario(locatarioId: number): Promise<Pedido[] | null>{
        const existeLocatario = await this.locatarioRepository.findById(locatarioId);
        if(!existeLocatario) throw new ApplicationException("No existe ese locatario");

        const pedidos = await this.pedidoRepository.pedidosPorLocatario(locatarioId);
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");
        return pedidos as Pedido[];
    }

}
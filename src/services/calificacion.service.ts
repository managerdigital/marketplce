import { CalificacionCreateDto, CalificacionUpdateDto } from '../dtos/calificaciones.dto';

import { Calificacion } from './repositories/domain/calificaciones.domain';

import { ApplicationException } from '../common/exceptions/application.exception';

import { CalificacionPGRepository } from './repositories/implementation/pg/calificaciones.imp';
import { ClientePGRepository } from './repositories/implementation/pg/clientes.imp';
import { PedidoPGRepository } from './repositories/implementation/pg/pedidos.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';


export class CalificacionService {
    
    constructor(private readonly calificacionRepository: CalificacionPGRepository,
                private readonly clienteRepository: ClientePGRepository,
                private readonly pedidoRepository: PedidoPGRepository,
                private readonly plazaRepository: PlazaPGRepository,
                private readonly locatarioRepository: LocatarioPGRepository) {}


    async verificaIds(entry: CalificacionCreateDto | CalificacionUpdateDto): Promise<void>{
        if(entry.cliente_id) {
            const existeCliente = await this.clienteRepository.findById(entry.cliente_id);
            if(!existeCliente) throw new ApplicationException("No existe el cliente");
        }

        if(entry.pedido_id) {
            const existePedido = await this.pedidoRepository.findById(entry.pedido_id);
            if(!existePedido) throw new ApplicationException("No existe el pedido");
        }

        if(entry.plaza_id) {
            const existePlaza = await this.plazaRepository.findById(entry.plaza_id);
            if(!existePlaza) throw new ApplicationException("No existe la plaza");
        }

        if(entry.locatorio_id) {
            const existeLocatario = await this.locatarioRepository.findById(entry.locatorio_id);
            if(!existeLocatario) throw new ApplicationException("No existe el locatario");
        }

    }
    
    async store(entry: CalificacionCreateDto): Promise<Calificacion> {

        await this.verificaIds(entry);

        const calificacion = await this.calificacionRepository.store(entry);
        if(!calificacion) throw new ApplicationException("Hubo un error");
        
        return calificacion as Calificacion;
    }


    async update(id: number, entry: CalificacionUpdateDto): Promise<void>{
        const originalEntry = await this.calificacionRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existen esa calificación");
     
        await this.verificaIds(entry);

        originalEntry.cliente_id = entry.cliente_id || originalEntry.cliente_id;
        originalEntry.pedido_id = entry.pedido_id || originalEntry.pedido_id;
        originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
        originalEntry.locatorio_id = entry.locatorio_id || originalEntry.locatorio_id;
        originalEntry.comentarios = entry.comentarios || originalEntry.comentarios;
        originalEntry.calificaciones = entry.calificaciones || originalEntry.calificaciones;

        await this.calificacionRepository.update(id, originalEntry);
    }
    

    async getAll(): Promise<Calificacion[]> {
        const balance = await this.calificacionRepository.getAll();
        if(!balance) throw new ApplicationException("No existen calificaciones");
        return balance as Calificacion[];
    }


}
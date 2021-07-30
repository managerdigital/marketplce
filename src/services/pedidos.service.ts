import { ApplicationException } from '../common/exceptions/application.exception';

import { PedidoCreateDto, PedidoUpdateDto } from '../dtos/pedidos.dtos';
import { VentasProductosLocatariosCreateDto } from '../dtos/ventasProductosLocatarios.dto';
import { BalanceCreateDto } from '../dtos/balance.dto';

import { Pedido } from './repositories/domain/pedidos.domain';
import { Locatario } from './repositories/domain/locatario.domain';

import { PedidosEstados } from '../common/enums/pedidos-estados';

import { PedidoPGRepository } from './repositories/implementation/pg/pedidos.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';
import { ClientePGRepository } from './repositories/implementation/pg/clientes.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';
import { ProductosLocatariosPGRepository } from './repositories/implementation/pg/productosLocatarios.imp';
import { BalancePGRepository } from './repositories/implementation/pg/balance.imp';
import { VentasProductosLocatariosPGRepository } from './repositories/implementation/pg/ventasProductosLocatarios.imp';

import { transporter } from '../common/mailer/mailer';
import { AdminPGRepository } from './repositories/implementation/pg/admin.imp';


export class PedidoService {

    constructor(private readonly pedidoRepository: PedidoPGRepository,
                private readonly plazaRepository: PlazaPGRepository,
                private readonly clienteRepository: ClientePGRepository,
                private readonly locatarioRepository: LocatarioPGRepository,
                private readonly productosLocatariosRepository: ProductosLocatariosPGRepository,
                private readonly balanceRepository: BalancePGRepository,
                private readonly ventasProductosLocatariosRepository: VentasProductosLocatariosPGRepository,
                private readonly adminRepository: AdminPGRepository) {}        



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

    public async sendEmail(email: string): Promise<void>{
        await transporter.sendMail({
            from: '"Olvido la contraseña" <ipes.marketplace.desarrollo@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Se ha registrado un pedido para tu local", // Subject line
            html: `
            <div style="background-color: #EAEAEA; height: 450px;">
              <div style="border: 1px solid #EAEAEA; margin: 0 auto; padding: 10px; display: flex; flex-flow: column wrap; width: 500px; height: 300px; background-color: white; padding-top: 80px;">
                <h1>Se ha registrado un pedido</h1>
                <!-- Logo -->
                <br />
                <p>¡Hola!, se ha generado un pedido para tu local!</p>
                <i>¿No reconoces esta acción?. Contacta a soporte técnico</i>
              </div>
            </div>
            `,
          });   
        return; 
    }


    public async store(entry: PedidoCreateDto): Promise<Pedido>{
        await this.verificaIds(entry);
        const locatario = await this.locatarioRepository.findById(entry.locatorios_id) as Locatario;
        if(!locatario) throw new ApplicationException("No existe el locatario");

        entry.plaza_id = locatario.plaza_id;
        
        const pedido = await this.pedidoRepository.store(entry);
        if(!pedido) throw new ApplicationException("Hubo un error");
        
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(locatario.email)) await this.sendEmail(locatario.email);

        const adminsLocatario = locatario.admin_id;
        for(let i = 0; i < adminsLocatario.length; i++) {
            const admin = await this.adminRepository.findById(adminsLocatario[i]);
            if(!admin) throw new ApplicationException("No existe un admin")
            if (emailRegex.test(admin.email)) await this.sendEmail(admin.email);
        }
        
        return pedido;
    }


    public async update(id: number, entry: PedidoUpdateDto): Promise<Pedido>{
        await this.verificaIds(entry);
        
        if(entry.estado > 3) throw new ApplicationException("Hubo un error en los estados del pedido");

        const originalEntry = await this.pedidoRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existe un pedido con ese id");

        originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
        originalEntry.locatorios_id = entry.locatorios_id || originalEntry.locatorios_id;
        originalEntry.cliente_id = entry.cliente_id || originalEntry.cliente_id;
        originalEntry.productos_locatarios_id = entry.productos_locatarios_id || originalEntry.productos_locatarios_id;
        originalEntry.total = entry.total || originalEntry.total;
        originalEntry.estado = entry.estado;
        
        // Note: ESTADO = entragado(2) ENTONCES PAGADO = TRUE
        if (originalEntry.estado === PedidosEstados.entregado) {
            const balance = await this.balanceRepository.store({
                total: entry.total || originalEntry.total,
                plaza_id: entry.plaza_id || originalEntry.id,
                locatorio_id: entry.locatorios_id || originalEntry.locatorios_id,
                cliente_id: entry.cliente_id || originalEntry.cliente_id
            } as BalanceCreateDto);
            if(!balance) throw new ApplicationException("Hubo un error");
            
            const productosLocatarios = originalEntry.productos_locatarios_id || entry.productos_locatarios_id;
            for(let i = 0; i<productosLocatarios.length; i++) {

                const productoLocal = await this.productosLocatariosRepository.findById(productosLocatarios[i])
                if(!productoLocal) throw new ApplicationException("No existe un producto locatario");

                await this.ventasProductosLocatariosRepository.store({
                    plaza_id: entry.plaza_id || originalEntry.plaza_id,
                    producto_locatario_id: productoLocal.id,
                    locatario_id: productoLocal.locatario_id
                } as VentasProductosLocatariosCreateDto);
            }
        }

        const pedido = await this.pedidoRepository.update(originalEntry.id, originalEntry);
        if(!pedido) throw new ApplicationException("Hubo un error");
        return pedido;
    }




    // public async pagadoYEntregado(id: number): Promise<void>{
    //     const entry = await this.pedidoRepository.findById(id);
    //     if(!entry) throw new ApplicationException("No existe un pedido con ese id");
        
    //     const balance = await this.balanceRepository.store({
    //         total: entry.total,
    //         plaza_id: entry.plaza_id,
    //         locatorio_id: entry.locatorios_id,
    //         cliente_id: entry.cliente_id
    //     } as BalanceCreateDto);
    //     if(!balance) throw new ApplicationException("Hubo un error");
       
    //     return await this.pedidoRepository.pagadoYEntregado(id);
    // }


    public async findById(id: number): Promise<Pedido>{
        const pedido = await this.pedidoRepository.findById(id);
        if(!pedido) throw new ApplicationException("No existe un pedido con ese id");
        return pedido;
    }


    public async getAll(): Promise<[] | null>{
        const pedidos = await this.pedidoRepository.getAll();
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");

        const pedidosReturn = [];
        for(let i = 0; i<pedidos.length; i++) {
            const cliente = await this.clienteRepository.findById(pedidos[i].cliente_id);
            if(!cliente) throw new ApplicationException("No existe uno de los clientes");

            pedidosReturn.push({
                ...pedidos[i],    
                cliente: {
                    nombre: cliente.nombre,
                    cedula: cliente.cedula
                }
            });
        }
        return pedidosReturn as [];
    }


    public async pedidosPorLocatario(locatarioId: number): Promise<[]>{
        const existeLocatario = await this.locatarioRepository.findById(locatarioId);
        if(!existeLocatario) throw new ApplicationException("No existe ese locatario");

        const pedidos = await this.pedidoRepository.pedidosPorLocatario(locatarioId);
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");

        const pedidosReturn = [];
        for(let i = 0; i<pedidos.length; i++) {
            const cliente = await this.clienteRepository.findById(pedidos[i].cliente_id);
            if(!cliente) throw new ApplicationException("No existe ese cliente");

            pedidosReturn.push({
                ...pedidos[i],    
                cliente: {
                    nombre: cliente.nombre,
                    cedula: cliente.cedula
                }
            });
        }
        return pedidosReturn as [];
    }


    public async cantidadDePedidosPorClienteID(clienteId: number): Promise<number>{
        const existeCliente = await this.clienteRepository.findById(clienteId);
        if(!existeCliente) throw new ApplicationException("No existe ese cliente");

        const pedidos = await this.pedidoRepository.cantidadDePedidosPorClienteID(clienteId);
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");
        return pedidos;
    }
    
    public async getPedidosPorCliente(clienteId: number): Promise<Pedido[]>{
        const existeCliente = await this.clienteRepository.findById(clienteId);
        if(!existeCliente) throw new ApplicationException("No existe ese cliente");

        const pedidos = await this.pedidoRepository.getPedidosPorCliente(clienteId);
        if(!pedidos) throw new ApplicationException("No hay pedidos registrados");
        return pedidos;
    }

}
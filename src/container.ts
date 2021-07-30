import express = require('express');
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from 'awilix-express';


import { TestService } from "./services/test.service";
import { AdminService } from './services/admin.service';
import { PlazaService } from './services/plazas.service';
import { LocalidadService } from './services/localidad.service';
import { CategoriaService } from './services/categorias.service';
import { LocatarioService } from './services/locatarios.service';
import { ProductoService } from './services/productos.service';
import { ProductosLocatariosService } from './services/productosLocatarios.service';
import { ClienteService } from './services/clientes.service';
import { PedidoService } from './services/pedidos.service';
import { BalanceService } from './services/balance.service';
import { CalificacionService } from './services/calificacion.service';
import { PromocionService } from './services/promociones.service';
import { VentasProductosLocatariosService } from './services/ventasProductosLocatarios.service';
import { FavoritoService } from './services/favorito.service';
import { VentasCategoriasService } from './services/ventasCategorias.service';
import { BoletinesService } from './services/boletines.service';
import { VisitasLocatariosService } from './services/vistasLocatarios.service';


import { AdminPGRepository } from './services/repositories/implementation/pg/admin.imp';
import { PlazaPGRepository } from './services/repositories/implementation/pg/plaza.imp';
import { LocalidadPGRepository } from './services/repositories/implementation/pg/localidad.imp';
import { CategoriaPGRepository } from './services/repositories/implementation/pg/categoria.imp';
import { LocatarioPGRepository } from './services/repositories/implementation/pg/locatario.imp';
import { ProductosPGRepository } from './services/repositories/implementation/pg/productos.imp';
import { ProductosLocatariosPGRepository } from './services/repositories/implementation/pg/productosLocatarios.imp';
import { ClientePGRepository } from './services/repositories/implementation/pg/clientes.imp';
import { PedidoPGRepository } from './services/repositories/implementation/pg/pedidos.imp';
import { BalancePGRepository } from './services/repositories/implementation/pg/balance.imp';
import { CalificacionPGRepository } from './services/repositories/implementation/pg/calificaciones.imp';
import { PromocionesPGRepository } from './services/repositories/implementation/pg/promociones.imp';
import { VentasProductosLocatariosPGRepository } from './services/repositories/implementation/pg/ventasProductosLocatarios.imp';
import { FavoritosPGRepository } from './services/repositories/implementation/pg/favoritos.imp';
import { VentasCategoriasPGRepository } from './services/repositories/implementation/pg/ventasCategorias.imp';
import { BoletinesPGRepository } from './services/repositories/implementation/pg/boletines.imp';
import { VisitasLocatariosPGRepository } from './services/repositories/implementation/pg/visitasLocatarios.imp';



export default (app: express.Application): void => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        
        // Repositories
        adminRepository: asClass(AdminPGRepository).scoped(),
        plazaRepository: asClass(PlazaPGRepository).scoped(),
        localidadRepository: asClass(LocalidadPGRepository).scoped(),
        categoriaRepository: asClass(CategoriaPGRepository).scoped(),
        locatarioRepository: asClass(LocatarioPGRepository).scoped(),
        productoRepository: asClass(ProductosPGRepository).scoped(),
        productosLocatariosRepository: asClass(ProductosLocatariosPGRepository).scoped(),
        clienteRepository: asClass(ClientePGRepository).scoped(),
        pedidoRepository: asClass(PedidoPGRepository).scoped(),
        balanceRepository: asClass(BalancePGRepository).scoped(),
        calificacionRepository: asClass(CalificacionPGRepository).scoped(),
        promocionesRepository: asClass(PromocionesPGRepository).scoped(),
        ventasProductosLocatariosRepository: asClass(VentasProductosLocatariosPGRepository).scoped(),
        favoritoRepository: asClass(FavoritosPGRepository).scoped(),
        ventasCategoriasRepository: asClass(VentasCategoriasPGRepository).scoped(),
        boletinesRepository: asClass(BoletinesPGRepository).scoped(),
        visitasLocatariosRepository: asClass(VisitasLocatariosPGRepository).scoped(),
        
        // Services
        adminService: asClass(AdminService).scoped(),
        plazaService: asClass(PlazaService).scoped(),
        localidadService: asClass(LocalidadService).scoped(),
        categoriaService: asClass(CategoriaService).scoped(),
        locatarioService: asClass(LocatarioService).scoped(),
        productoService: asClass(ProductoService).scoped(),
        productosLocatariosService: asClass(ProductosLocatariosService).scoped(),
        clienteService: asClass(ClienteService).scoped(),
        pedidoService: asClass(PedidoService).scoped(),
        balanceService: asClass(BalanceService).scoped(),
        calificacionService: asClass(CalificacionService).scoped(),
        promocionService: asClass(PromocionService).scoped(),
        ventasProductosLocatariosService: asClass(VentasProductosLocatariosService).scoped(),
        favoritoService: asClass(FavoritoService).scoped(),
        ventasCategoriasService: asClass(VentasCategoriasService).scoped(),
        boletinesService: asClass(BoletinesService).scoped(),
        visitasLocatariosService: asClass(VisitasLocatariosService).scoped(),
        
        testService: asClass(TestService).scoped(),
    });

    
    app.use(scopePerRequest(container));
};
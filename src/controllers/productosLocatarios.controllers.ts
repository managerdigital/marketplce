import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { ProductosLocatariosService } from '../services/productosLocatarios.service';
import { ProductoService } from '../services/productos.service';

import { Productos } from '../services/repositories/domain/productos.domain';
import { CategoriaService } from '../services/categorias.service';

@route('/productosLocatarios')
export class productoLocatariosController extends BaseController{


    constructor(private readonly productosLocatariosService: ProductosLocatariosService,
                private readonly productoService: ProductoService,
                private readonly categoriaService: CategoriaService){
        super();
    }

    @route('/buscaPorID/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  

        try{
            const producto = await this.productosLocatariosService.findById(id);
            
            const productoGeneral = await this.productoService.findById(producto.producto_id);

            const arrayCategorias = productoGeneral.categorias_id;
            const categoriasReturn = [];
            for(let i = 0; i<arrayCategorias.length; i++){
                const categoria = await this.categoriaService.findById(arrayCategorias[i]);
                categoriasReturn.push(categoria.nombre);
            }

            delete producto.updated_at;
            delete producto.created_at;
            delete producto.descripcion;

            res.status(200).json({
                ok: true,
                producto: {
                    ...producto,
                    nombre: productoGeneral.nombre,
                    sku: productoGeneral.sku,
                    imagen_principal: productoGeneral.imagen_principal,
                    imagenes: [
                        productoGeneral.imagen_1,
                        productoGeneral.imagen_2
                    ]
                },
                categorias: categoriasReturn,
                visitas: this.getRandomArbitrary(1, 100),
                calificacion: this.getRandomArbitrary(3.5, 10),
                vendidos: this.getRandomArbitrary(0, 20)
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    private getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

       
    @route('/obtenerTodo')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{

        try {
            const productos = await this.productosLocatariosService.getAll();

            res.status(200).json({
                ok: true,
                productos
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorLocatarioID/:locatario_id')
    @GET()
    public async getByLocatarios(req: Request, res: Response): Promise<void>{

        try {
            const locatario_id = parseInt(req.params.locatario_id);  

            const productos = await this.productosLocatariosService.getByLocatarios(locatario_id);

            const productosReturn = [];
            for(let i = 0; i<productos.length; i++){
                const productoGeneral = await this.productoService.findById(productos[i].producto_id);
                
                delete productos[i].sku;
                delete productos[i].descripcion;
                delete productos[i].created_at;
                delete productos[i].updated_at;
                
                productosReturn.push({
                    ...productos[i],
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    imagenes: [
                        productoGeneral.imagen_1,
                        productoGeneral.imagen_2
                    ],
                    unidad: productoGeneral.unidad
                })
            }

            res.status(200).json({
                ok: true,
                productos: productosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorCategoriaIdLocatarioId/:categoriaId/:locatarioId')
    @GET()
    public async getByCategoriaIdYPlazaId(req: Request, res: Response): Promise<void>{

        try {
            const categoriaId = parseInt(req.params.categoriaId);  
            // const plazaId = parseInt(req.params.plazaId);  
            const locatarioId = parseInt(req.params.locatarioId);  

            const productos = await this.productosLocatariosService.getByCategoriaIdLocatarioId(categoriaId, locatarioId);

            const productosReturn = [];
            for(let i = 0; i<productos.length; i++){
                const productoGeneral = await this.productoService.findById(productos[i].producto_id);
                
                productosReturn.push({
                    id: productos[i].id,
                    producto_id: productos[i].producto_id,
                    stock: productos[i].stock,
                    en_promocion: productos[i].en_promocion,
                    precio: productos[i].precio,
                    precio_rebajado: productos[i].precio_rebajado,
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    imagenes: [
                        productoGeneral.imagen_1,
                        productoGeneral.imagen_2
                    ],
                    unidad: productoGeneral.unidad,
                    sku: productoGeneral.sku
                })
            }

            res.status(200).json({
                ok: true,
                productos: productosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorLocatarioIDCorto/:locatario_id')
    @GET()
    public async obtenerPorLocatarioID(req: Request, res: Response): Promise<void>{

        try {
            const locatario_id = parseInt(req.params.locatario_id);  
            const {desde, hasta} = req.body;

            const productos = await this.productosLocatariosService.getByLocatariosPaginado(locatario_id, hasta, desde);
            
            const productosReturn = [];
            for(let i = 0; i<productos.length; i++) {
                const productoGeneral: Productos = await this.productoService.findById(productos[i].producto_id);
                productosReturn.push({
                    id: productos[i].id,
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    stock: productos[i].stock,
                    precio: productos[i].precio,
                    precio_rebajado: productos[i].precio_rebajado
                });
            }

            res.status(200).json({
                ok: true,
               productos: productosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorPlazaIdEnPromocion/:plaza_id')
    @GET()
    public async getProductosByPlazaYEnPromocion(req: Request, res: Response): Promise<void>{

        try {
            const plaza_id = parseInt(req.params.plaza_id);  

            const productos = await this.productosLocatariosService.getProductosByPlazaYEnPromocion(plaza_id);

            const productosReturn = [];
            for(let i = 0; i<productos.length; i++){
                const productoGeneral = await this.productoService.findById(productos[i].producto_id);
                
                delete productos[i].sku;
                delete productos[i].descripcion;
                delete productos[i].created_at;
                delete productos[i].updated_at;
                
                productosReturn.push({
                    ...productos[i],
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    imagenes: [
                        productoGeneral.imagen_1,
                        productoGeneral.imagen_2
                    ],
                    unidad: productoGeneral.unidad
                })
            }

            res.status(200).json({
                ok: true,
                productos: productosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorLocataridIdEnPromocion/:id')
    @GET()
    public async getProductosByLocatarioIdEnPromocion(req: Request, res: Response): Promise<void>{

        try {
            const locatarioId = parseInt(req.params.id);  

            const productos = await this.productosLocatariosService.getProductosByLocatarioYEnPromocion(locatarioId);

            const productosReturn = [];
            for(let i = 0; i<productos.length; i++){
                const productoGeneral = await this.productoService.findById(productos[i].producto_id);
                
                delete productos[i].sku;
                delete productos[i].descripcion;
                delete productos[i].created_at;
                delete productos[i].updated_at;
                // delete productos[i];
                
                productosReturn.push({
                    ...productos[i],
                    nombre: productoGeneral.nombre,
                    imagen_principal: productoGeneral.imagen_principal,
                    imagenes: [
                        productoGeneral.imagen_1,
                        productoGeneral.imagen_2
                    ],
                    unidad: productoGeneral.unidad
                })
            }

            res.status(200).json({
                ok: true,
                productos: productosReturn
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }

    
    
}
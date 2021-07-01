import { Request, Response } from 'express';
import { route, POST, PUT, GET } from 'awilix-express';

import { BaseController } from '../common/controllers/base.controller';

import { ProductosLocatariosService } from '../services/productosLocatarios.service';
import { ProductoService } from '../services/productos.service';

import { ProductosLocatariosCreateDto, ProductosLocatariosUpdateDto } from '../dtos/productos.dto';
import { Productos } from '../services/repositories/domain/productos.domain';

@route('/productosLocatarios')
export class productoLocatariosController extends BaseController{


    constructor(private readonly productosLocatariosService: ProductosLocatariosService,
                private readonly productoService: ProductoService){
        super();
    }

    @route('/crear')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        
        const { 
                producto_id, 
                locatario_id,
                precio, 
                precio_rebajado, 
                unidad, 
                cantidad_unidad, 
                descripcion, 
                sku,
                en_promocion,
                stock
            } = req.body;


        try{
            const producto = await this.productosLocatariosService.store({
                producto_id,
                locatario_id,
                precio,
                precio_rebajado,
                unidad,
                cantidad_unidad,
                descripcion,
                sku,
                en_promocion,
                stock
            } as ProductosLocatariosCreateDto);

            res.status(200).json({
                ok: true,
                msg: 'Producto creado con exito',
                producto
            });

        } catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/update/:id')
    @PUT()
    public async update(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  

        const { 
            producto_id,
            locatario_id, 
            precio, 
            precio_rebajado, 
            unidad, 
            cantidad_unidad, 
            descripcion, 
            sku,
            en_promocion,
            stock
        } = req.body;
        
        try {
            await this.productosLocatariosService.update(id, {
                producto_id,
                locatario_id,
                precio,
                precio_rebajado,
                unidad,
                cantidad_unidad,
                descripcion,
                sku,
                en_promocion,
                stock
            } as ProductosLocatariosUpdateDto);

            res.status(200).json({
                ok: true,
                msg: "Producto actualizado con exito!"
            });
            
        } catch(error){
            this.handleException(error, res);
        }
        
    }



    
    @route('/delete/:id')
    @PUT()
    public async delete(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);
            
        try {
            await this.productosLocatariosService.delete(id);
            
            res.status(200).json({
                ok: true,
                msg: "Producto borrado con exito!"
            });

        } catch(error){
            this.handleException(error, res);
        }
    }



    @route('/buscaPorID/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);  

        try{
            const producto = await this.productosLocatariosService.findById(id);

            res.status(200).json({
                ok: true,
                producto
            });

        } catch(error) {
            this.handleException(error, res);
        }
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

            res.status(200).json({
                ok: true,
                productos
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


    
    
}
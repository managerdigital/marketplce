import { route, GET, DELETE, POST } from 'awilix-express';
import { Request, Response } from 'express';


import { BaseController } from '../common/controllers/base.controller';
import { FavoritoService } from '../services/favorito.service';
import { FavoritoCreateDto } from '../dtos/favorito.dto';
import { ProductosLocatariosService } from '../services/productosLocatarios.service';
import { ProductoService } from '../services/productos.service';



@route('/favoritos')
export class FavoritosController extends BaseController{

    constructor(private readonly favoritoService: FavoritoService,
                private readonly productoService: ProductoService,
                private readonly productosLocatariosService: ProductosLocatariosService){
        super();
    }
    
    @route('/guardar/:producto_locatario_id/:cliente_id')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
        try {
            const producto_locatario_id = parseInt(req.params.producto_locatario_id);
            const cliente_id = parseInt(req.params.cliente_id);

            await this.favoritoService.store({
                producto_locatario_id,
                cliente_id
            } as FavoritoCreateDto)

            res.status(200).json({
                ok: true,
                msg: 'Favorito creado'
            });
            
        }catch(error) {
            this.handleException(error, res);
        }
    }

    @route('/borrar/:id')
    @DELETE()
    public async delete(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id);

            await this.favoritoService.delete(id);

            res.status(200).json({
                ok: true,
                msg: 'Favorito borrado'
            });

        }catch(error) {
            this.handleException(error, res);
        }
    }


    @route('/obtenerPorCliente/:id')
    @GET()
    public async obtenerPorClienteId(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id);

            const productos = await this.favoritoService.getByCliente(id);


            const productosReturn = [];
            for(let i = 0; i<productos.length; i++){
                const productoGeneral = await this.productoService.findById(productos[i].producto_id);
                const productoLocatario = await this.productosLocatariosService.findById(productos[i].producto_locatario_id);
                
                delete productoLocatario.sku;
                delete productoLocatario.descripcion;
                delete productoLocatario.created_at;
                delete productoLocatario.updated_at;

                productosReturn.push({
                    ...productoLocatario,
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

        }catch(error) {
            this.handleException(error, res);
        }
    }
}
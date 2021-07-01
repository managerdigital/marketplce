// import fileUpload from 'express-fileupload';
import { Admin } from './domain/admin.domain';
import { Plaza } from './domain/plazas.domain';
import { Locatario } from './domain/locatario.domain';
import { Categoria } from './domain/categoria.domain';
import { Productos } from './domain/productos.domain';


export interface UploadsRepository {

    actualizarAdmin(tipo: string, admin: Admin | null,  nombreArchivo: any): Promise<boolean>;
    actualizarPlaza(tipo: string, plaza: Plaza | null,  nombreArchivo: any, tipoImg: string): Promise<boolean>;
    actualizarLocatario(tipo: string, locatario: Locatario | null,  nombreArchivo: string, tipoImg: string): Promise<boolean>;
    actualizarCategoria(tipo: string, categoria: Categoria | null,  nombreArchivo: string, tipoImg: string): Promise<boolean>;
    actualizarProducto(tipo: string, producto: Productos | null,  nombreArchivo: string, tipoImg: string): Promise<boolean>;

}
// import assert from 'assert';

// import { ProductoService } from './productos.service';

// import { ProductosMockRepository } from './repositories/implementation/mock/productos.repository';
// import { PlazaMockRepository } from './repositories/implementation/mock/plazas.repository';
// import { CategoriaMockRepository } from './repositories/implementation/mock/categoria.repository';

// import { ProductoCreateDto } from '../dtos/productos.dto';

// const productoService = new ProductoService(
//     new ProductosMockRepository(),
//     new CategoriaMockRepository(),
//     new PlazaMockRepository(),
// );

// describe('Producto.Service', () => {

//     describe('Store', () => {
//         it('should return producto', async () => {
//             return await productoService.store({
//                 categorias_id: [1],
//                 plazas_id: [2],
//                 nombre: 'Producto test 1',
//                 descripcion: 'plaza1@gmail.com',
//                 unidad: 'Libra',
//                 sku: 'asd23333',
//                 imagen_principal: '',
//                 imagen_1: 'asdads.jpg',
//                 imagen_2: 'asdsad.jpg',
//             } as ProductoCreateDto);
//         });
//         it('tries to register without name', async () => {
//             try {
//                 await productoService.store({
//                     categorias_id: [1],
//                     plazas_id: [],
//                     nombre: '',
//                     descripcion: 'Descripcion',
//                     unidad: 'Libra',
//                     sku: '',
//                     imagen_principal: '',
//                     imagen_1: '',
//                     imagen_2: '',
//                 } as ProductoCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'El nombre debe estar');
//             }
//         });
//         it('tries to register an unexisting category', async () => {
//             try {
//                 await productoService.store({
//                     categorias_id: [20],
//                     plazas_id: [],
//                     nombre: 'producto test 2',
//                     descripcion: 'Descripcion',
//                     unidad: 'Libra',
//                     sku: 'asd23344',
//                     imagen_principal: '',
//                     imagen_1: '',
//                     imagen_2: '',
//                 } as ProductoCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'No existe una de las categorias');
//             }
//         });

//         it('tries to register an unexisting plaza', async () => {
//             try {
//                 await productoService.store({
//                     nombre: 'producto test 40',
//                     categorias_id: [1],
//                     plazas_id: [30],
//                     descripcion: 'Descripcion',
//                     unidad: 'Libra',
//                     sku: 'asd23333455',
//                     imagen_principal: 'sdfsdf.jpg',
//                     imagen_1: 'asdads.jpg',
//                     imagen_2: 'asdsadss.jpg',
//                 } as ProductoCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'No existe una de las plazas');
//             }
//         });
//     });

//     describe('Find By Id', () => {
//         it('tries to find an unexisting product ', async () => {
//             try{
//                 await productoService.findById(20);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe ese producto');
//             }
//         });
//         it('should return the plaza', async () => {
//             return await productoService.findById(1);
//         });
//     });


//     describe('Update', () => {
//         it('tries to find an unexisting product ', async () => {
//             try{
//                 return await productoService.update(50, {
//                 categorias_id: [1],
//                 nombre: 'producto test 40',
//                 plazas_id: [30],
//                 descripcion: 'Descripcion',
//                 unidad: 'Libra',
//                 sku: 'asd23333455',
//                 imagen_principal: 'sdfsdf.jpg',
//                 imagen_1: 'asdads.jpg',
//                 imagen_2: 'asdsadss.jpg',
//             });
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe un producto con ese id');
//             }
//         });
//         it('shoud be fine', async () => {
 
//             return await productoService.update(1, {
//                 categorias_id: [1],
//                 nombre: 'producto test 40',
//                 plazas_id: [30],
//                 descripcion: 'Descripcion',
//                 unidad: 'Libra',
//                 sku: 'asd23333455',
//                 imagen_principal: 'sdfsdf.jpg',
//                 imagen_1: 'asdads.jpg',
//                 imagen_2: 'asdsadss.jpg',
//             });
 
//         });
//     });


//     describe('Delete', () => {
//         it('tries to find an unexisting product ', async () => {
//             try{
//                 return await productoService.delete(29);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe un producto con ese id');
//             }
//         });
//         it('should delete a product', async () => {
//             return await productoService.delete(1);
//         });
//     });


//     describe('Get All', () => {
//         it('should return an array of products', async () => {
//             return await productoService.getAll();
//         });
//     });
 
// });

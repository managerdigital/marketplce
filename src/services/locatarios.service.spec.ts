// import { LocatarioService } from './locatarios.service';

// import { LocatarioMockRepository } from './repositories/implementation/mock/locatarios.repository';
// import { PlazaMockRepository } from './repositories/implementation/mock/plazas.repository';
// import { ProductosLocatariosMockRepository } from './repositories/implementation/mock/productosLocatarios.repository';
// import { AdminMockRepository } from './repositories/implementation/mock/admin.repository';
// import { CategoriaMockRepository } from './repositories/implementation/mock/categoria.repository';
// import { LocatarioCreateDto, LocatarioUpdateDto } from '../dtos/locatario.dto';
// import assert from 'assert';


// const locatarioService = new LocatarioService(
//     new LocatarioMockRepository(),
//     new PlazaMockRepository(),
//     new CategoriaMockRepository(),
//     new AdminMockRepository(),
//     new ProductosLocatariosMockRepository(),
// );

// describe('Locatario.Service', () => {

//     describe('Store', () => {
//         it('should return Locatario', async () => {
//             return await locatarioService.store({
//                 admin_id: [1],
//                 plaza_id: 1,
//                 nombre_local: '',
//                 numero_local: [123, 456],
//                 categorias_id: [1],
//                 productos_locatarios_id: [1],
//                 nombre: '',
//                 apellido: '',
//                 cedula: 123345,
//                 img: '',
//                 logo: '',
//                 horarios: ['8am - 12pm 2pm - 6pm']
//             } as LocatarioCreateDto);
//         });
    
//         it('tries to register a locatario without admin_id', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 1233454,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un errorError: Admin y plaza son obligatorios');
//             }
//         });
    
//         it('tries to register a locatario without plaza_id', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [1],
//                     plaza_id: 0,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 12334544,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No encontrada esa plaza');
//             }
//         });
//         it('tries to register a category id that does not exist', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [1],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [100],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 123345442,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe una de las categorias');
//             }
//         });
//         it('tries to register an Admin id that does not exist', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [100],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 123345442,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe uno de los admins');
//             }
//         });
//         it('tries to register a Producto Locatario id that does not exist', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [1],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [100],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 3454432,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe uno de los productos');
//             }
//         });
//         it('tries to register a locatario email registered', async () => {
//             try{
//                 await locatarioService.store({
//                     admin_id: [1],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 3454432,
//                     email: 'local1@gmail.com',
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: Ya existe un local con ese email');
//             }
//         });
//     });


//     describe('Update', () => {
//         it('tries to find an unexisting locatario ', async () => {
//             try{
//                 await locatarioService.update(20, {
//                     admin_id: [1],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 3454432,
//                     email: '',
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioUpdateDto);

//             } catch(error: any){
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe una locatario con ese ID');
//             }
//         });
//         it('should be update', async () => {
       
//             return await locatarioService.update(1, {
//                 admin_id: [1],
//                 plaza_id: 1,
//                 nombre_local: '',
//                 numero_local: [123, 456],
//                 categorias_id: [1],
//                 productos_locatarios_id: [1],
//                 nombre: '',
//                 apellido: '',
//                 cedula: 3454432,
//                 email: '',
//                 img: '',
//                 logo: '',
//                 horarios: ['8am - 12pm 2pm - 6pm']
//             } as LocatarioUpdateDto);
//         });
//         it('tries to register a locatario without plaza_id', async () => {
//             try{
//                 await locatarioService.update(1, {
//                     admin_id: [1],
//                     plaza_id: 0,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 12334544,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioUpdateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No encontrada esa plaza');
//             }
//         });
//         it('tries to register a category id that does not exist', async () => {
//             try{
//                 await locatarioService.update(1, {
//                     admin_id: [1],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [100],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 123345442,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioUpdateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe una de las categorias');
//             }
//         });
//         it('tries to register an Admin id that does not exist', async () => {
//             try{
//                 await locatarioService.update(1, {
//                     admin_id: [100],
//                     plaza_id: 1,
//                     nombre_local: '',
//                     numero_local: [123, 456],
//                     categorias_id: [1],
//                     productos_locatarios_id: [1],
//                     nombre: '',
//                     apellido: '',
//                     cedula: 123345442,
//                     img: '',
//                     logo: '',
//                     horarios: ['8am - 12pm 2pm - 6pm']
//                 } as LocatarioUpdateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un error: Error: No existe uno de los admins');
//             }
//         });
//     });
   

    
//     describe('Find By Id', () => {
//         it('tries to find an unexisting plaza ', async () => {
//             try{
//                 await locatarioService.findById(20);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe ese locatario');
//             }
//         });
//         it('should return the locatario', async () => {
//             return await locatarioService.findById(1);
//         });
//     });


//     describe('Find By Cedula', () => {
//         it('tries to find an unexisting cedula ', async () => {
//             try{
//                 await locatarioService.findByCedula(2011);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe ese locatario');
//             }
//         });
//         it('should return an array of locatarios', async () => {
//             return await locatarioService.findByCedula(678123);
//         });
//     });

//     describe('Total Locatarios', () => {
//         it('should return total locatarios', async () => {
//             return await locatarioService.totalLocatarios();
//         });
//     });

// });
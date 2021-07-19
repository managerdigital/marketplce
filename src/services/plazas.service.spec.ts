// import assert from 'assert';

// import { PlazaMockRepository } from './repositories/implementation/mock/plazas.repository';
// import { AdminMockRepository } from './repositories/implementation/mock/admin.repository';
// import { CategoriaMockRepository } from './repositories/implementation/mock/categoria.repository';
// import { LocalidadMockRepository } from './repositories/implementation/mock/localidad.repository';

// import { PlazaService } from './plazas.service';
// import { PlazaCreateDto, PlazaUpdateDto } from '../dtos/plazas.dto';

// const plazaService = new PlazaService(
//     new PlazaMockRepository(),
//     new AdminMockRepository(),
//     new LocalidadMockRepository(),
//     new CategoriaMockRepository()
// );

// describe('Plaza.Service', () => {

//     describe('Store', () => {
//         it('should return plaza', async () => {
//             return await plazaService.store({
//                 admin_id: [1],
//                 localidad_id: 1,
//                 categorias_id: [1, 2],
//                 nombre: 'xxx',
//                 direccion: 'plaza1@gmail.com',
//                 email: '',
//                 telefonos: [123123],
//                 horarios: ['8am - 12pm 2pm - 6pm'],
//                 img: '',
//                 logo: ''
//             } as PlazaCreateDto);
//         });

//         it('tries to register a plaza without name', async () => {
//             try{
//                 await plazaService.store({
//                     admin_id: [1],
//                     localidad_id: 1,
//                     categorias_id: [1, 2],
//                     nombre: '',
//                     direccion: 'plaza1@gmail.com',
//                     email: '',
//                     telefonos: [123123],
//                     horarios: ['8am - 12pm 2pm - 6pm'],
//                     img: '',
//                     logo: ''
//                 } as PlazaCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un errorError: El nombre es necesario');
//             }
//         });

//         it('tries to register a plaza registered', async () => {
//             try{
//                 await plazaService.store({
//                     admin_id: [1],
//                     localidad_id: 1,
//                     categorias_id: [1, 2],
//                     nombre: 'plaza 1',
//                     direccion: 'plaza1@gmail.com',
//                     email: '',
//                     telefonos: [123123],
//                     horarios: ['8am - 12pm 2pm - 6pm'],
//                     img: '',
//                     logo: ''
//                 } as PlazaCreateDto);
//             } catch(error: any) {
//                 assert.strictEqual(error.message, 'Hubo un errorError: Existe otra plaza con ese nombre');
//             }
//         });
//     });


    
//     describe('Update', () => {
//         it('tries to find an unexisting plaza ', async () => {
//             try{
//                 return await plazaService.update(20, {
//                     admin_id: [1],
//                     localidad_id: 1,
//                     categorias_id: [1, 2],
//                     nombre: 'plaza 1',
//                     direccion: 'plaza1@gmail.com',
//                     email: '',
//                     telefonos: [123123],
//                     horarios: ['8am - 12pm 2pm - 6pm'],
//                     img: '',
//                     logo: ''
//                 } as PlazaUpdateDto);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'Hubo un errorError: No existe una plaza con ese ID');
//             }
//         });
//         it('should be update', async () => {
       
//             await plazaService.update(1, {
//                 admin_id: [1],
//                 localidad_id: 1,
//                 categorias_id: [1, 2],
//                 nombre: 'plaza 1',
//                 direccion: 'plaza1@gmail.com',
//                 email: '',
//                 telefonos: [123123],
//                 horarios: ['8am - 12pm 2pm - 6pm'],
//                 img: '',
//                 logo: ''
//             } as PlazaUpdateDto);
//         });
//     });


 

//     describe('Find By Id', () => {
//         it('tries to find an unexisting plaza ', async () => {
//             try{
//                 await plazaService.findById(20);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No hay plaza registradas');
//             }
//         });
//         it('should return the plaza', async () => {
//             return await plazaService.findById(1);
//         });
//     });


//     describe('Find By Name', () => {
//         it('tries to find an unexisting plaza ', async () => {
//             try{
//                 await plazaService.findByName('sss');
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No hay plaza registradas');
//             }
//         });
//         it('should return the plaza', async () => {
//             return await plazaService.findByName('plaza 1');
//         });
//     });


//     describe('Delete', () => {
//         it('tries to find an unexisting plaza ', async () => {
//             try{
//                 return await plazaService.delete(29);
//             } catch(error: any){
//                 assert.strictEqual(error.message, 'No existe una plaza con ese ID');
//             }
//         });
//         it('should delete a plaza', async () => {
//             return await plazaService.delete(1);
//         });
//     });
 

// });



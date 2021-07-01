import assert from 'assert';
import { AdminCreateDto, AdminUpdateDto } from '../dtos/admin.dto';

import { AdminService } from './admin.service';
import { AdminMockRepository } from './repositories/implementation/mock/admin.imp';


const adminService = new AdminService(
    new AdminMockRepository()
);

describe('Admin.Service', () => {

    describe('Store', () => {
        it('should return the new user', async () => {
            return await adminService.store({
                email: 'test@test.com',
                password: '123',
                nombre: 'Daniel',
                apellido: 'Rubiano',
                telefono: 3123213,
                cedula: 12312,
                rol: 'SUPER_ADMIN'
            } as AdminCreateDto);
        });
        it('tries to register a registered email', async () => {
            try{
                await adminService.store({
                    email: 'dcrubiano01@gmail.com',
                    password: '123',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error){
                assert.strictEqual(error.message, 'Ya existe ese correo en el sistema');
            }
        });
    });

    describe('Update', () => {
        it('tries to find an unexisting admin ', async () => {
            try{
                return await adminService.update(20, {
                    email: 'test@test.com',
                    password: '123',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminUpdateDto);
            } catch(error) {
                assert.strictEqual(error.message, 'Admin no encontrado');
            }
        });
    });

});
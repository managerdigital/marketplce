import assert from 'assert';
import { AdminCreateDto, AdminUpdateDto } from '../dtos/admin.dto';

import { AdminService } from './admin.service';
import { AdminMockRepository } from './repositories/implementation/mock/admin.repository';


const adminService = new AdminService(
    new AdminMockRepository()
);

describe('Admin.Service', () => {

    describe('Store', () => {
        it('should return the new admin', async () => {
            await adminService.store({
                email: 'test@test.com',
                password: '123456',
                nombre: 'Daniel',
                apellido: 'Rubiano',
                telefono: 3123213,
                cedula: 12312,
                rol: 'SUPER_ADMIN'
            } as AdminCreateDto);
        });
        it('tries to register an admin without a password', async () => {
            try {
                await adminService.store({
                    email: 'test@test.com',
                    // password: '123',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'El password es necesario');
            }
        });
        it('tries to register a too short password', async () => {
            try {
                await adminService.store({
                    email: 'test2@test.com',
                    password: '123',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'La contraseña es muy corta');
            }
        });
        it('tries to register a registered email', async () => {
            try{
                await adminService.store({
                    email: 'dcrubiano01@gmail.com',
                    password: '123456',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Ya existe ese correo en el sistema');
            }
        });
        it('tries to register this < in password', async () => {
            try{
                await adminService.store({
                    email: 'dcrubiano01@gmail.com',
                    password: '123456<',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Ya existe ese correo en el sistema');
            }
        });
        it('tries to register this > in password', async () => {
            try{
                await adminService.store({
                    email: 'dcrubiano01@gmail.com',
                    password: '123456>',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Ya existe ese correo en el sistema');
            }
        });
        it('tries to register doble quotes in password', async () => {
            try{
                await adminService.store({
                    email: 'dcrubiano01@gmail.com',
                    password: '123456"',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminCreateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Ya existe ese correo en el sistema');
            }
        });
    });

    describe('Update', () => {
        it('tries to find an unexisting admin ', async () => {
            try{
                await adminService.update(20, {
                    email: 'test@test.com',
                    password: '123',
                    nombre: 'Daniel',
                    apellido: 'Rubiano',
                    telefono: 3123213,
                    cedula: 12312,
                    rol: 'SUPER_ADMIN'
                } as AdminUpdateDto);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Hubo un errorError: Admin no encontrado');
            }
        });
        it('should update', async () => {
            await adminService.update(1, {
                email: 'test@test.com',
                password: '123',
                nombre: 'Daniel',
                apellido: 'Rubiano',
                telefono: 3123213,
                cedula: 12312,
                rol: 'SUPER_ADMIN'
            } as AdminUpdateDto);
        });
    });


    describe('Find By Id', () => {
        it('tries to find an unexisting admin ', async () => {
            try{
                await adminService.findById(20);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Hubo un errorError: No existe un admin con ese id');
            }
        });
        it('should return the user admin', async () => {
            return await adminService.findById(1);
        });
    });

    describe('Find By Cedula', () => {
        it('tries to find an unexisting admin ', async () => {
            try{
                await adminService.findByCedula(20);
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Hubo un errorError: No existe un admin con esa cedula');
            }
        });
        it('should return the user admin', async () => {
            return await adminService.findById(1);
        });
    });

    describe('Change password', () => {
        it('tries to change the password without email, oldPassword or newPassword', async () => {
            try{
                return await adminService.changePassword(20, '', '', '');
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'El email, la contraseña antigua y la nueva son requeridos');
            }
        });

        it('tries to change the password but the email does not exists', async () => {
            try{
                return await adminService.changePassword(20, 'test01@gmail.com', '123456', '456321');
            } catch(error) {
                const { message } = error as {message: string};
                assert.strictEqual(message, 'Hubo un errorError: No existe');
            }
        });

    });

});
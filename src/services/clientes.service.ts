import bcrypt from "bcryptjs";
import path=require('path');
import XLSX=require("xlsx");

import { ApplicationException } from '../common/exceptions/application.exception';

import { ClientePGRepository } from './repositories/implementation/pg/clientes.imp';
import { Cliente } from './repositories/domain/clientes.domain';
import { ClienteCreateDto, ClienteUpdatedDto } from '../dtos/clientes.dto';


export class ClienteService {

    constructor(private readonly clienteRepository: ClientePGRepository) {}

    
    public async store(entry: ClienteCreateDto): Promise<Cliente | null>{
        const existeCliente = await this.clienteRepository.findByEmail(entry.email);
        if(existeCliente) throw new ApplicationException("Cliente con ese email ya existe");
        
        if(!entry.password) throw new Error("Hubo un error en el servidor");
        await this.validaciones(entry.password);
        if(entry.password.length < 6) throw new ApplicationException("La contraseña es muy corta");

        if(entry.nombre) await this.validaciones(entry.nombre);
        if(entry.direccion) await this.validaciones(entry.direccion);

        // Encriptar contraseña
        entry.password = await this.encriptarContraseña(entry.password);
        
        const cliente = await this.clienteRepository.store({
            email: entry.email,
            password: entry.password,
            nombre: entry.nombre || null,
            direccion: entry.direccion || null,
            telefono: entry.telefono || null,
            cedula: entry.cedula || null,
            img: entry.img || null
        } as Cliente);
        
        if(!cliente) throw new ApplicationException("Cliente no pudo ser creado");

        delete cliente.password;
        delete cliente.token_reset;
        
        return cliente;
    }

    private async validaciones(cadena: string): Promise<void>{
        if(cadena.indexOf("<") > 0) throw new ApplicationException("No se permiten <");
        if(cadena.indexOf(">") > 0) throw new ApplicationException("No se permiten <");
        if(cadena.indexOf("'") > 0) throw new ApplicationException("No se permiten <");
        if(cadena.indexOf('"') > 0) throw new ApplicationException("No se permiten >");
    }
    
    
    private async encriptarContraseña(password: string): Promise<string>{
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }


    public async update(id: number, entry: ClienteUpdatedDto): Promise<Cliente | null>{
        const originalEntry = await this.clienteRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("Cliente no existe");

        originalEntry.nombre = entry.nombre || originalEntry.nombre;
        originalEntry.telefono = entry.telefono || originalEntry.telefono;
        originalEntry.cedula = entry.cedula || originalEntry.cedula;
        originalEntry.direccion = entry.direccion || originalEntry.direccion;
        originalEntry.email = entry.email || originalEntry.email;
        originalEntry.img = entry.img || originalEntry.img;

        const cliente = await this.clienteRepository.update(id, originalEntry as Cliente);
        
        if(!cliente) throw new ApplicationException("Ocurrio un error");
        
        delete cliente.password;
        delete cliente.token_reset;
        
        return cliente;
    }


    public async delete(id: number): Promise<void>{
        const existeCliente = await this.clienteRepository.findById(id);
        if(!existeCliente) throw new ApplicationException("Cliente no existe");
        return await this.clienteRepository.delete(id);
    }


    public async find(id: number): Promise<Cliente | null>{
        const cliente = await this.clienteRepository.findById(id);
        if(!cliente) throw new ApplicationException("Cliente no existe");
        delete cliente.token_reset;
        delete cliente.password;
        return cliente;
    }


    public async getAll(): Promise<Cliente[] | null>{
        const clientes = await this.clienteRepository.getAll();
        if(!clientes) throw new ApplicationException("No hay clientes regitrados");
        return clientes.map((cliente: Cliente) => {
            delete cliente.password;
            return cliente;
        });
    }


    async generateXLSX(): Promise<void> {
        const clientes = await this.clienteRepository.getAll();

        if(!clientes) throw new ApplicationException("No hay clientes regitrados");

        const data = clientes.map((cliente: Cliente) => {
            return [
                cliente.nombre, 
                cliente.telefono, 
                cliente.direccion, 
                cliente.email, 
                cliente.created_at
            ];
        });
      
        this.exportExcel(data);
    }


    private async exportExcel(clientes: any[]): Promise<void> {
        const workSheetColumnNames: any = ['Nombre', 'Telefono', 'Dirección', 'Email', 'Created_at'];

        const workBook = XLSX.utils.book_new();
        const workSheetData = [
            workSheetColumnNames,
            ...clientes
        ];
        console.log('CLIENTES');
        console.log(workSheetData);
        const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
        XLSX.utils.book_append_sheet(workBook, workSheet, 'CLIENTES');
        XLSX.writeFile(workBook, path.resolve(path.join(__dirname, `../../uploads/XLSX/clientes_regitrados.xlsx`)));
    }
    

}
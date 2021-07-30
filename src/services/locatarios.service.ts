import { v4 as uuidv4 } from 'uuid';
import path=require('path');
import XLSX=require("xlsx");
import fs = require('fs');
import bcrypt from "bcryptjs";

import { ApplicationException } from "../common/exceptions/application.exception";

import { LocatarioCreateDto, LocatarioUpdateDto } from "../dtos/locatario.dto";
import { PlazaCreateDto } from '../dtos/plazas.dto';
import { AdminCreateDto } from '../dtos/admin.dto';

import { Locatario } from './repositories/domain/locatario.domain';
import { Plaza } from './repositories/domain/plazas.domain';
import { Admin } from './repositories/domain/admin.domain';

import { CategoriaPGRepository } from "./repositories/implementation/pg/categoria.imp";
import { LocatarioPGRepository } from "./repositories/implementation/pg/locatario.imp";
import { PlazaPGRepository } from "./repositories/implementation/pg/plaza.imp";
import { AdminPGRepository } from './repositories/implementation/pg/admin.imp';
import { ProductosLocatariosPGRepository } from './repositories/implementation/pg/productosLocatarios.imp';


export class LocatarioService{


    constructor(private readonly locatarioRepository: LocatarioPGRepository,
                private readonly plazaRepository: PlazaPGRepository,
                private readonly categoriaRepository: CategoriaPGRepository,
                private readonly adminRepository: AdminPGRepository,
                private readonly productosLocatariosRepository: ProductosLocatariosPGRepository) {}


    private async buscarSiExistenCategorias(categorias_id: number[]): Promise<boolean>{
        for(const key in categorias_id){
            const existeCategoria = await this.categoriaRepository.findById(categorias_id[key]);
            if(!existeCategoria) return false;
        }
        return true;
    }
                

    public async ponerPlazaInfo(local: Locatario): Promise<Plaza | null>{
        const plaza = await this.plazaRepository.findById(local.plaza_id);
        
        if(!plaza) return null;
        
        return plaza;
    }


    public async getAll(offset: number): Promise<Locatario[] | null> {
        const locatarios = await this.locatarioRepository.getAll(offset);
        if(!locatarios) throw new ApplicationException("No hay locatarios");
        return locatarios as Locatario[];
    }


    public async totalLocatarios(): Promise<number>{
        const total = await this.locatarioRepository.totalLocatarios();
        if(!total) throw new ApplicationException("No hay locatarios");
        return total as number;
    }

    public async store(entry: LocatarioCreateDto): Promise<Locatario>{
        try{
            if (!(entry.admin_id || entry.plaza_id)) throw new ApplicationException("Admin y plaza son obligatorios");

            const plaza = await this.plazaRepository.findById(entry.plaza_id);
            if(!plaza) throw new ApplicationException("No encontrada esa plaza");
            
            if(entry.categorias_id){
                const existenCategorias =await this.buscarSiExistenCategorias(entry.categorias_id);
                if(!existenCategorias) throw new ApplicationException("No existe una de las categorias");
            }
            
            const adminId: [] = entry.admin_id as [];
            
            for(const key in adminId){
                const existeAdmin = await this.adminRepository.findById(adminId[key]);
                if(!existeAdmin) throw new ApplicationException("No existe uno de los admins");
            }

            const productosLocatariosId: [] = entry.productos_locatarios_id as [];
            
            if(entry.productos_locatarios_id){
                for(const key in productosLocatariosId){
                    const existeProductoLocal = await this.productosLocatariosRepository.findById(productosLocatariosId[key]);
                    if(!existeProductoLocal) throw new ApplicationException("No existe uno de los productos");
                }   
            }

            if(entry.email){
                const existeLocatarioEmail = await this.locatarioRepository.findByEmail(entry.email);   
                if(existeLocatarioEmail) throw new ApplicationException("Ya existe un local con ese email");
            }


            // if(entry.cedula){
            //     const existeLocatarioCedula = await this.locatarioRepository.findByCedula(entry.cedula);  
            //     if(existeLocatarioCedula) throw new ApplicationException("Ya existe un local con esa cédula");
            // }
            
            const locatario = await this.locatarioRepository.store({
               admin_id: entry.admin_id,
               plaza_id: entry.plaza_id,
               categorias_id: entry.categorias_id || null,
               productos_locatarios_id: entry.productos_locatarios_id || null,
               nombre_local: entry.nombre_local || null,
               numero_local: entry.numero_local || null,   
               nombre: entry.nombre || null,
               apellido: entry.apellido || null,
               cedula: entry.cedula || null,
               telefono: entry.telefonos || null,
               horarios: entry.horarios || null,
               img: entry.img || null,
               logo: entry.logo || null
            } as LocatarioCreateDto);
            
            if(!locatario) throw new ApplicationException("Hubo un error");
            return locatario;
            
        } catch(error){
            throw new ApplicationException("Hubo un error: " + error);
        }
    }


    public async update(id: number, entry: LocatarioUpdateDto): Promise<void>{

        try{
            const originalEntry = await this.locatarioRepository.findById(id);

            if(!originalEntry) throw new ApplicationException("No existe una locatario con ese ID");

            if(entry.plaza_id) {
                const plaza = await this.plazaRepository.findById(entry.plaza_id);
                if(!plaza) throw new ApplicationException("No encontrada esa plaza");
            }

            if(entry.categorias_id){
                const existenCategorias =await this.buscarSiExistenCategorias(entry.categorias_id);
                if(!existenCategorias) throw new ApplicationException("No existe una de las categorias");
            }

            const adminId: [] = entry.admin_id as [];
        
            for(const key in adminId){
                const existeAdmin = await this.adminRepository.findById(adminId[key]);

                if(!existeAdmin) throw new ApplicationException("No existe uno de los admins");
            }
             
            originalEntry.admin_id = entry.admin_id || originalEntry.admin_id;
            originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
            originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
            originalEntry.productos_locatarios_id = entry.productos_locatarios_id || originalEntry.productos_locatarios_id;
            originalEntry.nombre_local = entry.nombre_local || originalEntry.nombre_local;
            originalEntry.numero_local = entry.numero_local || originalEntry.numero_local;
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.apellido = entry.apellido || originalEntry.apellido;
            originalEntry.cedula = entry.cedula || originalEntry.cedula;
            originalEntry.email = entry.email || originalEntry.email;
            originalEntry.telefonos = entry.telefonos || originalEntry.telefonos;
            originalEntry.horarios = entry.horarios || originalEntry.horarios;
            originalEntry.img = entry.img || originalEntry.img;
            originalEntry.logo = entry.logo || originalEntry.logo;
            
            return await this.locatarioRepository.update(id, originalEntry as LocatarioUpdateDto);

        } catch(error) {
            throw new ApplicationException("Hubo un error: " + error);
        }
    }


    async findById(id: number): Promise<Locatario> {
        const locatario = await this.locatarioRepository.findById(id);
        if(!locatario) throw new ApplicationException("No existe ese locatario");
        return locatario;
    }


    async findByCedula(cedula: number): Promise<Locatario[]> {
        const locatario = await this.locatarioRepository.findByCedula(cedula) as Locatario[];
        if(!locatario) throw new ApplicationException("No existe ese locatario");
        return locatario;
    }


    async findByNumeroDeLocalYPlazaId(numeroLocal: number, plazaId: number): Promise<Locatario> {
        if(!numeroLocal) throw new ApplicationException("El numero del local es necesario");
        if(!plazaId) throw new ApplicationException("El numero del local es necesario");

        const locatario = await this.locatarioRepository.findPorNumeroLocalPlazaId(numeroLocal, plazaId);
        if(!locatario) throw new ApplicationException("No existe ese locatario");
        return locatario;
    }



    public async delete(id: number): Promise<void>{
        const existeLocatario = await this.locatarioRepository.findById(id);
        if(!existeLocatario) throw new ApplicationException("No existe un local con ese ID");
        await this.locatarioRepository.delete(id);
    }



    
    public async getTotalLocatariosDePlaza(): Promise<[] | null> {
        const locatariosTotal = await this.locatarioRepository.getTotalLocatariosDePlaza();
        if(!locatariosTotal) throw new ApplicationException("No hay ningun locatario para esa plaza");
        return locatariosTotal;
    }




    private async creaFolders(tipo: string) {
        // Verifico si existen los folders uploads y uploads/${tipo}
        if (!fs.existsSync(path.resolve(`uploads`))) {
            fs.mkdir('uploads', (err: any) => {
                throw new ApplicationException("Error al crear carpeta");
            });
        }
        if (!fs.existsSync(path.resolve(`uploads/${tipo}`))) {
            fs.mkdir(`uploads/${ tipo }`, err => {
                if (err) {
                    throw new ApplicationException("Error al crear carpeta");
                }
            });
        }
    }


    public async convert2Excel(file: any, adminId: number): Promise<void>{
        // Generar nombre del archivo
        const nombreCortado = file.name.split('.'); // el archivo puede ser nombre.1.1.jpg
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    
        const extensionesValidas = ['xlsx'];
    
        if (!extensionesValidas.includes(extensionArchivo)) throw new ApplicationException("La extensión del archivo no es valida");

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
        
        // Path para guardar archivo
        await this.creaFolders('XLSX');

        const path = `./uploads/XLSX/${nombreArchivo}`;
    
        await file.mv(path);

        const excel = XLSX.readFile(path);

        // SheetNames nos retorna un array
        const nombreHoja = excel.SheetNames;

        // NOTE: Recorre todas las hojas del excell
        for(let i = 0; i<nombreHoja.length; i++){

            const json = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[i]]);
            // const nombreHojaCapFirst = await this.capitalize(nombreHoja[i]);
            const existePlaza = await this.plazaRepository.findByName(nombreHoja[i]);
            
            if(!existePlaza){
                const plaza = await this.plazaRepository.store({
                    admin_id: [adminId],
                    categorias_id: [],
                    nombre: nombreHoja[i],
                    direccion: '',
                    telefonos: [],
                    email: '',
                } as PlazaCreateDto);

                if(!plaza) return;
                
                await this.creaLocatarios(json, plaza.id, plaza, nombreHoja);
    
            } else {
                await this.creaLocatarios(json, existePlaza.id, existePlaza, nombreHoja);
            }
        }

    }



    private async creaLocatarios(json: any, plazaId: any, plaza: any, nombreHoja: any): Promise<any>{

        for (let i = 0; i < json.length; i++) {
            const dato: any = json[i] as any;

            // Note: Paso a numero cuando viene más de un numero en el campo. Porque viene string. Al venir solo el numero viene number.
            // NÚMERO DE LOCAL
            dato['NUMERO DEL LOCAL'] = await this.verificaNumeroLocal(dato['NUMERO DEL LOCAL']);

            // TELEFONOS
            dato['TELEFONOS DE DOMICILIOS'] = await this.verificaTelefono(dato['TELEFONOS DE DOMICILIOS']);

            // if(!dato['Numero de cédula']) return;
            const numerosDeLocal = dato['NUMERO DEL LOCAL'] as [];
            const existeLocatario = [];
            for(const i in numerosDeLocal){
                const existe = await this.locatarioRepository.findPorNumeroLocalPlazaId(numerosDeLocal[i], plazaId);
                if(existe) {
                    existeLocatario.push(existe);
                }
            }

            if(!existeLocatario.length) {           
                await this.locatarioRepository.store({
                    admin_id: plaza['admin_id'],
                    plaza_id: plazaId,
                    nombre_local: dato['NOMBRE DEL LOCAL'],
                    numero_local: dato['NUMERO DEL LOCAL'],
                    // categorias_id: categoriasLocatario,
                    productos_locatarios_id: [],
                    cedula: dato['NUMERO DE CEDULA'],
                    nombre: dato['NOMBRE DEL COMERCIANTE'],
                    telefonos: dato['TELEFONOS DE DOMICILIOS'],
                    apellido: '',
                    horarios: []
                } as LocatarioCreateDto);
                
                // Encripta contraseña
                const salt = bcrypt.genSaltSync();
                const newPassword = `CC${dato['NUMERO DE CEDULA']}`;
                const contraseñaCifrada = bcrypt.hashSync(newPassword, salt);
                // console.log(contraseñaCifrada);

                const existeAdminLocatario = await this.adminRepository.findByCedula(dato['NUMERO DE CEDULA']);
                
                if(!existeAdminLocatario && dato['NUMERO DE CEDULA']){
                    await this.adminRepository.store({
                        email: dato['NUMERO DE CEDULA'],
                        password: contraseñaCifrada,
                        nombre: dato['NOMBRE DEL COMERCIANTE'],
                        apellido: '',
                        telefono: dato['TELEFONOS DE DOMICILIOS'][0],
                        cedula: dato['NUMERO DE CEDULA'],
                        rol: 'ADMIN_LOCATARIO'
                    } as AdminCreateDto);
                }
            } 
            else {
                
                await this.locatarioRepository.update(existeLocatario[0].id, { 
                    admin_id:  plaza['admin_id'] || existeLocatario[0].admin_id,
                    plaza_id: plazaId,
                    nombre_local: dato['NOMBRE DEL LOCAL'] || existeLocatario[0].nombre_local,
                    numero_local: dato['NUMERO DEL LOCAL'] || existeLocatario[0].numero_local,
                    // categorias_id: existeLocatario.categorias.concat(categoriasLocatario),
                    productos_locatarios_id : existeLocatario[0].productos_locatarios_id  || [],
                    cedula: dato['NUMERO DE CEDULA'] || existeLocatario[0].cedula,
                    nombre: dato['NOMBRE DEL COMERCIANTE'] || existeLocatario[0].nombre,
                    telefonos: dato['TELEFONOS DE DOMICILIOS'] || existeLocatario[0].telefonos,
                    apellido: existeLocatario[0].apellido || '',
                    horarios: existeLocatario[0].horarios || []
                } as LocatarioUpdateDto);
               
                // Encripta contraseña
                const salt = bcrypt.genSaltSync();
                const newPassword = `CC${dato['NUMERO DE CEDULA']}`;
                const contraseñaCifrada = bcrypt.hashSync(newPassword, salt);

                const existeAdminLocatario = await this.adminRepository.findByCedula(dato['NUMERO DE CEDULA']);

                if(existeAdminLocatario && dato['NUMERO DE CEDULA']) {
                    await this.adminRepository.update({
                        email: dato['NUMERO DE CEDULA'],
                        password: contraseñaCifrada,
                        nombre: dato['NOMBRE DEL COMERCIANTE'],
                        apellido: '',
                        telefono: dato['TELEFONOS DE DOMICILIOS'][0],
                        cedula: dato['NUMERO DE CEDULA'],
                        rol: 'ADMIN_LOCATARIO'
                    } as Admin);   
                }

            }
        }
    }    


    private async verificaNumeroLocal(noLocal: any): Promise<[]>{
        if(typeof noLocal === 'string' || noLocal instanceof String){
            noLocal = await this.str2Num(noLocal.split('-'));
        } else if ( typeof noLocal === 'number' || noLocal instanceof Number ){
            noLocal = [noLocal];
        } else {
            noLocal = [];
        }
        return noLocal;
    }


    
    private async verificaTelefono(telefono: any): Promise<[]>{
        if(typeof telefono === 'string' || telefono instanceof String){
            telefono = await this.str2Num(telefono.split('-'));
        } else if(typeof telefono === 'number' || telefono instanceof Number){
            telefono = [telefono];
        } else {
            telefono = [];
        }
        return telefono;
    }

    
    
    private async str2Num(arrayNoLocal: any): Promise<any>{
        const returnArr =  await arrayNoLocal.map((noLocal: string) => {
            return parseInt(noLocal);
        });
        return returnArr;
    }


    async getLocatariosPorPlazaYCategoria(plazaId: number, categoriaId: number): Promise<Locatario[] >{
        const plazaExiste = await this.plazaRepository.findById(plazaId);
        if(!plazaExiste) throw new ApplicationException("No existe una plaza con ese ID");
        
        const locatarios = await this.locatarioRepository.getLocatariosPorPlazaYCategoria(plazaId, categoriaId);
        if(!locatarios) throw new ApplicationException("No existen locatarios");
        return locatarios;
    }

    public async buscadorPorPlazaIdYCategoriaId(plazaId: number, categoriaId: number, texto: string): Promise<Locatario[]>{
        const plazaExiste = await this.plazaRepository.findById(plazaId);
        if(!plazaExiste) throw new ApplicationException("No existe una plaza con ese ID");
        
        
        const locatarios = await this.locatarioRepository.buscadorPorPlazaIdYCategoriaId(plazaId, categoriaId, texto);
        if(!locatarios) throw new ApplicationException("No existen locatarios");
        return locatarios;
    }

    
    async getLocatariosPorPlaza(plazaId: number): Promise<Locatario[] >{
        const plazaExiste = await this.plazaRepository.findById(plazaId);
        if(!plazaExiste) throw new ApplicationException("No existe una plaza con ese ID");
        
        const locatarios = await this.locatarioRepository.getLocatariosPorPlaza(plazaId);
        if(!locatarios) throw new ApplicationException("No existen locatarios");
        return locatarios;
    }

    async getquinceLocatariosPorPlaza(plazaId: number): Promise<Locatario[] >{
        const plazaExiste = await this.plazaRepository.findById(plazaId);
        if(!plazaExiste) throw new ApplicationException("No existe una plaza con ese ID");
        
        const locatarios = await this.locatarioRepository.getquinceLocatariosPorPlaza(plazaId);
        if(!locatarios) throw new ApplicationException("No existen locatarios");
        return locatarios;
    }

    
    async getLocatariosPorPlazaPaginado(plazaId: number, locatarioId: number, limite: number): Promise<Locatario[] >{
        const plazaExiste = await this.plazaRepository.findById(plazaId);
        if(!plazaExiste) throw new ApplicationException("No existe una plaza con ese ID");
        
        if(!locatarioId) {
            const locatarios = await this.locatarioRepository.getLocatariosPorPlazaPaginadoHelper(plazaId, limite);
            if(!locatarios) throw new ApplicationException("No existen locatarios");
            return locatarios;
        }

        const locatarios = await this.locatarioRepository.getLocatariosPorPlazaPaginado(plazaId, locatarioId, limite);
        if(!locatarios) throw new ApplicationException("No existen locatarios");
        return locatarios;
    }

}

import { ApplicationException } from '../common/exceptions/application.exception';

import { Plaza } from './repositories/domain/plazas.domain';
import { Categoria } from './repositories/domain/categoria.domain';

import { PlazaCreateDto, PlazaUpdateDto } from '../dtos/plazas.dto';

import { AdminPGRepository } from './repositories/implementation/pg/admin.imp';
import { LocalidadPGRepository } from './repositories/implementation/pg/localidad.imp';
import { CategoriaPGRepository } from './repositories/implementation/pg/categoria.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';



export class PlazaService{

    constructor(private readonly plazaRepository: PlazaPGRepository,
                private readonly adminRepository: AdminPGRepository,    
                private readonly localidadRepository: LocalidadPGRepository,    
                private readonly categoriaRepository: CategoriaPGRepository    
                ) {}


    private async verificaIds(entry: PlazaCreateDto | PlazaUpdateDto): Promise<void>{
        if(entry.localidad_id){
            const localidad = await this.localidadRepository.findById(entry.localidad_id);
            if(!localidad) throw new ApplicationException("No encontrada esa localidad");       
        }
        
        // Verifica que las categorias ingresadas son validas
        if(entry.categorias_id){
            for(const key in entry.categorias_id){
                const existeCategoria = await this.categoriaRepository.findById(entry.categorias_id[key]);
                if(!existeCategoria) throw new ApplicationException("No existe una de las categorias");
            }
        }
        
        const adminId: [] = entry.admin_id as [];
        for(const key in adminId){
            const existeAdmin = await this.adminRepository.findById(adminId[key]);
            if(!existeAdmin) throw new ApplicationException("No existe uno de los admins");
        }
    }


    public async store(entry: PlazaCreateDto): Promise<Plaza>{
        try{
            // if (!(entry.nombre)) throw new ApplicationException("El nombre es necesario");
            const plazaExiste = await this.plazaRepository.findByName(entry.nombre);            
            if(plazaExiste) throw new ApplicationException("Existe otra plaza con ese nombre");
            
            await this.verificaIds(entry);
            
            const plaza = await this.plazaRepository.store({
                admin_id: entry.admin_id || null,
                localidad_id: entry.localidad_id || null,
                categorias_id: entry.categorias_id || null,
                nombre: entry.nombre,
                direccion: entry.direccion || ' ',
                email: entry.email || null,
                telefonos: entry.telefonos || null,
                horarios: entry.horarios || null,
                img: entry.img || null,
                logo: entry.logo || null
            } as Plaza);
            if(!plaza) throw new ApplicationException("Hubo un error");
            return plaza;
            
        } catch(error){
            throw new ApplicationException("Hubo un error" + error);
        }
    }


    public async update(id: number, entry: PlazaUpdateDto): Promise<void>{

        try{
            const originalEntry = await this.plazaRepository.findById(id);
            if(!originalEntry) throw new ApplicationException("No existe una plaza con ese ID");
            
            await this.verificaIds(entry);
            
            originalEntry.admin_id = entry.admin_id || originalEntry.admin_id;
            originalEntry.localidad_id = entry.localidad_id || originalEntry.localidad_id;
            originalEntry.categorias_id = entry.categorias_id || originalEntry.categorias_id;
            originalEntry.nombre = entry.nombre || originalEntry.nombre;
            originalEntry.direccion = entry.direccion || originalEntry.direccion;
            originalEntry.telefonos = entry.telefonos || originalEntry.telefonos;
            originalEntry.horarios = entry.horarios || originalEntry.horarios;
            originalEntry.email = entry.email || originalEntry.email;
            originalEntry.img = entry.img || originalEntry.img;
            originalEntry.logo = entry.logo || originalEntry.logo;

            return await this.plazaRepository.update(id, originalEntry as Plaza);
            
        } catch(error) {
            throw new ApplicationException("Hubo un error" + error);
        }
    }



    public async getAll(): Promise<Plaza[]>{
        const plazas = await this.plazaRepository.getAll(); 
        if(!plazas) throw new ApplicationException("No hay plazas registradas");
        return plazas;       
    }
 

    public async findCategoryByPlazaID(id: number): Promise<Categoria[]>{
        const plaza = await this.plazaRepository.findById(id);
        if(!plaza) throw new ApplicationException("No hay plaza registradas");
        
        if(!plaza.categorias_id) throw new ApplicationException("No existen categorias para esa plaza");
        
        const categorias = plaza.categorias_id;
        const categoriasReturn = [];
        for(let i=0; i<categorias.length; i++) {
            const entry = await this.categoriaRepository.findById(categorias[i]);
            if(!entry) throw new ApplicationException("No existe una de las categorias");
            categoriasReturn.push({
                id: entry.id,
                nombre: entry.nombre
            });
        }
        return categoriasReturn as Categoria[];
    }


    public async findById(id: number): Promise<Plaza>{
        const plaza = await this.plazaRepository.findById(id);
        if(!plaza) throw new ApplicationException("No hay plaza registradas");
        return plaza;
    }


    public async findByName(name: string): Promise<Plaza>{
        const plaza = await this.plazaRepository.findByName(name);
        if(!plaza) throw new ApplicationException("No hay plaza registradas");
        return plaza;
    }


    public async findByLocalidad(localidad_id: number): Promise<Plaza>{
        const plaza = await this.plazaRepository.findByLocalidad(localidad_id);
        if(!plaza) throw new ApplicationException("No hay plaza registradas");
        return plaza;
    }


    public async delete(id: number): Promise<void>{
        const existe = await this.plazaRepository.findById(id);
        if(!existe) throw new ApplicationException("No existe una plaza con ese ID");
        await this.plazaRepository.delete(id);
    }
    
}
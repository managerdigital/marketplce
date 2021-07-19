import { Localidad } from './repositories/domain/localidades.domain';
import { LocalidadPGRepository } from './repositories/implementation/pg/localidad.imp';
import { ApplicationException } from '../common/exceptions/application.exception';



export class LocalidadService {
    
    constructor(private readonly localidadRepository: LocalidadPGRepository) {}


    async find(id: number, nombre = ''): Promise<Localidad | null>{
        if(nombre) return await this.localidadRepository.findByName(nombre);
        return await this.localidadRepository.findById(id);
    }

    async findById(id: number): Promise<Localidad>{
       const localidad = await this.localidadRepository.findById(id);
        if(!localidad) throw new ApplicationException("No hay localidad con ese id");
        return localidad as Localidad;
    }

    async findByName(nombre: string): Promise<Localidad>{
        const localidad = await this.localidadRepository.findByName(nombre);
        if(!localidad) throw new ApplicationException("No hay localidad con ese id");
        return localidad as Localidad;
    }

    async getAll(): Promise<Localidad[]>{
        const localidades = await this.localidadRepository.getAll();
        if(!localidades) throw new ApplicationException("No hay localidades");
        return localidades as Localidad[];
    }    


    async store(nombre: string): Promise<void> {
        return await this.localidadRepository.store(nombre);
    }

}
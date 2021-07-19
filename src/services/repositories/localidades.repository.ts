import { Localidad } from "./domain/localidades.domain";



export interface LocalidadRepository {
    store(nombre: string): Promise<void>;
    update(entry: Localidad): Promise<void>;
    findById(id: number): Promise<Localidad | null>;
    findByName(nombre: string): Promise<Localidad | null>
    getAll(): Promise<Localidad[] | null>;
} 

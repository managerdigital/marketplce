import { Localidad } from "./domain/localidades.domain";



export interface LocalidadRepository {
    // store(entry: LocalidadCreateDto): Promise<void>;
    update(entry: Localidad): Promise<void>;
    find(id: number, nombre: string): Promise<Localidad | null>;
    getAll(): Promise<Localidad[] | null>;
    store(nombre: string): Promise<void>;
} 

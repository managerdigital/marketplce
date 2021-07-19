import { LocatarioCreateDto, LocatarioUpdateDto } from '../../dtos/locatario.dto';
import { Locatario } from "./domain/locatario.domain";



export interface LocatarioRepository { 
    store(entry: LocatarioCreateDto): Promise<Locatario | null>;
    update(id: number, entry: LocatarioUpdateDto): Promise<void>;
    delete(id: number): Promise<void>;
    // find(id: number, buscarPor: string): Promise<Locatario | null>;
    findById(id: number): Promise<Locatario | null>;
    findByEmail(email:string): Promise<Locatario | null>;
    findByCedula(cedula: number): Promise<Locatario[] | null>;
    findPorNumeroLocalPlazaId(noLocal: number, plazaId: number): Promise<Locatario | null>;
    getAll(offset: number): Promise<Locatario[] | null>;
    getTotalLocatariosDePlaza():Promise<[] | null>;
}
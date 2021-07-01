import { AdminCreateDto } from '../../dtos/admin.dto';
import { Admin } from './domain/admin.domain';


export interface AdminRepository { 
    store(entry: AdminCreateDto): Promise<Admin | null>;
    update(entry: Admin): Promise<void>;
    findById(id: number): Promise<Admin | null>;
    findByEmail(email: string): Promise<Admin | null>;
    findByCedula(cedula: number): Promise<Admin | null>;
    getAll(): Promise<Admin[] | null>;
    remove(id: number): Promise<void>;
    changePassword(entry: Admin): Promise<void>;
}
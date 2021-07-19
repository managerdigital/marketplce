import { VentasProductosLocatariosCreateDto } from "../../dtos/ventasProductosLocatarios.dto";
import { VentasProductosLocatarios } from './domain/ventasProductoLocatarios.domain';

export interface VentasProductosLocatariosRepository { 
    store(entry: VentasProductosLocatariosCreateDto): Promise<VentasProductosLocatarios | null>;
    // update(id: number, entry: VentasProductosLocatarios): Promise<void>;
    // delete(id: number): Promise<void>;
    findById(id: number): Promise<VentasProductosLocatarios | null>;
    findByPlazaId(plazaiId: number): Promise<VentasProductosLocatarios | null>;
    findByProductoLocatarioId(productoLocatarioId: number): Promise<VentasProductosLocatarios | null>;
    getAll(): Promise<VentasProductosLocatarios[] | null>;
    getMasVendidos(): Promise<[] | null>;
}
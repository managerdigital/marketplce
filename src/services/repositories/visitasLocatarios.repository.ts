import { VisitasLocatarios } from './domain/visitasLocatarios.domain';

export interface VisitasLocatariosRepository { 
    store(entry: VisitasLocatarios): Promise<void>;
}
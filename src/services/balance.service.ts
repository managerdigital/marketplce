import { BalancePGRepository } from './repositories/implementation/pg/balance.imp';
import { Balance } from './repositories/domain/balance.domain';
import { ApplicationException } from '../common/exceptions/application.exception';
import { BalanceUpdateDto, BalanceCreateDto } from '../dtos/balance.dto';




export class BalanceService {
    
    constructor(private readonly balanceRepository: BalancePGRepository) {}


    async store(entry: BalanceCreateDto): Promise<Balance> {
        const balance = await this.balanceRepository.store(entry);
        if(!balance) throw new ApplicationException("Hubo un error");
        
        return balance as Balance;
    }

    async update(id: number, entry: BalanceUpdateDto): Promise<void>{
        const originalEntry = await this.balanceRepository.findById(id);
        if(!originalEntry) throw new ApplicationException("No existen categorias en el sistema");
     
        originalEntry.total = entry.total || originalEntry.total;
        originalEntry.plaza_id = entry.plaza_id || originalEntry.plaza_id;
        originalEntry.locatorio_id = entry.locatorio_id || originalEntry.locatorio_id;
        originalEntry.cliente_id = entry.cliente_id || originalEntry.cliente_id;

        return await this.balanceRepository.update(originalEntry, id);
    }

    async findById(id: number): Promise<Balance> {
        const balance = await this.balanceRepository.findById(id);
        if(!balance) throw new ApplicationException("Ya existe esa balance");
        return balance as Balance;
    }


    async findByPlazaId(id: number): Promise<Balance> {
        const balance = await this.balanceRepository.findByPlazaId(id);
        if(!balance) throw new ApplicationException("Ya existe esa balance");
        return balance as Balance;
    }


    async findByLocatarioId(id: number): Promise<Balance> {
        const balance = await this.balanceRepository.findByLocatarioId(id);
        if(!balance) throw new ApplicationException("Ya existe esa balance");
        return balance as Balance;
    }

    
    async findByClienteId(id: number): Promise<Balance> {
        const balance = await this.balanceRepository.findByClienteId(id);
        if(!balance) throw new ApplicationException("Ya existe esa balance");
        return balance as Balance;
    }


    async getAll(): Promise<Balance[]> {
        const balance = await this.balanceRepository.getAll();
        if(!balance) throw new ApplicationException("No existe balances");
        return balance as Balance[];
    }


    async getGananciasPorLocatarioID(locatarioID: number): Promise<{sum: number}> {
        const ganancia = await this.balanceRepository.getGananciasPorLocatarioID(locatarioID);
        if(!ganancia) throw new ApplicationException("No existe ganacias para ese locatario");
        return ganancia;
    }



    async getGananciasTotales(): Promise<{sum: number}> {
        const ganancia = await this.balanceRepository.getGananciasTotales();
        if(!ganancia) throw new ApplicationException("No existe ganacias para ese locatario");
        return ganancia;
    }

}
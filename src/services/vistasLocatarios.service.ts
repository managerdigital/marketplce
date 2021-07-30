import { VisitasLocatariosCreateDto } from '../dtos/visitasLocatarios.dto';
import { VisitasLocatariosPGRepository } from './repositories/implementation/pg/visitasLocatarios.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';
import { ApplicationException } from '../common/exceptions/application.exception';
import { VisitasLocatarios } from './repositories/domain/visitasLocatarios.domain';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';

export class VisitasLocatariosService {

    constructor(private readonly visitasLocatariosRepository: VisitasLocatariosPGRepository,
                private readonly locatarioRepository: LocatarioPGRepository,
                private readonly plazaRepository: PlazaPGRepository) {}

    async store(entry: VisitasLocatariosCreateDto): Promise<void> {
        const locatario = await this.locatarioRepository.findById(entry.locatario_id);
        if(!locatario) throw new ApplicationException('Hubo un problema con ese Locatario');

        await this.visitasLocatariosRepository.store({
            locatario_id: entry.locatario_id,
            plaza_id: locatario.plaza_id
        } as VisitasLocatarios)
    }


    async masVisitadosByPlazaId(plazaId: number): Promise<{cantidad: number, locatario_id: number}[]> {
        const plaza = await this.plazaRepository.findById(plazaId);
        if(!plaza) throw new ApplicationException('Hubo un problema con ese Locatario');

        const locatariosMasVisitados = await this.visitasLocatariosRepository.masVisitadosByPlazaId(plazaId);
        if(!locatariosMasVisitados) throw new ApplicationException('No hay locatarios visitados en esa plaza');
        return locatariosMasVisitados
    }

}
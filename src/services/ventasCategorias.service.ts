import { ApplicationException } from '../common/exceptions/application.exception';

import { VentasCategoriasPGRepository } from './repositories/implementation/pg/ventasCategorias.imp';
import { VentasCategoriaCreateDtoController, VentasCategoriaCreateDto } from '../dtos/ventasCategorias.dto';
import { CategoriaPGRepository } from './repositories/implementation/pg/categoria.imp';
import { LocatarioPGRepository } from './repositories/implementation/pg/locatario.imp';
import { PlazaPGRepository } from './repositories/implementation/pg/plaza.imp';


export class VentasCategoriasService {

    constructor(private readonly ventasCategoriasRepository: VentasCategoriasPGRepository,
                private readonly locatarioRepository: LocatarioPGRepository,
                private readonly categoriaRepository: CategoriaPGRepository,
                private readonly plazaRepository: PlazaPGRepository) {}

    public async store(entry: VentasCategoriaCreateDtoController): Promise<void>{
        
        const locatario = await this.locatarioRepository.findById(entry.locatario_id);
        if(!locatario) throw new ApplicationException('No existe el locatario');
        
        
        for (let i = 0; i < entry.categoria_id.length; i++) {
            const categoria = await this.categoriaRepository.findById(entry.categoria_id[i]);
            if(!categoria) throw new ApplicationException('No existe la categoria');
            
            await this.ventasCategoriasRepository.store({
                plaza_id: locatario.plaza_id,
                locatario_id: entry.locatario_id,
                categoria_id: entry.categoria_id[i]
            } as VentasCategoriaCreateDto)
        }
    }


    async findByLocatario(id: number): Promise<{cantidad: number, categoria_id: number}[]> {
        const locatario = await this.locatarioRepository.findById(id);
        if(!locatario) throw new ApplicationException('No existe ese locatario');
        
        const categorias = await this.ventasCategoriasRepository.findByLocatario(id);
        if(!categorias) throw new ApplicationException('No hay categorias');
        return categorias
    }


    async findByPlazas(id: number): Promise<{cantidad: number, categoria_id: number}[]> {
        const plaza = await this.plazaRepository.findById(id);
        if(!plaza) throw new ApplicationException('No existe esa plaza');
        
        const categorias = await this.ventasCategoriasRepository.findByPlazas(id);
        if(!categorias) throw new ApplicationException('No hay categorias');
        return categorias
    }
}

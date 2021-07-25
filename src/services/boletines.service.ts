import { BoletinesPGRepository } from './repositories/implementation/pg/boletines.imp';
import { ApplicationException } from '../common/exceptions/application.exception';

export class BoletinesService {

    constructor(private readonly boletinesRepository: BoletinesPGRepository) {}

    async store(email: string): Promise<void> {
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (!emailRegex.test(email)) throw new ApplicationException('El correo no es valido');

        await this.boletinesRepository.store(email);
    }

}
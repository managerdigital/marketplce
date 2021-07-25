import { pool } from '../../../../common/persistence/pg.persistence';


export class BoletinesPGRepository {

    async store(email: string): Promise<void> {
        const now = new Date();

        await pool.query(
             "INSERT INTO boletines(email, created_at, updated_at) VALUES($1, $2, $3) RETURNING id",
             [
                email,
                now, 
                now
            ]
        );
    }

}
import { Response } from 'express';


export abstract class BaseController {

    handleException(err: any, res: Response): void {
        // console.log('ENTRA AL HANDLEXCEPTION');
        // console.log(err instanceof ApplicationException);
        if (err.message) {
            // console.log('entra al IF del handleException');
            res.status(400).json({
                ok: false,
                error: err.message
            });
        } else {
            // console.log('NO ENTRA AL IF del handleException');
            throw new Error(err);
        }
    }
}
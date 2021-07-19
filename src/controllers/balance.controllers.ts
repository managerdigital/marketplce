import { Request, Response } from 'express';
import { GET, POST, route } from "awilix-express";

import { BaseController } from "../common/controllers/base.controller";

import { BalanceService } from '../services/balance.service';

import { Balance } from '../services/repositories/domain/balance.domain';
import { BalanceCreateDto } from '../dtos/balance.dto';


@route('/balances')
export class balanceController extends BaseController{

    constructor(private readonly balanceService: BalanceService){
        super();
    }

    

    @route('/store')
    @POST()
    public async store(req: Request, res: Response): Promise<void>{
 
        const { 
           total,
           plaza_id,
           locatario_id,
           cliente_id
       } = req.body;

       try {
           const balance = await this.balanceService.store({
            total,
            plaza_id,
            locatario_id,
            cliente_id
           } as BalanceCreateDto);
           
           res.status(200).json({
               ok: true,
               msg: "Balance creado exitosamente!",
               balance
           });
           
       } catch(error) {
           this.handleException(error, res);
       }   
    }


    @route('/update/:id')
    @POST()
    public async update(req: Request, res: Response): Promise<void>{
 
    //     const { 
    //        total,
    //        plaza_id,
    //        locatario_id,
    //        cliente_id,
    //        estado
    //    } = req.body;

    //    const id = parseInt(req.params.id);

       try {
        //    const balance = await this.balanceService.update(id, {
        //     total,
        //     plaza_id,
        //     locatario_id,
        //     cliente_id,
        //     estado
        //    } as BalanceUpdateDto);
           
           res.status(200).json({
               ok: true,
               msg: "Balance creado exitosamente!",
            //    balance
           });
           
       } catch(error) {
           this.handleException(error, res);
       }   
    }


    @route('/getAll')
    @GET()
    public async getAll(req: Request, res: Response): Promise<void>{
        try{
            const balances = await this.balanceService.getAll() as Balance[];
    
            res.status(200).json({
                ok: true,
                balances
            });    
        } catch(error) {
            this.handleException(error, res); 
        }
    }


    @route('/getGananciasPorLocatarioID/:id')
    @GET()
    public async getGananciasPorLocatarioID(req: Request, res: Response): Promise<void>{
        try{
            const locatarioId = parseInt(req.params.id);

            const ganancias = await this.balanceService.getGananciasPorLocatarioID(locatarioId);
    
            res.status(200).json({
                ok: true,
                ganancias: ganancias.sum
            }); 

        } catch(error) {
            this.handleException(error, res); 
        }
    }



    @route('/getGananciasTotales')
    @GET()
    public async getGananciasTotales(req: Request, res: Response): Promise<void>{
        try{

            const ganancias = await this.balanceService.getGananciasTotales();
    
            res.status(200).json({
                ok: true,
                ganancias: ganancias.sum
            }); 

        } catch(error) {
            this.handleException(error, res); 
        }
    }

}
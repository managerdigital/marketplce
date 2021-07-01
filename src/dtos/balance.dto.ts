
export interface BalanceCreateDto{
    total?: number,
    plaza_id?: number,
    locatorio_id?: number,
    cliente_id?: number
}


export interface BalanceUpdateDto{
    total?: number,
    plaza_id?: number,
    locatorio_id: number,
    cliente_id?: number,
    estado?: number
}
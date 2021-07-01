export interface CategoriaCreateDto{
    nombre: string,
    descripcion?: string,
    icono?: string,
    slug?: string
}


export interface CategoriaUpdateDto{
    nombre: string,
    descripcion?: string,
    id?: number,
    icono?: string,
    slug?: string
}
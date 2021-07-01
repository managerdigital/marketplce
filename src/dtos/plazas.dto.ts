export interface PlazaCreateDto {
    admin_id: number[];
    localidad_id?: number;
    categorias_id: number[];
    nombre: string;
    direccion: string;
    email?: string;
    telefonos: number[],
    horarios?: string[],
    img?: string | null,
    logo?: string | null,
}

export interface PlazaUpdateDto {
    admin_id: number[];
    localidad_id: number;
    categorias_id: number[];
    nombre: string;
    direccion: string;
    email?: string;
    telefonos: number[],
    horarios?: string[],
    activo?: boolean,
    img?: string | null,
    logo?: string | null
}




// export interface PlazaTestDto {
//     admin_id: number;
//     categorias_nombres: string[];
//     localidad_nombre: string;
//     nombre: string;
//     direccion: string;
//     email?: string;
//     telefonos: number[],
//     horarios?: string[]
// }
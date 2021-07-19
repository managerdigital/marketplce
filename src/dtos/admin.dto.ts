interface AdminUpdateDto{
    email: string;
    password: string;
    nombre?: string;
    apellido?: string;
    telefono?: number;
    cedula?: number;
    rol?: string;
    img?: string | null
}

interface AdminCreateDto {
    email: string;
    password?: string;
    nombre?: string;
    apellido?: string;
    telefono?: number;
    cedula?: number;
    rol?: string;
    img?: string
}

export {
    AdminUpdateDto,
    AdminCreateDto
};
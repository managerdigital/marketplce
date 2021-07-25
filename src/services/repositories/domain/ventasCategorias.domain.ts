export interface VentasCatgorias  {
    id: number,
    plaza_id: number,
    locatario_id: number,
    categoria_id: number,
    created_at?: Date,
    updated_at?: Date,
}

// id SERIAL PRIMARY KEY,
//     plaza_id INT DEFAULT NULL REFERENCES plazas(id) ON UPDATE CASCADE ON DELETE SET NULL,
//     locatario_id INT DEFAULT NULL REFERENCES locatarios(id) ON UPDATE CASCADE ON DELETE SET NULL,
//     categoria_id INT DEFAULT NULL REFERENCES categorias(id) ON UPDATE CASCADE ON DELETE SET NULL,
//     created_at DATE DEFAULT NULL,
//     updated_at DATE DEFAULT NULL
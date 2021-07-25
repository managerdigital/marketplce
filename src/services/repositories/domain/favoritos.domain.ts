// CREATE TABLE favoritos(
//     id SERIAL PRIMARY KEY,
//     cliente_id INT DEFAULT NULL REFERENCES clientes(id) ON UPDATE CASCADE ON DELETE SET NULL,
//     producto_locatario_id INT DEFAULT NULL REFERENCES productos_locatarios(id) ON UPDATE CASCADE ON DELETE SET NULL,
//     created_at DATE DEFAULT NULL,
//     updated_at DATE DEFAULT NULL
// );
export interface Favorito{
    id: number;
    cliente_id: number;
    producto_locatario_id: number;
    producto_id: number;
    created_at: Date | null;
    updated_at: Date | null;  
}

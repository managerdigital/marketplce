// Se mockea la base de datos
// simulando las tablas que pertenecen a ella
const db = {
    admins: [{
        id: 1,
        email: 'dcrubiano01@gmail.com',
        password: '123',
        nombre: 'Daniel',
        apellido: 'Rubiano',
        telefono: 3104859956,
        cedula: 1136885117,
    },
    {
        id: 2,
        email: 'test1@gmail.com',
        password: '123',
        nombre: 'test1',
        apellido: 'test1',
        telefono: 3104859956,
        cedula: 1136885117,
    },{
        id: 3,
        email: 'test2@gmail.com',
        password: '123',
        nombre: 'test2',
        apellido: 'test2',
        telefono: 3104859956,
        cedula: 1136885117,
    }],
    categorias: [],
    localidades: [],
    locatarios: [],
    plazas: [],
    productos: [],
    _admnisId: 0,
    _categoriasId: 0,
    _localidadesId: 0,
    _locatariosId: 0,
    _plazasId: 0,
    _productorId: 0
};

db._admnisId = db.admins.length;

export default db;
// Note: Se mockea la base de datos
// simulando las tablas que pertenecen a ella
// Note: Los ids (_calificacionesId, _admnisId) pertenece a cada una de la entidades creadas
const db = {
    admins: [{
        id: 1,
        email: 'test1@gmail.com',
        password: '123456',
        nombre: 'Daniel',
        apellido: 'Rubiano',
        telefono: 31020202020,
        cedula: 1111111111,
        img: '',
        rol: '',
        activo: true,
        token_reset: null
    },
    {
        id: 2,
        email: 'test2@gmail.com',
        password: '123456',
        nombre: 'test1',
        apellido: 'test1',
        telefono: 31020202021,
        cedula: 1111111123,
        img: '',
        rol: '',
        activo: true,
        token_reset: null
    },{
        id: 3,
        email: 'test3@gmail.com',
        password: '123456',
        nombre: 'test2',
        apellido: 'test2',
        telefono: 31020202022,
        cedula: 1111111145,
        img: '',
        rol: '',
        activo: true,
        token_reset: null
    }],
    localidades: [
        {
            id: 1,
            nombre: 'Bosa'
        },
        {
            id: 2,
            nombre: 'Fontibón'
        },
        {
            id: 3,
            nombre: 'Kennedy'
        }
    ],
    plazas: [
        {
            id: 1,
            admin_id: [1],
            localidad_id: 1,
            categorias_id: [1],
            nombre: 'plaza 1',
            direccion: '',
            telefonos: [1123123],
            email: '',
            img: '',
            logo: '',
            horarios: '',
            activo: true
        },
        {
            id: 2,
            admin_id: [1, 3],
            localidad_id: 2,
            categorias_id: [2],
            nombre: 'plaza 2',
            direccion: '',
            telefonos: [1123123],
            email: '',
            img: '',
            logo: '',
            horarios: [''],
            activo: true
        },
        {
            id: 3,
            admin_id: [3],
            localidad_id: 2,
            categorias_id: [2],
            nombre: 'plaza 3',
            direccion: '',
            telefonos: [1123123],
            email: '',
            img: '',
            logo: '',
            horarios: [''],
            activo: true
        },
    ],
    categorias: [
        {
            id: 1,
            nombre: 'Artesanías',
            descripcion: '',
            icono: '',
            slug: ''
        },
        {
            id: 2,
            nombre: 'Frutas',
            icono: '',
            descripcion: '',
            slug: ''
        },
        {
            id: 3,
            nombre: 'Verduras',
            icono: '',
            descripcion: '',
            slug: ''
        },
    ],
    locatarios: [
        {
            id: 1,
            admin_id: [1],
            plaza_id: 1,
            categorias_id: [1],
            productos_locatarios_id: [1, 2],
            nombre_local: '',
            numero_local: [123456],
            nombre: '',
            apellido: '',
            cedula: 12345,
            email: 'local1@gmail.com',
            telefonos: [1123],
            horarios: [''],
            img: '',
            logo: '',
            activo: true
        },
        {
            id: 2,
            admin_id: [1],
            plaza_id: 1,
            categorias_id: [1],
            productos_locatarios_id: [1, 2],
            nombre_local: '',
            numero_local: [123456],
            nombre: '',
            apellido: '',
            cedula: 678123,
            email: 'local2@gmail.com',
            telefonos: [1123],
            horarios: [''],
            img: '',
            logo: '',
            activo: true
        },
        {
            id: 3,
            admin_id: [1],
            plaza_id: 1,
            categorias_id: [1],
            productos_locatarios_id: [1, 2],
            nombre_local: '',
            numero_local: [123456],
            nombre: '',
            apellido: '',
            cedula: 456123,
            email: 'local2@gmail.com',
            telefonos: [1123],
            horarios: [''],
            img: '',
            logo: '',
            activo: true
        }
    ],
    productos: [
        {
            id: 1,
            categorias_id: [1, 2],
            plazas_id: [1, 2],
            nombre: 'producto 1',
            descripcion: '',
            unidad: '',
            sku: '',
            imagen_principal: '',
            imagen_1: '',
            imagen_2: '',
            activo: true
        },
        {
            id: 2,
            categorias_id: [1],
            plazas_id: [1],
            nombre: 'producto 2',
            descripcion: '',
            unidad: '',
            sku: '',
            imagen_principal: '',
            imagen_1: '',
            imagen_2: '',
            activo: true
        },
    ],
    productos_locatarios: [
        {
            id: 1,
            producto_id: 1,
            locatario_id: 2,
            stock: true,
            en_promocion: false,
            precio: 12000,
            precio_rebajado: 0,
            descripcion: '',
            sku: '',
            activo: true
        },
        {
            id: 2,
            producto_id: 2,
            locatario_id: 2,
            stock: true,
            en_promocion: false,
            precio: 8000,
            precio_rebajado: 0,
            descripcion: '',
            sku: '',
            activo: true
        },
        {
            id: 1,
            producto_id: 1,
            locatario_id: 2,
            stock: true,
            en_promocion: false,
            unidad: '',
            cantidad_unidad: 5,
            precio: 12000,
            precio_rebajado: 0,
            descripcion: '',
            sku: '',
            activo: true
        },
    ],
    clientes: [],
    pedidos: [],
    balances: [],
    calificaciones: [],
    _admnisId: 0,
    _localidadesId: 0,
    _plazasId: 0,
    _categoriasId: 0,
    _locatariosId: 0,
    _productosId: 0,
    _productosLocatariosId: 0,
    _clientesId: 0,
    _pedidosId: 0,
    _balancesId: 0,
    _calificacionesId: 0
};

db._admnisId = db.admins.length;
db._localidadesId = db.localidades.length;
db._plazasId = db.plazas.length;
db._categoriasId = db.categorias.length;
db._locatariosId = db.locatarios.length;
db._productosId = db.productos.length;
db._productosLocatariosId = db.productos_locatarios.length;
db._clientesId = db.clientes.length;
db._pedidosId = db.pedidos.length;
db._balancesId = db.balances.length;
db._calificacionesId = db.calificaciones.length;

export default db;
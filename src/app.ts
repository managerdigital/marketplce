process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// Env Files
import dotenv = require('dotenv');

process.env.NODE_ENV = 'production';
process.env.APP_ENV = 'production';

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

console.log('NODE_ENV: ', process.env.NODE_ENV);
console.log('APP_ENV: ', process.env.APP_ENV);
// ====================================================================================================

import express = require('express');
import cors = require('cors');

import { loadControllers } from 'awilix-express';
import expressFileUpload = require('express-fileupload');
// import jwt = require('express-jwt');


import  loadContainer from './container';


const app: express.Application = express();


// Settings
app.set('port', process.env.PORT || 4000);


// Configurar CORS
app.use(cors());

// JSON Support
app.use(express.json());

// Este middleware me da acceso a los files
app.use(expressFileUpload());
// app.use(express.urlencoded({extended: true}));


// Container
loadContainer(app);


// Uploads controllers
// app.use(loadControllers(
//     'controllers/uimagenReturn.controlers.ts',
//     {cwd: __dirname}
// ));


// JWT
// Se adjunta una propiedad en cada Request user req.user
// bearer token 
// if(process.env.jwt_secret_key) {
//     app.use(jwt({ 
//         secret: process.env.jwt_secret_key,
//         algorithms: ['HS256']
//     })
//     .unless({path: 
//         [
//             '/', 
//             '/check',  
//             '/admins/renewToken', 
//             '/admins/registerAdmin', 
//             '/locatarios/descargaPlantilla', 
//             '/clientes/downladXLSX', 
//             '/pedidos/downladXLSX',
//             // '/admins/renewToken'
//         ]
//     }));
// }


// Controllers
app.use(loadControllers(
    'controllers/*.ts',
    {cwd: __dirname}
));


export { app };
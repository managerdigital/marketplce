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
import * as functions from "firebase-functions";
import express = require('express');
import cors = require('cors');
import jwt = require('express-jwt');

import { loadControllers } from 'awilix-express';
// import expressFileUpload = require('express-fileupload');

import  loadContainer from './container';


const app: express.Application = express();


// Settings
app.set('port', process.env.PORT || 4000);


// Configurar CORS
app.use(cors());

// JSON Support
app.use(express.json());

// Este middleware me da acceso a los files
// app.use(expressFileUpload());
// app.use(express.urlencoded({extended: true}));


// Container
loadContainer(app);


// Controllers
// Note: Estoy cargando las rutas SIN protección
app.use(loadControllers(
    'controllers/plazas.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/productosLocatarios.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/boletin.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/localidad.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/promociones.controller.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/categoria.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/locatario.controllers.js',
    {cwd: __dirname}
));
app.use(loadControllers(
    'controllers/visitasLocatario.controllers.js',
    {cwd: __dirname}
));


// JWT
// Se adjunta una propiedad en cada Request user req.user
// bearer token 
if(process.env.jwt_secret_key) {
    app.use(jwt({ 
        secret: process.env.jwt_secret_key,
        algorithms: ['HS256']
    }));
}

// Note: Cargo las rutas para proteger
app.use(loadControllers(
    'controllers/*.js',
    {cwd: __dirname}
));

export const market = functions.https.onRequest( app );
    

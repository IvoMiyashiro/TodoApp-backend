const express = require('express');
require('dotenv').config(); // Para poder usar los env
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear el servidor
const app = express();


// Base de datos
dbConnection();


// CORS
app.use(cors());


// Directiorio Público
app.use(express.static('public'));


// Lectura y parseo del body de las peticiones
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth')); // El primer parámetro indica donde voy a hacer la llamada


// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
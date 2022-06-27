//modulos
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helment = require('helmet');
var cors = require('cors');

//components
const conectarDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarios.routes');
const anuncioRouters = require('./routes/anuncios.routes');

//conectar al Servidor
const app = express();
// const upload = multer();

//contecar la BD
conectarDB();


//parsear datos recibidos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('public'));
app.use(express.static('uploads'));

//configuraciones del servidor
app.use(logger('dev'));
app.use(cors());
app.use(helment());

//middleware
app.use('/api', usuarioRoutes);
app.use('/api', anuncioRouters);

// leer el localhost y variables de entorno
const port = process.env.PORT || 9000;
const host = process.env.HOST || '0.0.0.0';

//routes
app.get('/', (req, res) => {
    res.send('Hello World, Welcome to the API REST')    
});


app.listen(port, host, () => console.log('server listening on port: ', port));
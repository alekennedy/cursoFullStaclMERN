const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const SocketIo = require('socket.io');

require('dotenv').config();
//settings
app.set('port', process.env.PORT || 4000);
require('./database');

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, 'public'))) ;

//routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/compras', require('./routes/compras.routes'));

//starting
const serverRunning = app.listen(app.get('port'), ()=> {
    console.log("Server started on port: "+app.get('port'));
}); 
const io = SocketIo(serverRunning);
io.on('connect', () => {
    console.log('Alguien conectandose');
});
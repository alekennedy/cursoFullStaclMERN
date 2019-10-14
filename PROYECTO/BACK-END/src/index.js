const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const SocketIo = require('socket.io');
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();
//settings
app.set('port', process.env.PORT || 4000);
require('./database');

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

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
io.on('connection', (socket) => {
    socket.on('fetchProductos',async ()=>{
        try {
            const productos = await axios.get('http://localhost:4000/api/productos');
            await socket.emit('Productos', productos.data);
        } catch (error) {
            console.error(error);
        }
    })

    socket.on('fetchCompras',async ()=>{
        try {
            const compras = await axios.get('http://localhost:4000/api/compras');
            await socket.emit('Compras', compras.data);
        } catch (error) {
            console.error(error);
        }    
    })
    
});
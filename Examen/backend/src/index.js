const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const app = express();
const axios = require('axios');
const SocketIo = require('socket.io');

//static files
app.use(express.static(path.join(__dirname,"public")));

//midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



//SETTING
app.set('port',process.env.PORT || 4000);
require("dotenv").config();
require("./database");

//routes
app.use('/api/empleados', require('./routes/empleados.routes'));


//start server
const serverRunning = app.listen(app.get('port'), ()=>{
    console.log("Server run in port: "+app.get('port'));
});

const io = SocketIo(serverRunning);
io.on('connection', (socket) => {
    socket.on('fetchEmpleados',async ()=>{
        try {
            const empleados = await axios.get('http://localhost:4000/api/empleados');
            await socket.emit('Empleados', empleados.data);
        } catch (error) {
            console.error(error);
        }
    })

    socket.on('fetchJornaleros',async ()=>{
        try {
            const empleados = await axios.get('http://localhost:4000/api/empleados/jornaleros');
            await socket.emit('Empleados', empleados.data);
        } catch (error) {
            console.error(error);
        }
    })
    
});
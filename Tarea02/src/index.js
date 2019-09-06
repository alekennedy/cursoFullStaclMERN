require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
//initializations
const app = express();

//settings
app.set('port', 4000);
require('./database')

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/tareas', require('./routes/tareas.routes'));//endpoint de tareas
app.use('/api/users', require('./routes/user.routes'));//endpoint de users

//starting server
app.listen(app.get('port'), () => {
    console.log("Server started on", app.get('port')); 
});
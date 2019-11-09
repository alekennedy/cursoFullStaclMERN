const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const app = express();

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
app.listen(app.get('port'), ()=>{
    console.log("Server run in port: "+app.get('port'));
});
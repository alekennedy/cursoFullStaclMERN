const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        uppercase: true
    },

    apellido:{
        type: String,
        required: true,
        uppercase: true
    },

    domicilio:{
        type: String,
        required: true,
        uppercase: true
    },

    telefono:{
        type: String,
        required: true,
        uppercase: true
    },

    cedula:{
        type: String,
        required: true,
        uppercase: true
    },
    salario : {
        type: Number,
        required:true
    }, 

    cargo:{
        type: String,
        required: true,
        uppercase: true
    },

    tipo:{
        type: String,
        required: true,
        uppercase: true
    },

    salario_dia : {
        type: Number,
        required:true
    },

    salario_hora : {
        type: Number,
        required:true
    },
    fecha:{
        type: String,
        required: true,
        uppercase: true
    },
    activo:{
        type: Boolean,
        required: true
        
    },
}, {
    timestamps: false
});

module.exports = model('Empleado', EmpleadoSchema);
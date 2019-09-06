const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{ 
    timestamp: false
});

module.exports = mongoose.model('Tarea', TareaSchema);
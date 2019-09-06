const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        required: true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    estado: {
        type:String,
        default:"activo"
    }
},{ 
    timestamp: false
});

module.exports = mongoose.model('User', UserSchema);
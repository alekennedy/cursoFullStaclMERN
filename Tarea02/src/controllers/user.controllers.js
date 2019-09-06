const UserModel = require('../models/User');
const TareaModel =  require('../models/Tarea');

const userController = {

};

userController.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find(); 
        res.json(users);    
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
    
}
userController.getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const tareasByUser = TareaModel.find({userId:user._id});
        res.json({
            usuario:user,
            tareas:tareasByUser
        });    
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

userController.createUser = async (req, res) => {
    try {
        const {username, email, estado} = req.body;
        if(!username){
            return res.json({
                success: false,
                messge: 'El nombre no puede ser vacio'
            });
        }
        if(!email){
            return res.json({
                success: false,
                messge: 'La email  no puede ser vacio'
            });
        }
        const newUser = new UserModel({
            username,
            email,
            estado
        });
        await newUser.save();
        res.json({
            success:true,
            message: 'Usuario creada'
        }); 
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

userController.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body);
        res.json({
            success:true,
            message: 'Usuario actualizado'
        }); 
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

userController.deleteUser = async (req, res) => {
    try {
        const tareasPendientes = await TareaModel.find({userId:req.params.id, completed:false});
        if(tareasPendientes.length>0){
            return res.json({
                success: false,
                messge: 'El usuario tiene tareas pendiente'
            });   
        }else{
            await UserModel.findByIdAndDelete(req.params.id);
            await TareaModel.deleteMany({userId:req.params.id});
            res.json({
                success:true,
                message: 'Usuario eliminado'
            });    
        }
        
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

userController.bajaUser = async (req, res) => {
    try {
        const tareaUser = await TareaModel.find({userId:req.params.id, completed:false});
        console.log(tareaUser.length);
        if(tareaUser.length>0){
            return res.json(
                {
                    message:"El usuario tiene tareas pendientes"
                }
            )
        }

        const {id,username, email} = req.body;
        const newUser = new UserModel({
            _id:id,
            username,
            email,
            estado:"inactivo"
        });
        const user = await UserModel.findByIdAndUpdate({_id: req.params.id}, newUser);
        res.json({
            success:true,
            message: 'Usuario dado de baja'
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

userController.altaUser = async (req, res) => {
    try {
        const {id,username, email} = req.body;
        const newUser = new UserModel({
            _id: id,
            username,
            email,
            estado:"activo"
        });

        const user = await UserModel.findByIdAndUpdate({_id: req.params.id}, newUser);
        res.json({
            success:true,
            message: 'Usuario dado de alta'
        }); 
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

module.exports = userController;
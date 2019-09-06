const TareaModel =  require('../models/Tarea');

const tareaController = {

};

tareaController.getTareas = async (req, res) => {
    try {
        const tareas = await TareaModel.find(); 
        res.json(tareas);    
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
    
}
tareaController.getTarea = async (req, res) => {
    try {
        const tarea = await TareaModel.findById(req.params.id);
        res.json(tarea);    
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

tareaController.createTarea = async (req, res) => {
    try {
        const {title, description} = req.body;
        if(!title){
            return res.json({
                success: false,
                messge: 'El titulo no puede ser vacio'
            });
        }
        if(!description){
            return res.json({
                success: false,
                messge: 'La descripcion  no puede ser vacio'
            });
        }
        const newTarea = new TareaModel({
            title,
            description
        });
        await newTarea.save();
        res.json({
            success:true,
            message: 'Tarea creada'
        }); 
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

tareaController.updateTarea = async (req, res) => {
    try {
        const tarea = await TareaModel.findByIdAndUpdate({_id: req.params.id}, req.body);
        res.json({
            success:true,
            message: 'Tarea actualizada'
        }); 
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

tareaController.deleteTarea = async (req, res) => {
    try {
        await TareaModel.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message: 'Tarea eliminada'
        });    
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            messge: error
        });    
    }
}

module.exports = tareaController;
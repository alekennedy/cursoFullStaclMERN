const EmpleadoModel = require('../models/Empleado');

module.exports = {
    async getEmpleado(req, res){
        try {
            const empleado = await EmpleadoModel.findById(req.params.id);
            res.json(empleado);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo obje'
            })
        }
    },
    async getEmpleados(req, res){
        try {
            const empleados = await EmpleadoModel.find();
            res.json(empleados);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se obtener la lista de productos'
            })
        }
    },
    async crearEmpleado(req, res){
        const {nombre, apellido, domicilio, telefono, cedula, salario, cargo, tipo,fecha} = req.body;
        
        if(!nombre){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacio.'
            });
        }

        if(!apellido){
            return res.json({
                success: false,
                message: 'El apellido no puede estar vacio.'
            });
        }

        if(!salario){
            return res.json({
                success: false,
                message: 'El salario no puede estar vacio.'
            });
        }

        if(!tipo){
            return res.json({
                success: false,
                message: 'El tipo de trabajador no puede estar vacio.'
            });
        }

        const salario_dia = salario/30;
        const salario_hora = salario_dia/8;
        const activo = true;
        try {
            const newEmpleado = new EmpleadoModel({
                nombre, apellido, domicilio, telefono, cedula, salario, cargo, tipo,fecha, salario_dia, salario_hora, activo
            });
            await newEmpleado.save();
            res.json({
                success: true,
                message: 'Salario creado'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo crear el registro'
            })
        }

    },
    async updateEmpleado(req, res){
        const {_id ,nombre, apellido, domicilio, telefono, cedula, salario, cargo, tipo,fecha} = req.body;
        
        if(!nombre){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacio.'
            });
        }

        if(!apellido){
            return res.json({
                success: false,
                message: 'El apellido no puede estar vacio.'
            });
        }

        if(!salario){
            return res.json({
                success: false,
                message: 'El salario no puede estar vacio.'
            });
        }

        if(!tipo){
            return res.json({
                success: false,
                message: 'El tipo de trabajador no puede estar vacio.'
            });
        }

        const salario_dia = salario/30;
        const salario_hora = salario_dia/8;

        const data = {
            _id,nombre, apellido, domicilio, telefono, cedula, salario, cargo, tipo,fecha, salario_dia, salario_hora
        };
        try {
            await EmpleadoModel.findByIdAndUpdate(req.params.id, data);
            res.json({
                success: true,
                message: 'Empleado actualizado'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo actualizar el registro'
            })
        }
    },
    async deleteEmpleado(req, res){
        try {
            const activo = false;
            await EmpleadoModel.findByIdAndUpdate(req.params.id, {activo});
            res.json({
                success: true,
                message: 'Empleado excluido'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo excluir el registro'
            })
        }
    }
};
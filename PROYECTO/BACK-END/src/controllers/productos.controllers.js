const ProductoModel = require('../models/Producto');

module.exports = {
    async getProducto(req, res){
        try {
            const producto = await ProductoModel.findById(req.params.id);
            res.json(producto);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo crear el producto'
            })
        }
    },
    async getProductos(req, res){
        try {
            const productos = await ProductoModel.find();
            res.json(productos);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se obtener la lista de productos'
            })
        }
    },
    async createProducto(req, res){
        const {nombre, precio, stock} = req.body;
        
        if(!nombre){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacio.'
            });
        }

        if(!precio){
            return res.json({
                success: false,
                message: 'El precio no puede estar vacio.'
            });
        }

        if(!stock){
            return res.json({
                success: false,
                message: 'El stock no puede estar vacio.'
            });
        }

        try {
            const newProducto = new ProductoModel({
                nombre, precio, stock
            });
            await newProducto.save();
            res.json({
                success: true,
                message: 'Producto creado'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo crear el registro'
            })
        }

    },
    async updateProducto(req, res){
        try {
            await ProductoModel.findByIdAndUpdate(req.params.id, req.body);
            res.json({
                success: true,
                message: 'Producto actualizado'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo actualizar el registro'
            })
        }
    },
    async deleteProducto(req, res){
        try {
            await ProductoModel.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                message: 'Producto eliminado'
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo eliminar el registro'
            })
        }
    }
};
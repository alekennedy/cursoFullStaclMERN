const CompraModel = require('../models/Compra');
const moment = require('moment');
const ProductoModel = require('../models/Producto');

moment.locale('es');

module.exports = {
    async getCompra(req, res){
        try {
            const compra = await CompraModel.findById(req.params.id);
            res.json(compra);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo crear el producto'
            })
        }
    },
    async getCompras(req, res){
        try {
            const compras = await CompraModel.find();
            res.json(compras);
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se obtener la lista de productos'
            })
        }
    },
    async createCompra(req, res){
        const {producto, cantidad} = req.body;
        
        if(!producto){
            return res.json({
                success: false,
                message: 'El nombre no puede estar vacio.'
            });
        }

        if(!cantidad){
            return res.json({
                success: false,
                message: 'La cantidad no puede estar vacio.'
            });
        }
        try {
            const productoF = await ProductoModel.findOne({_id: producto});
            console.log(producto);
            if(productoF.stock >= cantidad){
                const monto = cantidad * productoF.precio;                
                const fecha = moment().format('L');
                
                const newCompra = new CompraModel({
                    producto, cantidad, monto,fecha
                });
                await newCompra.save();
                
                productoF.stock = productoF.stock - cantidad;
                await productoF.save();

                res.json({
                    success: true,
                    message: 'Compra creada'
                });
            }else{
                res.json({
                    success: false,
                    message: 'La cantidad sobrepasa la disponibilidad.'
                });
            }
            
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                mensaje: 'No se pudo crear el registro'
            })
        }

    },
    
};
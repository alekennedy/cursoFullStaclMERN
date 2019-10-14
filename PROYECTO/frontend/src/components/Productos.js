import React, { Component } from 'react'
import 'material-icons/css/material-icons.min.css';
import {NotificationContainer, NotificationManager} from 'react-notifications'
export default class Productos extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id:'',
            nombre: '',
            precio: '',
            stock:'',
            axios: this.props.axios,
            productos: [],
            socket: this.props.socket,
            editing:false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        this.fecthProductos();
    }

    async fecthProductos(){
        try {
           await this.state.socket.emit('fetchProductos')
           await this.state.socket.on('Productos',(data)=>{
                this.setState({
                    productos: data
                });
           });
        } catch (error) {
            NotificationManager.error("No se pudo recuperar los datos", 'Error');
            console.error(error);
        }
    }

    handleSummit = async (e) => {
        e.preventDefault();
        
        try {
            if(this.state.editing){
                const producto = {
                    _id: this.state._id,
                    nombre: this.state.nombre,
                    precio: this.state.precio,
                    stock: this.state.stock            
                }
                const res = await this.state.axios.put('/api/productos/'+producto._id, producto);
                if(res.data.success){
                    NotificationManager.success(res.data.message, 'Producto')
                }else{
                    NotificationManager.error(res.data.message, 'Producto')
                }
            }else{
                const producto = {                    
                    nombre: this.state.nombre,
                    precio: this.state.precio,
                    stock: this.state.stock            
                }
                const res = await this.state.axios.post('/api/productos', producto);
                if(res.data.success){
                    NotificationManager.success(res.data.message, 'Producto')
                }else{
                    NotificationManager.error(res.data.message, 'Producto')
                }
            }
            this.fecthProductos();
            
        } catch (error) {
            NotificationManager.error('Ocurrio un error', 'Producto')
        }
    };

    async editProducto(id){
        try {
            const editProducto = await this.state.axios.get('/api/productos/'+id);
            this.setState({
                nombre: editProducto.data.nombre,
                precio: editProducto.data.precio,
                stock: editProducto.data.stock,
                _id:editProducto.data._id,
                editing: true
            });
        } catch (error) {
            
        }
    };

    async deleteProducto(id){
        try {
            const res = await this.state.axios.delete('api/productos/'+id);
            if(res.data.success){
                NotificationManager.success(res.data.message, 'Producto')
            }else{
                NotificationManager.error(res.data.message, 'Producto')
            }
            this.fecthProductos();
        } catch (error) {
            NotificationManager.error('Ocurrio un error', 'Producto')
        }
    }

    render() {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className='col-sm-5'>
                    <div className="card">
                        <div className='card-body'>
                            <h5 className='card-title'>Formulario de Productos</h5>
                            <form id="form" onSubmit={this.handleSummit}>
                                <div className="form-group col-sm-10">
                                    <label htmlFor="nombre">Nombre del producto</label>
                                    <input type="text" name="nombre" id="nombre" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange} required
                                        value={this.state.nombre}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="precio">Precio</label>
                                    <input type="number" name="precio" id="precio" className='form-control form-control-sm'
                                    value={this.state.precio} autoComplete="off" onChange={this.handleChange} required></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" name="stock" id="stock" className='form-control form-control-sm' 
                                    value={this.state.stock} autoComplete="off" onChange={this.handleChange} required></input>
                                </div>

                                <div className="form-group col-sm-10">                                    
                                    <button type="submit" className='btn btn-primary btn-sm'>Guardar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div> 
                    <div className="col-sm-7">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Dashboard</h5>
                            <table className="table table-hover">
                                <thead>
                                    <tr>                                    
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.productos.map(producto => {
                                           return( <tr key={producto._id}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.precio}</td>
                                                <td>{producto.stock}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" >
                                                        <i className="material-icons" onClick= {()=>this.editProducto(producto._id)}>edit</i>
                                                    </button>
                                                    <button className="btn btn-danger btn-sm">
                                                        <i className="material-icons" onClick= {()=>this.deleteProducto(producto._id)}>delete</i>
                                                    </button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                    <NotificationContainer></NotificationContainer>               
                </div>
            </div>
            
            
        )
    }
}

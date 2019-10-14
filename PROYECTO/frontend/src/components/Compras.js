import React, { Component } from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications'

export default class Compras extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            cantidad: '',
            _id: '',
            axios: this.props.axios,
            socket: this.props.socket,
            showProcessCompra: false
        }
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

    processCompra(id){
        this.setState({
            showProcessCompra: true,
            _id: id
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const compra = {
            cantidad: this.state.cantidad,
            producto: this.state._id
        }

        try {
            const res = await this.state.axios.post('api/compras',compra);
            if(res.data.success){
                NotificationManager.success(res.data.message, 'Compra');
            }else{
                NotificationManager.error(res.data.message, 'Compra');
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const {showProcessCompra} = this.state
        const processCompra = (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Confirmacion de compra</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-sm-10">
                                <label htmlFor="cantidad">Cantidad</label>
                                <input type="number" onChange={this.handleChange} required
                                className="form-control form-control-sm" name="cantidad" id="cantidad" autoComplete='off'></input>
                            </div>
                            <div className="form-group col-sm-10">
                                <button type="submit" className="btn btn-primary btn-sm">Comprar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5">
                        {
                            this.state.productos.map(producto => {
                                return (
                                    <div key={producto._id} className="card" style={{marginTop: '4px'}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">{producto.precio} Gs.</p>
                                            {producto.stock > 0 ? <p className="card-text">Disponible</p> : <p className="card-text">Agotado</p>}
                                            <button className="btn btn-primary btn-sm"><i onClick={() => this.processCompra(producto._id)} className="material-icons">shopping-cart</i></button>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div> 
                    <div className="col-sm-7">
                        {showProcessCompra && processCompra}
                    </div>
                </div>
                <NotificationContainer></NotificationContainer>               
            </div>
        )
    }
}

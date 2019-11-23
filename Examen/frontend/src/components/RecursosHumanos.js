import React, { Component } from 'react'
import 'material-icons/css/material-icons.min.css';
import {NotificationContainer, NotificationManager} from 'react-notifications'
export default class Empleado extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id:'',
            nombre: '',
            apellido: '',
            domicilio: '',
            telefono: '',
            cedula: '',
            salario: '',
            cargo: '',
            tipo: '',
            axios: this.props.axios,
            empleados: [],
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
        this.fecthEmpleados();
    }

    async fecthEmpleados(){
        try {
           await this.state.socket.emit('fetchEmpleados')
           await this.state.socket.on('Empleados',(data)=>{
                this.setState({
                    empleados: data
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
                const empleado = {
                    _id: this.state._id,
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    domicilio: this.state.domicilio,
                    telefono: this.state.telefono,
                    cedula: this.state.cedula,
                    salario: this.state.salario,
                    cargo: this.state.cargo,
                    tipo: this.state.tipo           
                }
                const res = await this.state.axios.put('/api/empleados/'+empleado._id, empleado);
                if(res.data.success){
                    NotificationManager.success(res.data.message, 'Producto')
                }else{
                    NotificationManager.error(res.data.message, 'Producto')
                }
            }else{
                const empleado = {                    
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    domicilio: this.state.domicilio,
                    telefono: this.state.telefono,
                    cedula: this.state.cedula,
                    salario: this.state.salario,
                    cargo: this.state.cargo,
                    tipo: this.state.tipo
                }
                const res = await this.state.axios.post('/api/empleados', empleado);
                if(res.data.success){
                    NotificationManager.success(res.data.message, 'Empleado')
                }else{
                    NotificationManager.error(res.data.message, 'Empleado')
                }
            }
            this.fecthEmpleados();
            
        } catch (error) {
            NotificationManager.error('Ocurrio un error', 'Producto')
        }
    };

    async editEmpleadoId(id){
        
        try {
            const editEmpleado = await this.state.axios.get('/api/empleados/byid/'+id);
            this.setState({
                nombre: editEmpleado.data.nombre,
                apellido: editEmpleado.data.apellido,
                domicilio: editEmpleado.data.domicilio,
                telefono: editEmpleado.data.telefono,
                cedula: editEmpleado.data.cedula,
                salario: editEmpleado.data.salario,
                cargo: editEmpleado.data.cargo,
                tipo: editEmpleado.data.tipo,
                _id:editEmpleado.data._id,
                editing: true
            });
        } catch (error) {
            console.log(error);
        }
    };

    async deleteEmpleado(id){
        try {
            const res = await this.state.axios.delete('api/empleados/'+id);
            if(res.data.success){
                NotificationManager.success(res.data.message, 'Empleado')
            }else{
                NotificationManager.error(res.data.message, 'Empleado')
            }
            this.fecthEmpleados();
        } catch (error) {
            NotificationManager.error('Ocurrio un error', 'Empleado')
        }
    }

    render() {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    <div className='col-sm-5'>
                    <div className="card">
                        <div className='card-body'>
                            <h5 className='card-title'>Formulario de Empleados</h5>
                            <form id="form" onSubmit={this.handleSummit}>
                                <div className="form-group col-sm-10">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" name="nombre" id="nombre" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange} required
                                        value={this.state.nombre}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input type="text" name="apellido" id="apellido" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange} required
                                        value={this.state.apellido}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="domicilio">Domicilio</label>
                                    <input value={this.state.domicilio} type="text" name="domicilio" id="domicilio" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange}
                                        ></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="telefono">Telefono</label>
                                    <input type="text" name="telefono" id="telefono" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange}
                                        value={this.state.telefono}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="cedula">CI</label>
                                    <input type="text" name="cedula" id="cedula" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange}
                                        value={this.state.cedula}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="salario">Salario Base</label>
                                    <input type="number" name="salario" id="salario" className='form-control form-control-sm'
                                    value={this.state.salario} autoComplete="off" onChange={this.handleChange} required></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="cargo">Cargo</label>
                                    <input type="text" name="cargo" id="cargo" 
                                        className='form-control form-control-sm' autoComplete="off" onChange={this.handleChange}
                                        value={this.state.cargo}></input>
                                </div>

                                <div className="form-group col-sm-10">
                                    <label htmlFor="tipo">Cargo</label>
                                    <select class="form-control" id="tipo" name="tipo" onChange={this.handleChange} value={this.state.tipo}>
                                        <option value='M'>Mensualero</option>
                                        <option value='J'>Jornalero</option>
                                        <option value='C'>Changarin</option>
                                    </select>
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
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>                                    
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Salario</th>
                                    <th scope="col">Salario x Dia</th>
                                    <th scope="col">Salario x Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.empleados.map(empleado => {
                                           return( <tr key={empleado._id}>
                                                <td>{empleado.nombre}</td>
                                                <td>{empleado.apellido}</td>
                                                <td>{empleado.cargo}</td>
                                                <td>{empleado.salario}</td>
                                                <td>{empleado.salario_dia}</td>
                                                <td>{empleado.salario_hora}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" >
                                                        <i className="material-icons" onClick= {()=>this.editEmpleadoId(empleado._id)}>edit</i>
                                                    </button>
                                                    <button className="btn btn-danger btn-sm">
                                                        <i className="material-icons" onClick= {()=>this.deleteEmpleado(empleado._id)}>delete</i>
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

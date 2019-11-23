import React, { Component } from 'react'
import 'material-icons/css/material-icons.min.css';
import {NotificationContainer, NotificationManager} from 'react-notifications'
export default class Planilla extends Component {
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
           await this.state.socket.emit('fetchJornaleros')
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



    render() {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    
                    <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Dashboard</h5>
                            <table className="table table-hover table-sm">
                                <thead>
                                    <tr>                                    
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Hora 50%</th>
                                    <th scope="col">Hora 100%</th>
                                    <th scope="col">Hora 30%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.empleados.map(empleado => {
                                           return( <tr key={empleado._id}>
                                                <td>{empleado.nombre}</td>
                                                <td>{empleado.apellido}</td>
                                                <td>{empleado.cargo}</td>
                                                <td>{empleado.salario_hora}</td>
                                                <td>{empleado.salario_hora+(empleado.salario_hora*0.5)}</td>
                                                <td>{empleado.salario_hora+(empleado.salario_hora)}</td>
                                                <td>{empleado.salario_hora+(empleado.salario_hora*0.3)}</td>
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

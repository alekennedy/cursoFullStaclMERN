import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';

export default class Navegacion extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="#">Inicio <span class="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/productos">Productos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/compras">Compras</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

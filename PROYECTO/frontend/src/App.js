import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-notifications/lib/notifications.css'
import 'material-icons/css/material-icons.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios'

import Navbar from './components/Navegacion';
import Productos from './components/Productos';
import Compras from './components/Compras';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
axios.defaults.baseURL = "http://localhost:4000";



function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Switch>
            <Route exact path='/productos' 
              component={() => <Productos axios={axios} socket={socket}></Productos>}></Route>
            
            <Route exact path='/compras' 
              component={() => <Compras axios={axios} socket={socket}></Compras>}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

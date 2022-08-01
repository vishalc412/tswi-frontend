import './App.css';
import React, { Component } from "react";
import { Link, Route,Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Addition from './Addition';
import Continuation from './Continuation';
import Termination from './Termination';
import Home from './Home';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark topnav">
          <div className="navbar-nav mr-auto" >
          <li className="nav-item">
          <Link to={"/"} className="nav-link">
                MS EXIMP
              </Link>
              </li>
          <li className="nav-item">
              <Link to={"/Addition"} className="nav-link">
                Addition
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Continuation"} className="nav-link">
                Continuation
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Termination"} className="nav-link">
                Termination
              </Link>
            </li>
          
          </div>
        </nav>
        <div className="container mt-3">
        <Routes>
        
        <Route exact path="/Addition" element={<Addition/>} />
        <Route exact path="/Continuation" element={<Continuation/>} />
        <Route exact path="/Termination" element={<Termination/>} /> 
        <Route exact path="/" element={<Home/>} /> 
        </Routes>

        </div> 
      </div>
    );
  }
}
export default App;

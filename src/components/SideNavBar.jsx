// SideNavBar.jsx

import React from 'react';
import './SideNavBar.css';
import { NavLink } from "react-router-dom";

export default function SideNavBar() {
    return (
        <div className="side-nav">
            <NavLink to="/" className="nav-link" activeclassname="active">
                Home
            </NavLink>
            <NavLink to="/Addition" className="nav-link" activeclassname="active">
                Addition
            </NavLink>
            <NavLink to="/Continuation" className="nav-link" activeclassname="active">
                Continuation
            </NavLink>
            <NavLink to="/Termination" className="nav-link" activeclassname="active">
                Termination
            </NavLink>
        </div>
    );
}

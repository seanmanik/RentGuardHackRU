import React, { Component } from 'react';
//allow link to different routes
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    
    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand rent-control"> Rent Control</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/agreement" className="nav-link">Agreements</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/policy" className="nav-link">Policy</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/editAgreement" className="nav-link">Edit Agreement</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createAgreement" className="nav-link">Create Agreement</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/editPolicy" className="nav-link">Edit Policy</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
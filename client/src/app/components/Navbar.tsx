import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Crud</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/list">List</Link></li>
                        <li><Link to="/add">Add</Link></li>
                        <li><Link to="/update">Update</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

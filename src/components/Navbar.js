import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {
    let location = useLocation();
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        props.showAlert('Logged out Succesfully', 'success');
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg`} style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} style={{ color: props.mode === 'dark' ? 'white' : 'black' }} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} style={{ color: props.mode === 'dark' ? 'white' : 'black' }} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} mx-2`} to='/login' role='button' style={{ color: 'white' }}>Login</Link>
                        <Link className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} mx-2`} to='/signup' role='button' style={{ color: 'white' }}>Signup</Link>
                    </form> : <button onClick={handleLogOut} className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} mx-1`} style={{ color: 'white' }}>Logout</button>}
                </div>
            </div>
            <div className="dark-mode-toggler">
                <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                    <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">🌙</label>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

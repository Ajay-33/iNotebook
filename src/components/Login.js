import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success");

        }
        else {
            props.showAlert("Invalid Credentials", "danger");

        }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body' style={{ backgroundColor: props.mode === 'dark' ? '#262626' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} >
                            <h2 className='card-title text-center mb-4'>Login to iNotebook</h2>
                            <form onSubmit={handleSubmission}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name='password' className="form-control" value={credentials.password} onChange={onChange} id="password" />
                                </div>
                                <div className='d-grid'>
                                    <button type="submit" className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} btn-lg`} >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

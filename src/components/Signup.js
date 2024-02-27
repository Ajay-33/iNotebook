import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (cpassword !== password) {
            props.showAlert("Passwords don't match", "danger");
            return;
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created Successfully", "success");
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card' style={{ backgroundColor: props.mode === 'dark' ? '#262626' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }}>
                        <div className='card-body'>
                            <h2 className='card-title text-center mb-4'>Create an account</h2>
                            <form onSubmit={handleSubmission}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name='name' required minLength={3} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name='email' required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name='password' required minLength={5} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="cpassword" name='cpassword' required minLength={5} onChange={onChange} />
                                </div>
                                <div className='d-grid'>
                                    <button type="submit" className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} btn-lg`} >Sign Up</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

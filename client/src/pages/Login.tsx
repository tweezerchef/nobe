import React from 'react';
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <h1>Login</h1>
            <span> Don't Have an Account?
                <Link to='/signup'>Sign Up</Link>
            </span>
            <br />
            <span>Go Back <Link to='/'>Home</Link></span>
        </>
    )
}

export default Login;

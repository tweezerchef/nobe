import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <>
            <h1>Signup!</h1>
            <span>Already Have an Account?
                <Link to="/login">Login</Link>
            </span>
            <br />
            <span>Go back <Link to='/'> Home </Link></span>
        </>
    )
}

export default Signup;

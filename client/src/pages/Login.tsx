import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EntryPage, PageHeader } from './style'; import EntryCard from '../components/EntryCard/EntryCard'; import InputGroup from '../components/Input Group/InputGroup'; import Input from '../components/Input/Input'; import Button from '../components/Button';
import useFetch from '../hooks/useFetch';
import Signup from './Signup';
import axios from 'axios';
declare const google: any;
declare const handleGoogle: string;


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const loginHandler = () => {

        axios
            .get("/Login", {
                params: {
                    email: email,
                },
            })
            .then((response) => {

                let { user } = response.data;
                user = JSON.stringify(user)
                //console.log(user)
                localStorage.setItem("user", user);
                // // Handle success
                console.log(localStorage.getItem("user"));
                navigate("/home");
            })
            .catch((error) => {
                console.error(error)
            });
    };
    const { handleGoogle, loading, error } = useFetch(
        "/login"
    );
    const loadGoogleScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.head.appendChild(script);
        });
    };


    useEffect(() => {
        const initGoogleButton = async () => {
            const isScriptLoaded = await loadGoogleScript();
            if (isScriptLoaded && window.google) {
                google.accounts.id.initialize({
                    client_id: '111572772794-videl668qu4bvarac5vbj0qsr1r422j4.apps.googleusercontent.com',
                    callback: handleGoogle,
                });

                google.accounts.id.renderButton(document.getElementById("loginDiv"), {
                    theme: "filled_black",
                    text: "signin_with",
                    shape: "pill",
                });
            }
        };

        initGoogleButton();
    }, [handleGoogle]);
    return (
        <EntryPage>
            <PageHeader to="/">AWESOME LOGO</PageHeader> <EntryCard>
                <h2>Log in</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <InputGroup>
                        <label htmlFor="login-email">Email Address</label>
                        <Input
                            type="text"
                            placeholder="name@email.com"
                            id="login-email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="login-password">Password</label>
                        <Input type="password" placeholder="Password" id="login-password" /> </InputGroup>
                    <Button full onClick={loginHandler}>Log in</Button>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <div id="loginDiv"></div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div id="loginDiv"></div>
                    </div>
                </form>
                <span>
                    Don't have an account?
                    <Link to="/signup">Sign up</Link>
                </span>
            </EntryCard>
        </EntryPage>
    );
}
export default Login;

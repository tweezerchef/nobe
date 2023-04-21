import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { EntryPage, PageHeader } from './style'; import EntryCard from '../components/EntryCard/EntryCard'; import InputGroup from '../components/Input Group/InputGroup'; import Input from '../components/Input/Input'; import Button from '../components/Button';
import useFetch from '../hooks/useFetch';
declare const google: any;
declare const handleGoogle: string;

export interface LoginProps {
    onLogin: () => void;
}


function Login(props: LoginProps) {
    const { handleGoogle, loading, error } = useFetch(
        "http://localhost:8080/login"
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
                        <Input type="text" placeholder="name@email.com" id="login-email" /> </InputGroup>
                    <InputGroup>
                        <label htmlFor="login-password">Password</label>
                        <Input type="password" placeholder="Password" id="login-password" /> </InputGroup>
                    <Button full>Log in</Button>
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

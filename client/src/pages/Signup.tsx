import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { EntryPage, PageHeader } from "./style";
import EntryCard from "../components/EntryCard/EntryCard";
import InputGroup from "../components/Input Group/InputGroup";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";



declare const google: any;

const Signup = () => {
    const { handleGoogle, loading, error } = useFetch("http://localhost:8070/signup");


    // useEffect(() => {
    //     /* global google */
    //     if (window.google) {
    //         google.accounts.id.initialize({
    //             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //             callback: handleGoogle,
    //         });

    //         google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
    //             // type: "standard",
    //             theme: "filled_black",
    //             // size: "small",
    //             text: "continue_with",
    //             shape: "pill",
    //         });

    //         // google.accounts.id.prompt()
    //     }
    // }, [handleGoogle]);
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

                google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                    theme: "filled_black",
                    text: "continue_with",
                    shape: "pill",
                });
            }
        };

        initGoogleButton();
    }, [handleGoogle]);

    return (
        <EntryPage>
            <PageHeader to="/">AWESOME LOGO</PageHeader>
            <EntryCard>
                <h2>Sign up</h2>
                <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                    <InputGroup>
                        <label htmlFor="signup-name">Full Name</label>
                        <Input type="text" placeholder="John Doe" id="signup-name" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="signup-email">Email Address</label>
                        <Input type="text" placeholder="name@email.com" id="signup-email" />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="signup-password">Password</label>
                        <Input type="password" placeholder="Password" id="signup-password" />
                    </InputGroup>
                    <Button full>Sign up</Button>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div id="signUpDiv"></div>
                    </div>
                </form>
                <span>
                    Already have an account?
                    <Link to="/login">Log in</Link>
                </span>

            </EntryCard>
        </EntryPage >
    );
};

export default Signup
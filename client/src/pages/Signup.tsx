/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import UserContext from '../hooks/Context';
import { EntryPage, PageHeader } from './style';
import EntryCard from '../components/EntryCard/EntryCard';
import InputGroup from '../components/Input Group/InputGroup';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

declare const google: any;

function Signup() {
  const { handleGoogle, loading, error } = useFetch('/auth/signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const userContext = useContext(UserContext);
  const setUser = userContext?.setUser;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/auth/signup-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, nickname }),
    });
    await axios.post('/auth/login-email', {
      email,
      password,
    })
      .then((res) => {
        if (res && setUser) {
          let { user } = res.data;
          // console.log(response.data, 28);
          setUser(user);
          user = JSON.stringify(user);
          localStorage.setItem('user', user);
        // console.log(user, 30);
        }
        navigate('/usersettings');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadGoogleScript = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.head.appendChild(script);
  });

  useEffect(() => {
    const initGoogleButton = async () => {
      const isScriptLoaded = await loadGoogleScript();
      if (isScriptLoaded && window.google) {
        google.accounts.id.initialize({
          client_id: '111572772794-videl668qu4bvarac5vbj0qsr1r422j4.apps.googleusercontent.com',
          callback: handleGoogle,
        });

        google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
          theme: 'filled_black',
          text: 'continue_with',
          shape: 'pill',
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
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="signup-nickname">Username</label>
            <Input
              type="text"
              placeholder="John Doe"
              id="signup-nickname"
              value={nickname}
              onChange={(e: any) => setNickname(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="signup-email">Email Address</label>
            <Input
              type="text"
              placeholder="name@email.com"
              id="signup-email"
              value={email}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="signup-password">Password</label>
            <Input
              type="password"
              placeholder="Password"
              id="signup-password"
              value={password}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
            />
          </InputGroup>
          <Button full>Sign up</Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div id="signUpDiv" />
          </div>
        </form>
        <span>
          Already have an account?
          <Link to="/login">Log in</Link>
        </span>

      </EntryCard>
    </EntryPage>
  );
}

export default Signup;

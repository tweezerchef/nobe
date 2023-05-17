import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EntryPage, PageHeader } from './style'; import EntryCard from '../components/EntryCard/EntryCard'; import InputGroup from '../components/Input Group/InputGroup'; import Input from '../components/Input/Input'; import Button from '../components/Button';
import useFetch from '../hooks/useFetch';
import UserContext from '../hooks/Context';

declare const google: any;
declare const handleGoogle: string;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const setUser = userContext?.setUser;

  const loginHandler = () => {
    axios
      .post('/auth/login-email', {
        email,
        password,
      })
      .then((response) => {
        if (response && setUser) {
          let { user } = response.data;
          setUser(user);
          user = JSON.stringify(user);
          localStorage.setItem('user', user);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const { handleGoogle, loading, error } = useFetch(
    'auth/login',
  );
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

        google.accounts.id.renderButton(document.getElementById('loginDiv'), {
          theme: 'filled_black',
          text: 'signin_with',
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
            <Input
              type="password"
              placeholder="Password"
              id="login-password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </InputGroup>
          <Button full onClick={loginHandler} style={{ marginBottom: '40px' }}>
            Log in
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div id="loginDiv" />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div id="loginDiv" />
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

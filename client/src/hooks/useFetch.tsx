/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './Context';

interface Response {
  credential: string;
}

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Access the setUser from the context
  const userContext = useContext(UserContext);
  const setUser = userContext?.setUser;

  const handleGoogle = async (response: Response) => {
    setLoading(true);
    let res;
    try {
      res = await axios(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ credential: response.credential }),
      });
      setLoading(false);

      const { data } = res;

      if (data) {
        // console.log(data);
        if (setUser) {
          setUser(data.user.userData);
          localStorage.setItem('user', JSON.stringify(data.user.userData));
        }
        if (data.user.userData.username !== null || data.user.userData.radius !== null
          || data.user.userData.longitude !== null) {
          navigate('/home');
        } else {
          navigate('/usersettings');
        }
      } else {
        throw new Error(data?.message || 'error');
      }
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { loading, error, handleGoogle };
};

export default useFetch;

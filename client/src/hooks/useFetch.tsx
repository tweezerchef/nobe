import { url } from 'inspector';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
        if (setUser) {
          console.log(data.user.userData);
          setUser(data.user.userData);
          localStorage.setItem('user', JSON.stringify(data.user.userData));
        }
        navigate('/home');
      } else {
        throw new Error(data?.message || 'error');
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { loading, error, handleGoogle };
};

export default useFetch;

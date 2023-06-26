import React, { useEffect, useState } from 'react';
import { getUserByEmail, createUser } from '~/api/users';
import { User } from '~/types/User';

interface AuthFormProps {
  setUser: (user: User) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needToRegister, setNeedToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const user = JSON.parse(userData) as User;
    setUser(user);
  }, [setUser]);

  const login = async () => {
    const user = await getUserByEmail(email);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else {
      setNeedToRegister(true);
    }
  };

  const register = async () => {
    const user = await createUser({ name, email });
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage('');
    setLoading(true);

    try {
      if (needToRegister) {
        await register();
      } else {
        await login();
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{needToRegister ? 'You need to register' : 'Log in to open todos'}</h1>

      <div>
        <label htmlFor='user-email'>Email</label>

        <input
          type='email'
          id='user-email'
          placeholder='Enter your email'
          disabled={loading || needToRegister}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        {!needToRegister && errorMessage && <p>{errorMessage}</p>}
      </div>

      {needToRegister && (
        <div>
          <label htmlFor='user-name'>Your Name</label>

          <input
            type='text'
            id='user-name'
            placeholder='Enter your name'
            required
            minLength={4}
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {needToRegister && errorMessage && <p>{errorMessage}</p>}
        </div>
      )}

      <div>
        <button type='submit'>{needToRegister ? 'Register' : 'Login'}</button>
      </div>
    </form>
  );
};

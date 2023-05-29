'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('token'));
  }, []);

  const router = useRouter();

  if (isAuthenticated) {
    router.push('/posts');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [variant, setVariant] = useState('login');

  // Handle the toggle between the sign up and sign in form
  const toggleVariant = useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const handleLogin = useCallback(async () => {
    api
      .post('/api/users/login', {
        email,
        password
      })
      .then(response => {
        const token = response.data.accessToken;

        if (!token) {
          console.log('Token not found');
        }

        // Store the user token on the local storage of the browser
        localStorage.clear();
        localStorage.setItem('token', token);

        router.push('/posts');
      })
      .catch(error => console.log(error));
  }, [email, password, router]);

  const handleRegister = useCallback(async () => {
    api
      .post('/api/users', {
        name,
        email,
        password
      })
      .then(response => {
        const data = response.data;

        if (!data) {
          console.log('ERROR REGISTERING');
        }

        setEmail('');
        setPassword('');
        setName('');

        toggleVariant();
      })
      .catch(error => console.log(error));
  }, [email, name, password, toggleVariant]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="
          flex w-[420px] flex-col gap-4
          px-8 py-12
        "
      >
        <h1 className="mb-2 text-2xl font-bold text-gray-50">
          {variant === 'login' ? 'Sign In' : 'Register'}
        </h1>

        {/* Just show the username if is on the register form */}
        {variant === 'register' && (
          <div className="flex flex-col gap-2">
            <Label content="Name" htmlFor="name" />
            <Input
              type="text"
              id="name"
              placeholder="Name"
              onChange={(event: any) => setName(event.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label content="Email" htmlFor="email" />
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(event: any) => setEmail(event.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label content="Password" htmlFor="password" />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event: any) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        <button
          onClick={variant === 'login' ? handleLogin : handleRegister}
          className="
            mt-4 rounded-lg bg-purple-500
            py-2 text-gray-100
            transition hover:bg-purple-700
          "
        >
          {variant === 'login' ? 'Login' : 'Sign up'}
        </button>

        <p className="font-light text-gray-100">
          {variant === 'login'
            ? 'First time using Posts?'
            : 'Already have an account?'}
          <span
            onClick={toggleVariant}
            className="ml-2 cursor-pointer hover:text-purple-500 hover:underline"
          >
            {variant === 'login' ? 'Create an account' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;

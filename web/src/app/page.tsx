'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

const Home = () => {
  const isAuthenticated = localStorage.getItem('token');
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
            <label
              className="text-md font-semibold text-gray-100"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="
              rounded-lg bg-gray-700
              px-2 py-2
              text-gray-200 placeholder:text-gray-300
            "
              type="text"
              id="name"
              placeholder="Name"
              required
              onChange={(event: any) => setName(event.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            className="text-md font-semibold text-gray-100"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="
              rounded-lg bg-gray-700
              px-2 py-2
              text-gray-200 placeholder:text-gray-300
            "
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(event: any) => setEmail(event.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-md font-semibold text-gray-100"
            htmlFor="email"
          >
            Password
          </label>
          <input
            className="
              rounded-lg bg-gray-700
              px-2 py-2
              text-gray-200 placeholder:text-gray-300
            "
            type="password"
            id="password"
            placeholder="Password"
            required
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

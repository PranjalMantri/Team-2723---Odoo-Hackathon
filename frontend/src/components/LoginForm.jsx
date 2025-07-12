import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic
    console.log({ email, password });
  };

  const handleGoogleLogin = () => {
    // TODO: Add Google login integration
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between border-b border-emerald-100 py-4">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-emerald-600"
          >
            <path
              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-lg font-bold">ReWear</h2>
        </div>
      </header>

      <main className="flex justify-center py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          <label className="block">
            <span className="text-base font-medium text-slate-800">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </label>

          <label className="block">
            <span className="text-base font-medium text-slate-800">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition duration-300"
          >
            Login
          </button>

          <div className="relative text-center text-slate-500 text-sm font-medium">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-300"></span>
            </span>
            <span className="relative bg-white px-3">or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-emerald-200 text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition duration-300"
          >
            Sign in with Google
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;

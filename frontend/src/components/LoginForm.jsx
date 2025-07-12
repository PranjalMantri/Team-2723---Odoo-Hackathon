import React, { useState } from "react";
import Heading from "./Heading";
import TextInput from "./TextInput";
import Button from "./Button"; // new reusable button
import Divider from "./Divider"; // new optional component for "or" separator

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between border-b border-emerald-100 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-emerald-600">ReWear</h2>
        </div>
      </header>

      <main className="flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm"
        >
          <Heading level={1} className="text-2xl font-bold mb-4">
            Login
          </Heading>

          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />

          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />

          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>

          <Divider>or</Divider>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            fullWidth
          >
            Sign in with Google
          </Button>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;

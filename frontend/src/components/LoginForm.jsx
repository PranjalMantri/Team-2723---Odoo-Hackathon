import React, { useState } from "react";
import Heading from "./Heading";
import TextInput from "./TextInput";
import Button from "./Button";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Submitting login form with:", { email, password });

      const response = await fetch("http://localhost:3000/api/auth/signin", {
        // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Login response:", data);

      if (response.ok) {
        console.log("Login successful:", data);
        navigate("/");
        // You might want to store the token and user data (e.g., in localStorage or context)
        // and then redirect the user to a dashboard or home page.
        // For example:
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        // window.location.href = "/dashboard";
      } else {
        setError(
          data.error ||
            data.errors?.[0]?.message ||
            "Login failed. Please try again."
        );
      }
    } catch (err) {
      console.error("Network error or unexpected issue:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google OAuth logic here
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

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

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Divider>or</Divider>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            fullWidth
            disabled={loading}
          >
            Sign in with Google
          </Button>

          <div className="relative text-center text-slate-500 text-sm font-medium">
            <span className="relative bg-white px-3">
              Not registered?
              <a
                href="/signup"
                className="text-emerald-600 hover:underline ml-1"
              >
                Create an account
              </a>
            </span>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;

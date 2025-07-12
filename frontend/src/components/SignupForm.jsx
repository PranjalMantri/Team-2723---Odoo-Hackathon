import React, { useState } from "react";
import Heading from "./Heading";
import TextInput from "./TextInput";
import Button from "./Button"; // Create this if not already

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Redirect to Google OAuth");
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
          <Heading level={1} className="text-2xl font-bold mb-4 text-center">
            Sign Up
          </Heading>

          {["email", "fullName", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <TextInput
                label={
                  field === "fullName"
                    ? "Full Name"
                    : field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${
                  field === "fullName" ? "full name" : field
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <Button type="submit" variant="primary" fullWidth>
            Register
          </Button>

          <div className="text-center text-sm text-slate-600">or</div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            fullWidth
          >
            Sign up with Google
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SignupForm;

import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', formData);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Redirect to Google OAuth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between border-b border-emerald-100 py-4">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 48 48" fill="none">
            <path d="M36.7273 44C33.9891 44..." fill="currentColor" />
          </svg>
          <h2 className="text-lg font-bold">ReWear</h2>
        </div>
      </header>

      <main className="flex justify-center py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

          {['email', 'fullName', 'password', 'confirmPassword'].map((field) => (
            <label key={field} className="block">
              <span className="text-base font-medium text-slate-800">
                {field === 'fullName' ? 'Full Name' : field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              </span>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field === 'fullName' ? 'full name' : field}`}
                className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </label>
          ))}

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-full font-semibold hover:bg-emerald-600 transition duration-300"
          >
            Register
          </button>

          <div className="text-center text-sm text-slate-600">or</div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full border border-emerald-300 text-emerald-700 py-3 rounded-full font-semibold hover:bg-emerald-50 transition duration-300"
          >
            Sign up with Google
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignupForm;

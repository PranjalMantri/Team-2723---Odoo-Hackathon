import { useState } from "react";
import { useNavigate } from "react-router-dom";

const inputClasses =
  "w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 ease-in-out";
const labelClasses = "block text-sm font-medium text-slate-700 mb-1";
const buttonBaseClasses =
  "py-3 px-6 rounded-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105";

// Heading Component (for a self-contained example)
const Heading = ({ level, children, className }) => {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
};

// TextInput Component (for a self-contained example)
const TextInput = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
};

// Button Component (for a self-contained example)
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) => {
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md";
      break;
    case "outline":
      variantClasses =
        "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm";
      break;
    default:
      variantClasses =
        "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md";
  }

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonBaseClasses} ${variantClasses} ${widthClass} ${disabledClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
    setMessage(""); // Clear any previous messages on input change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@") || !formData.email.trim()) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        // Call your new signup endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Account created successfully!");
        setMessageType("success");
        setErrors({});
        setFormData({
          email: "",
          fullName: "",
          password: "",
          confirmPassword: "",
        });
        console.log("Signup successful:", data);
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setMessage(data.error || "Failed to create account. Please try again.");
        setMessageType("error");
        console.error("Signup error:", data);
      }
    } catch (error) {
      setMessage("Network error. Could not connect to the server.");
      setMessageType("error");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // This would require a backend route for Google OAuth.
    // For now, it's just a placeholder.
    setMessage(
      "Google signup functionality needs to be implemented on the backend."
    );
    setMessageType("info");
    console.log("Redirect to Google OAuth (frontend placeholder)");
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
          className="w-full max-w-md space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm backdrop-blur-sm"
        >
          <Heading
            level={1}
            className="text-2xl font-bold mb-4 text-center text-slate-800"
          >
            Sign Up
          </Heading>

          {message && (
            <div
              className={`p-3 rounded-lg text-center ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

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

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center text-sm text-slate-600">or</div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            fullWidth
            disabled={loading}
          >
            Sign up with Google
          </Button>
          <div className="relative text-center text-slate-500 text-sm font-medium">
            <span className="relative bg-white px-3">
              Already registered?
              <a
                href="/signup"
                className="text-emerald-600 hover:underline ml-1"
              >
                Log In
              </a>
            </span>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignupForm;

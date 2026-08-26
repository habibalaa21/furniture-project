import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import styles from "./Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [id]: "",
    });

    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email validation
    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (formData.password === "") {
      newErrors.password = "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h1>Welcome Back</h1>
            <p>Log in to your Furniture. account.</p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className={styles.successMessage}>
              ✓ Logged in successfully! Welcome back.
            </div>
          )}

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>

              <div className={styles.inputWrapper}>
                <Mail size={18} aria-hidden="true" />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label htmlFor="password">Password</label>

              <div className={styles.inputWrapper}>
                <Lock size={18} aria-hidden="true" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className={styles.options}>
              <label className={styles.remember}>
                <input
                  id="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password" className={styles.forgotPassword}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button type="submit" withArrow>
              Log In
            </Button>
          </form>

          {/* Sign Up */}
          <p className={styles.signup}>
            Don't have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
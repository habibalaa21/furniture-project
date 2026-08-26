import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import styles from "./Signup.module.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });

    // Remove the error when the user starts fixing the field
    setErrors({
      ...errors,
      [id]: "",
    });

    setIsSubmitted(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Full name validation
    if (formData.name.trim() === "") {
      newErrors.name = "Please enter your full name.";
    }

    // Email validation
    if (formData.email.trim() === "") {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (formData.password === "") {
      newErrors.password = "Please enter a password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm password validation
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Terms validation
    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms & Conditions.";
    }

    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    // Everything is valid
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <h1>Create Account</h1>
            <p>
              Join us today and get <strong>25% OFF</strong> your first order.
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className={styles.successMessage}>
              ✓ Account created successfully! Welcome to Furniture.
            </div>
          )}

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className={styles.field}>
              <label htmlFor="name">Full Name</label>

              <div className={styles.inputWrapper}>
                <User size={18} aria-hidden="true" />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {errors.name && (
                <p className={styles.error}>{errors.name}</p>
              )}
            </div>

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
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className={styles.inputWrapper}>
                <Lock size={18} aria-hidden="true" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className={styles.passwordButton}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className={styles.error}>{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className={styles.terms}>
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                />

                <span>
                  I agree to the{" "}
                  <a href="#">Terms & Conditions</a>
                </span>
              </label>

              {errors.terms && (
                <p className={styles.error}>{errors.terms}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" withArrow>
              Create Account
            </Button>
          </form>

          {/* Login */}
          <p className={styles.login}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button.jsx";
import styles from "./Login.module.css";
import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Footer from "../components/Footer.jsx";

import { useAuth } from "../AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleChange = (e) => {
    const {
      id,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));

    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email
    if (formData.email.trim() === "") {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // Password
    if (formData.password === "") {
      newErrors.password =
        "Please enter your password.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ==========================================
    // GET SAVED ACCOUNT
    // ==========================================

    const savedUser =
      localStorage.getItem("furnitureUser");

    if (!savedUser) {
      setErrors({
        email:
          "No account found. Please sign up first.",
      });

      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (error) {
      setErrors({
        email:
          "Account data is invalid. Please sign up again.",
      });

      return;
    }

    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (
      formData.email.trim().toLowerCase() !==
        user.email.toLowerCase() ||
      formData.password !== user.password
    ) {
      setErrors({
        email:
          "Invalid email or password.",
      });

      return;
    }

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    login(user);

    setErrors({});
    setIsSubmitted(true);

    setTimeout(() => {
      navigate("/profile");
    }, 500);
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className={styles.page}>
        <div
          className={`container ${styles.container}`}
        >
          <div className={styles.card}>

            <div className={styles.header}>
              <h1>Welcome Back</h1>

              <p>
                Log in to your Furniture. account.
              </p>
            </div>

            {isSubmitted && (
              <div
                className={
                  styles.successMessage
                }
              >
                ✓ Logged in successfully!
                Welcome back.
              </div>
            )}

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className={styles.field}>
                <label htmlFor="email">
                  Email Address
                </label>

                <div
                  className={
                    styles.inputWrapper
                  }
                >
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {errors.email && (
                  <p className={styles.error}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}

              <div className={styles.field}>
                <label htmlFor="password">
                  Password
                </label>

                <div
                  className={
                    styles.inputWrapper
                  }
                >
                  <Lock size={18} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    className={
                      styles.passwordButton
                    }
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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
                  <p className={styles.error}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* OPTIONS */}

              <div className={styles.options}>

                <label
                  className={
                    styles.remember
                  }
                >
                  <input
                    id="remember"
                    type="checkbox"
                    checked={
                      formData.remember
                    }
                    onChange={handleChange}
                  />

                  <span>
                    Remember me
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className={
                    styles.forgotPassword
                  }
                >
                  Forgot password?
                </Link>

              </div>

              <Button
                type="submit"
                withArrow
              >
                Log In
              </Button>

            </form>

            <p className={styles.signup}>
              Don't have an account?{" "}
              <Link to="/signup">
                Sign up
              </Link>
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
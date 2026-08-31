import { useState } from "react";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Button from "../components/Button.jsx";

import styles from "./Signup.module.css";

import Navbar from "../components/Navbar";

import AnnouncementBar from "../components/AnnouncementBar.jsx";

import Footer from "../components/Footer";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

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

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // ==========================================
    // NAME
    // ==========================================

    if (formData.name.trim() === "") {
      newErrors.name =
        "Please enter your full name.";
    }

    // ==========================================
    // EMAIL
    // ==========================================

    const email =
      formData.email.trim().toLowerCase();

    if (email === "") {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // ==========================================
    // PASSWORD
    // ==========================================

    if (formData.password === "") {
      newErrors.password =
        "Please enter a password.";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    if (
      formData.confirmPassword === ""
    ) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // ==========================================
    // TERMS
    // ==========================================

    if (!formData.terms) {
      newErrors.terms =
        "You must agree to the Terms & Conditions.";
    }

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    // ==========================================
    // GET ALL USERS
    // ==========================================

    const savedUsers =
      localStorage.getItem(
        "furnitureUsers"
      );

    let users = [];

    try {
      users = savedUsers
        ? JSON.parse(savedUsers)
        : [];
    } catch {
      users = [];
    }

    // ==========================================
    // CHECK IF EMAIL ALREADY EXISTS
    // ==========================================

    const existingUser =
      users.find(
        (user) =>
          user.email.toLowerCase() ===
          email
      );

    if (existingUser) {
      setErrors({
        email:
          "An account with this email already exists.",
      });

      return;
    }

    // ==========================================
    // CREATE USER
    // ==========================================

    const nameParts =
      formData.name.trim().split(" ");

    const user = {
      id: Date.now(),

      firstName:
        nameParts[0] || "",

      lastName:
        nameParts
          .slice(1)
          .join(" ") || "",

      name:
        formData.name.trim(),

      email: email,

      password:
        formData.password,

      phone: "",

      address: "",

      image: "",
    };

    // ==========================================
    // ADD USER TO USERS ARRAY
    // ==========================================

    const updatedUsers = [
      ...users,
      user,
    ];

    localStorage.setItem(
      "furnitureUsers",
      JSON.stringify(updatedUsers)
    );

    // ==========================================
    // IMPORTANT
    // DON'T LOGIN THE USER
    // ==========================================

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "furnitureUser"
    );

    setErrors({});

    setIsSubmitted(true);

    // ==========================================
    // GO TO LOGIN
    // ==========================================

    setTimeout(() => {
      navigate("/login");
    }, 1000);
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

              <h1>
                Create Account
              </h1>

              <p>
                Join us today and get{" "}
                <strong>
                  25% OFF
                </strong>{" "}
                your first order.
              </p>

            </div>

            {isSubmitted && (
              <div
                className={
                  styles.successMessage
                }
              >
                ✓ Account created successfully!
                Welcome to Furniture.
              </div>
            )}

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div
                className={
                  styles.field
                }
              >

                <label htmlFor="name">
                  Full Name
                </label>

                <div
                  className={
                    styles.inputWrapper
                  }
                >

                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {errors.name && (
                  <p
                    className={
                      styles.error
                    }
                  >
                    {errors.name}
                  </p>
                )}

              </div>

              {/* EMAIL */}

              <div
                className={
                  styles.field
                }
              >

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
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                  />

                </div>

                {errors.email && (
                  <p
                    className={
                      styles.error
                    }
                  >
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PASSWORD */}

              <div
                className={
                  styles.field
                }
              >

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
                    placeholder="Create a password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
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
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}

                  </button>

                </div>

                {errors.password && (
                  <p
                    className={
                      styles.error
                    }
                  >
                    {errors.password}
                  </p>
                )}

              </div>

              {/* CONFIRM PASSWORD */}

              <div
                className={
                  styles.field
                }
              >

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div
                  className={
                    styles.inputWrapper
                  }
                >

                  <Lock size={18} />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <button
                    type="button"
                    className={
                      styles.passwordButton
                    }
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >

                    {showConfirmPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}

                  </button>

                </div>

                {errors.confirmPassword && (
                  <p
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.confirmPassword
                    }
                  </p>
                )}

              </div>

              {/* TERMS */}

              <div>

                <label
                  className={
                    styles.terms
                  }
                >

                  <input
                    id="terms"
                    type="checkbox"
                    checked={
                      formData.terms
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span>
                    I agree to the{" "}

                    <a href="#">
                      Terms & Conditions
                    </a>

                  </span>

                </label>

                {errors.terms && (
                  <p
                    className={
                      styles.error
                    }
                  >
                    {errors.terms}
                  </p>
                )}

              </div>

              <Button
                type="submit"
                withArrow
              >
                Create Account
              </Button>

            </form>

            <p
              className={
                styles.login
              }
            >
              Already have an account?{" "}

              <Link to="/login">
                Log in
              </Link>

            </p>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}
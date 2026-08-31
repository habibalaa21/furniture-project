
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Button from "../components/Button.jsx";

import styles from "./Login.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanEmail = email.trim().toLowerCase();

    // Check empty fields
    if (!cleanEmail || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Check password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Check passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get users
    const savedUsers = localStorage.getItem("furnitureUsers");

    if (!savedUsers) {
      setError("No account found. Please sign up first.");
      return;
    }

    let users = [];

    try {
      users = JSON.parse(savedUsers);
    } catch {
      setError("Account data is invalid.");
      return;
    }

    // Find user
    const userIndex = users.findIndex(
      (user) =>
        user.email &&
        user.email.toLowerCase() === cleanEmail
    );

    if (userIndex === -1) {
      setError("No account found with this email.");
      return;
    }

    // Update password
    users[userIndex].password = newPassword;

    // Save users
    localStorage.setItem(
      "furnitureUsers",
      JSON.stringify(users)
    );

    setSuccess(
      "Password changed successfully! You can now log in."
    );

    // Clear inputs
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main className={styles.page}>
        <div className={`container ${styles.container}`}>
          <div className={styles.card}>

            <div className={styles.header}>
              <h1>Forgot Password</h1>

              <p>
                Enter your email and create a new password.
              </p>
            </div>

            {success && (
              <div className={styles.successMessage}>
                ✓ {success}
              </div>
            )}

            {error && (
              <p className={styles.error}>
                {error}
              </p>
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

                <div className={styles.inputWrapper}>
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div className={styles.field}>
                <label htmlFor="newPassword">
                  New Password
                </label>

                <div className={styles.inputWrapper}>
                  <Lock size={18} />

                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className={styles.field}>
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className={styles.inputWrapper}>
                  <Lock size={18} />

                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                withArrow
              >
                Reset Password
              </Button>

            </form>

            <p className={styles.signup}>
              Remember your password?{" "}
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

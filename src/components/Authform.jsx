import "../Styles/Authform.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Authform() {
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const toggleForm = () => setIsRegister((prev) => !prev);

  // ---------------- EMAIL / PASSWORD AUTH ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isRegister) {
        if (!regEmail || !regPassword) {
          alert("Please enter email and password");
          return;
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          regEmail,
          regPassword
        );
        console.log("Registered:", res.user);
        alert("Registration successful");
      } else {
        if (!loginEmail || !loginPassword) {
          alert("Please enter email and password");
          return;
        }

        const res = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log("Logged in:", res.user);
        alert("Login successful");
      }
    } catch (error) {
      console.error(error.code, error.message);

      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/email-already-in-use":
          alert("Email already registered");
          break;
        case "auth/weak-password":
          alert("Password should be at least 6 characters");
          break;
        default:
          alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- GOOGLE AUTH ---------------
  const handleGoogleAuth = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 1️⃣ Google sign-in
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      if (!user) {
        throw new Error("No user returned from Google sign-in");
      }

      // 2️⃣ Get Firebase ID token
      const idToken = await user.getIdToken();

      console.log("Firebase ID Token:", idToken);

      // 3️⃣ Send token to backend
      const response = await fetch(
        "https://iit-jhack-backend.onrender.com/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error: ${text}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      alert("Google login successful");
    } catch (error) {
      console.error("Google auth flow failed:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        {/* ---------------- LOGIN ---------------- */}
        <div className="form-box login">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <input
                type={showLoginPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowLoginPassword((p) => !p)}
                disabled={isLoading}
              >
                {showLoginPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="google-auth">
              <div className="divider">
                <span>Or continue with</span>
              </div>

              <button
                type="button"
                className="btn-google"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <FcGoogle className="google-icon" />
                Sign in with Google
              </button>
            </div>

            <div className="logreg-link">
              <p>
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* ---------------- REGISTER ---------------- */}
        <div className="form-box register">
          <h2>Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <input
                type={showRegisterPassword ? "text" : "password"}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
              <label>Password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowRegisterPassword((p) => !p)}
                disabled={isLoading}
              >
                {showRegisterPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>

            <div className="google-auth">
              <div className="divider">
                <span>Or sign up with</span>
              </div>

              <button
                type="button"
                className="btn-google"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <FcGoogle className="google-icon" />
                Sign up with Google
              </button>
            </div>

            <div className="logreg-link">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* ---------------- INFO TEXT ---------------- */}
        <div className="info-text login">
          <h2>Welcome Back!</h2>
          <p>Login with your personal details to continue.</p>
        </div>

        <div className="info-text register">
          <h2>Hello, Friend!</h2>
          <p>Enter your details and start your journey with us.</p>
        </div>

        {/* ---------------- BACKGROUND ---------------- */}
        <div className="bg-animate"></div>
        <div className="bg-animate2"></div>
      </div>
    </div>
  );
}

export default Authform;

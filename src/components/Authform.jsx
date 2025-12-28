import "../Styles/Authform.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Authform() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showLoginEmail, setShowLoginEmail] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/AiGenerator'); // Default redirect

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
      // Reset form or show success message
    }, 2000);
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
      alert("Google authentication successful!");
      // In real app, you would redirect to Google OAuth
      // window.location.href = "YOUR_GOOGLE_OAUTH_URL";
    }, 1500);
  };

  return (
    <div className="login-page-container">
      <div className={`wrapper ${isRegister ? "active" : ""} black-white-theme`}>
        {/* Login Form */}
        <div className="form-box login">
          <h2 className="animation">Login</h2>
          <form className="animation" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                id="loginEmail"
                type="text"
                placeholder=" "
                required
              />
              <label htmlFor="loginEmail">Email</label>
              <i className="bx bxs-user"></i>
              <span className="error-message"></span>
            </div>
            <div className="input-box">
              <input
                id="loginPassword"
                type={showLoginPassword ? "text" : "password"}
                placeholder=" "
                required
              />
              <label htmlFor="loginPassword">Password</label>
              <i className="bx bxs-lock-alt"></i>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                <i className={`bx ${showLoginPassword ? "bx-hide" : "bx-show"}`}></i>
              </button>
            </div>

            <div className="forgot-password">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            <div className="redirect-options">
              <p>After login, go to:</p>
              <div className="redirect-buttons">
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/AiGenerator' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/AiGenerator')}
                >
                  AI Generator
                </button>
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/colleges' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/colleges')}
                >
                  Colleges
                </button>
              </div>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Google Login Button */}
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
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Register Form */}
        <div className="form-box register">
          <h2 className="animation">Register</h2>
          <form className="animation" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                id="regUsername"
                type="text"
                placeholder=" "
                required
              />
              <label htmlFor="regUsername">Username</label>
              <i className="bx bxs-user"></i>
              <span className="error-message"></span>
            </div>

            <div className="input-box">
              <input
                id="loginEmail"
                type="text"
                placeholder=" "
                required
              />
              <label htmlFor="loginEmail">Email</label>
              <i className="bx bxs-user"></i>
              <span className="error-message"></span>
            </div>
            <div className="input-box">
              <input
                id="regPassword"
                type={showRegisterPassword ? "text" : "password"}
                placeholder=" "
                required
              />
              <label htmlFor="regPassword">Password</label>
              <i className="bx bxs-lock-alt"></i>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                <i className={`bx ${showRegisterPassword ? "bx-hide" : "bx-show"}`}></i>
              </button>
              <span className="error-message"></span>
            </div>

            <div className="redirect-options">
              <p>After registration, go to:</p>
              <div className="redirect-buttons">
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/AiGenerator' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/AiGenerator')}
                >
                  AI Generator
                </button>
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/colleges' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/colleges')}
                >
                  Colleges
                </button>
              </div>
            </div>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>

            {/* Google Sign Up Button */}
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
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Info Texts */}
        <div className="info-text login">
          <h2 className="animation">Welcome Back!</h2>
          <p className="animation">
            To keep connected with us please login with your personal info.
          </p>
        </div>
        <div className="info-text register">
          <h2 className="animation">Hello, Friend!</h2>
          <p className="animation">
            Enter your personal details and start your journey with us.
          </p>
        </div>

        {/* Background Animations */}
        <div className="bg-animate"></div>
        <div className="bg-animate2"></div>
      </div>
    </div>
  );
}

export default Authform;

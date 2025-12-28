import "../Styles/Authform.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"; // Add this import

import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Authform() {
  const navigate = useNavigate(); // Add this hook
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showLoginEmail, setShowLoginEmail] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const toggleForm = () => setIsRegister((prev) => !prev);

  async function sendIdTokenToBackend(user) {
    const idToken = await user.getIdToken(true); // force fresh token

    const res = await fetch(
      "https://iit-jhack-backend.onrender.com/auth/google",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return res.json(); // This now returns {status, uid, profileCompleted}
  }

  // ---------------- EMAIL / PASSWORD AUTH ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isRegister) {
        if (!regEmail || !regPassword) {
          alert("Please enter email and password");
          setIsLoading(false);
          return;
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          regEmail,
          regPassword
        );
        console.log("Registered:", res.user);
        const backendResponse = await sendIdTokenToBackend(res.user);
        console.log("Backend response:", backendResponse);

        // Check profile completion and redirect
        if (backendResponse.profileCompleted === false) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
      } else {
        if (!loginEmail || !loginPassword) {
          alert("Please enter email and password");
          setIsLoading(false);
          return;
        }

        const res = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log("Logged in:", res.user);
        const backendResponse = await sendIdTokenToBackend(res.user);
        console.log("Backend response:", backendResponse);

        // Check profile completion and redirect
        if (backendResponse.profileCompleted === false) {
          navigate("/profile");
        } else {
          navigate("/home");
        }
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

      // Check profile completion and redirect
      if (data.profileCompleted === false) {
        navigate("/profile");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Google auth flow failed:", error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div
        className={`wrapper ${isRegister ? "active" : ""} black-white-theme`}
      >
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
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <label htmlFor="loginEmail">Email</label>
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                id="loginPassword"
                type={showLoginPassword ? "text" : "password"}
                placeholder=" "
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <label htmlFor="loginPassword">Password</label>
              <i className="bx bxs-lock-alt"></i>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                <i
                  className={`bx ${showLoginPassword ? "bx-hide" : "bx-show"}`}
                ></i>
              </button>
            </div>

            <div className="forgot-password">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
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

        {/* Register Form */}
        <div className="form-box register">
          <h2 className="animation">Register</h2>
          <form className="animation" onSubmit={handleSubmit}>
            <div className="input-box">
              <input id="regUsername" type="text" placeholder=" " required />
              <label htmlFor="regUsername">Username</label>
              <i className="bx bxs-user"></i>
              <span className="error-message"></span>
            </div>

            <div className="input-box">
              <input
                id="regEmail"
                type="text"
                placeholder=" "
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <label htmlFor="regEmail">Email</label>
              <i className="bx bxs-user"></i>
              <span className="error-message"></span>
            </div>
            <div className="input-box">
              <input
                id="regPassword"
                type={showRegisterPassword ? "text" : "password"}
                placeholder=" "
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              <label htmlFor="regPassword">Password</label>
              <i className="bx bxs-lock-alt"></i>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                <i
                  className={`bx ${
                    showRegisterPassword ? "bx-hide" : "bx-show"
                  }`}
                ></i>
              </button>
              <span className="error-message"></span>
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

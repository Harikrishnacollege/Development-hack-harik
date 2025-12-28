import "../Styles/Authform.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Authform() {
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showLoginEmail, setShowLoginEmail] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset form or show success message
    }, 2000);
  };

  // Handle Google authentication
  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
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
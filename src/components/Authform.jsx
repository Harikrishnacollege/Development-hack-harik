import "../Styles/Authform.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

function Authform() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showLoginEmail, setShowLoginEmail] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/AiGenerator'); // Default redirect

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email') || document.getElementById(isRegister ? 'regEmail' : 'loginEmail')?.value;
    const name = isRegister ? (formData.get('username') || document.getElementById('regUsername')?.value) : null;
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Create user object and login
      const userData = {
        email: email,
        name: name || email?.split('@')[0] || 'User',
        loginMethod: 'email'
      };
      login(userData);
      // Navigate to selected page after successful login
      navigate(redirectTo);
    }, 1500);
  };

  // Handle Google authentication
  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      // Create user object and login
      const userData = {
        email: 'user@gmail.com',
        name: 'Google User',
        loginMethod: 'google'
      };
      login(userData);
      // Navigate to selected page after successful Google auth
      navigate(redirectTo);
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
                  className={`redirect-btn ${redirectTo === '/' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/')}
                >
                  AI Generator
                </button>
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/')}
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
                name="username"
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
                id="regEmail"
                name="email"
                type="email"
                placeholder=" "
                required
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
                  className={`redirect-btn ${redirectTo === '/' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/')}
                >
                  AI Generator
                </button>
                <button 
                  type="button"
                  className={`redirect-btn ${redirectTo === '/' ? 'active' : ''}`}
                  onClick={() => setRedirectTo('/')}
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
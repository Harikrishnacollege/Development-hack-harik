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
import { verifyGoogleAuth } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import ToastContainer from "./ToastContainer";

function Authform() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toasts, toast, removeToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const authenticateWithBackend = async (user) => {
    const idToken = await user.getIdToken(true);
    const backendResponse = await verifyGoogleAuth(idToken);

    // save uid + profileCompleted in context + localStorage
    login(backendResponse);

    if (!backendResponse.profileCompleted) {
      navigate("/profile-completion");
    } else {
      navigate("/profile");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        const res = await createUserWithEmailAndPassword(
          auth,
          regEmail,
          regPassword
        );
        await authenticateWithBackend(res.user);
      } else {
        const res = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        await authenticateWithBackend(res.user);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await authenticateWithBackend(res.user);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        <div className="form-box login">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={isLoading}>
              Login
            </button>

            <button type="button" onClick={handleGoogleAuth}>
              <FcGoogle /> Sign in with Google
            </button>

            <p>
              No account?{" "}
              <a href="#" onClick={() => setIsRegister(true)}>
                Register
              </a>
            </p>
          </form>
        </div>

        <div className="form-box register">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={isLoading}>
              Register
            </button>

            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsRegister(false)}>
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authform;

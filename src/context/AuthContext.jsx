import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  loadAuthState,
  saveAuthState,
  clearAuthState,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    uid: null,
    profileCompleted: false,
    isAuthenticated: false,
    loading: true,
  });

  // Hydrate from localStorage
  useEffect(() => {
    const stored = loadAuthState();
    if (stored?.uid) {
      setAuthState({
        uid: stored.uid,
        profileCompleted: stored.profileCompleted ?? false,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Login after backend auth
  const login = ({ uid, profileCompleted }) => {
    saveAuthState({ uid, profileCompleted });

    setAuthState({
      uid,
      profileCompleted,
      isAuthenticated: true,
      loading: false,
    });
  };

  // Mark profile completed (AFTER profile form submit)
  const markProfileCompleted = () => {
    setAuthState((prev) => {
      const updated = {
        ...prev,
        profileCompleted: true,
      };

      saveAuthState({
        uid: updated.uid,
        profileCompleted: true,
      });

      return updated;
    });
  };

  const logout = () => {
    clearAuthState();
    setAuthState({
      uid: null,
      profileCompleted: false,
      isAuthenticated: false,
      loading: false,
    });
  };

  const value = useMemo(
    () => ({ authState, login, logout, markProfileCompleted }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

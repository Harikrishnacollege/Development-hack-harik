const STORAGE_KEY = "auth_state";

export const saveAuthState = ({ uid, profileCompleted }) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      uid,
      profileCompleted,
      isAuthenticated: true,
    })
  );
};

export const loadAuthState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearAuthState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

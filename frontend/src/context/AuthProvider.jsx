import { useState, useCallback, useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { getCurrentUser } from "../api/users";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("access_token");

    return {
      token,
      user: null,
      loading: false,
    };
  });


  const login = useCallback(async (credentials) => {
    const data = await apiLogin(credentials);

    localStorage.setItem("access_token", data.access_token);

    const user = await getCurrentUser();

    setAuth({
      token: data.access_token,
      user,
      loading: false,
    });

    return data;
  }, []);

  const register = useCallback(async (userData) => {
    return await apiRegister(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");

    setAuth((prev) => ({
    ...prev,
    token: null,
    user: null,
    loading: false,
  }));
  }, []);

  useEffect(() => {
    async function loadUser() {
      if (!auth.token) return;

      try {
        const user = await getCurrentUser();

        setAuth(prev => ({
          ...prev,
          user,
        }));
      } catch {
        logout();
      }
    }

    loadUser();
  }, [auth.token, logout]);

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      loading: auth.loading,
      isAuthenticated: !!auth.token,
      login,
      register,
      logout,
    }),
    [auth, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
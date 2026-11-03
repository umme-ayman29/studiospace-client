"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api("/auth/login", { method: "POST", body: { email, password } });
    setUser(data.user);
    return data.user;
  };

  const register = (payload) => api("/auth/register", { method: "POST", body: payload });

  const googleLogin = async (credential) => {
    const data = await api("/auth/google", { method: "POST", body: { credential } });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
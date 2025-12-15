import React, { createContext, useContext, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const AuthContext = createContext();

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const PUBLIC_HEADERS = {
  "x-app-token": APP_TOKEN,
  "Content-Type": "application/json",
};

const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_ROOT}/users/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`, "x-app-token": APP_TOKEN },
  });
  if (!response.ok) throw new Error("Token invalid");
  const result = await response.json();
  return result.data || result;
};

const fetchUserFavorites = async (token) => {
  try {
    const response = await fetch(`${API_ROOT}/users/favorites`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`, "x-app-token": APP_TOKEN },
    });

    if (!response.ok) return [];

    const result = await response.json();
    const data = result.data || result;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Lỗi lấy danh sách yêu thích:", error);
    return [];
  }
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const [favorites, setFavorites] = useState([]);

  const [isInitializing, setIsInitializing] = useState(true);

  const refreshFavorites = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const favs = await fetchUserFavorites(token);
      setFavorites(favs);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROOT}/users/register`, {
        method: "POST",
        headers: PUBLIC_HEADERS,
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed");
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const [userData, userFavs] = await Promise.all([
            fetchUserProfile(token),
            fetchUserFavorites(token),
          ]);
          setUser(userData);
          setFavorites(userFavs);
        } catch (e) {
          console.error("Lỗi xác thực:", e);
          localStorage.removeItem("authToken");
          setUser(null);
          setFavorites([]);
        }
      }
      setIsInitializing(false);
    };
    initialize();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_ROOT}/users/login`, {
        method: "POST",
        headers: PUBLIC_HEADERS,
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      const { token } = result;
      localStorage.setItem("authToken", token);

      const userData = await fetchUserProfile(token);
      const userFavs = await fetchUserFavorites(token);

      setUser(userData);
      setFavorites(userFavs);

      return result;
    } catch (err) {
      setError(err.message);
      localStorage.removeItem("authToken");
      setFavorites([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setFavorites([]);
    window.location.href = "/login";
  };

  const value = {
    user,
    setUser,
    favorites,
    refreshFavorites,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error,
    isInitializing,
  };

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-[rgb(var(--foreground-rgb))]">
        <Loader2 className="mr-3 h-6 w-6 animate-spin text-blue-500" />
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

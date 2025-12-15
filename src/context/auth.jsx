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
  const url = `${API_ROOT}/users/profile`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-app-token": APP_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Token is invalid or expired.");
  }

  const result = await response.json();
  return result.data || result;
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  const [isInitializing, setIsInitializing] = useState(true);

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

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to register. Please try again"
        );
      }

      return result;
    } catch (err) {
      console.log("Auth register error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const initialize = async () => {
      if (token) {
        try {
          const userData = await fetchUserProfile(token);
          setUser(userData);
        } catch (e) {
          console.error("Lỗi xác thực token, đăng xuất:", e);
          localStorage.removeItem("authToken");
          setUser(null);
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

      if (!response.ok) {
        throw new Error(result.message || "Username or password is incorrect");
      }

      const { token } = result;

      localStorage.setItem("authToken", token);

      const fullUserData = await fetchUserProfile(token);

      setUser(fullUserData);

      return result;
    } catch (err) {
      console.log("Auth login error:", err);
      setError(err.message);
      localStorage.removeItem("authToken");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    window.location.href = "/login";
  };

  const value = {
    user,
    setUser,
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
        Đang tải dữ liệu người dùng...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, saveUsers, getCurrentUser, saveCurrentUser, removeCurrentUser } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = getUsers();
    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    return {
      success: true,
      message: "Account created successfully.",
    };
  };

  const login = ({ email, password }) => {
    const users = getUsers();
    const foundUser = users.find((item) =>item.email.toLowerCase() === email.toLowerCase() &&item.password === password);

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
    };

    saveCurrentUser(sessionUser);
    setUser(sessionUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
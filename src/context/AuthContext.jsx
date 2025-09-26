import React, { createContext, useState, useEffect } from "react";

/**
 * Contexto de autenticación
 * Proporciona el estado de usuario y funciones de login/logout
 */

export const AuthContext = createContext();

/**
 * Componente proveedor del contexto de autenticación
 * Envuelve toda la aplicación para que los componentes puedan acceder a `user`, `login` y `logout`
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Revisar si ya hay usuario guardado en localStorage al cargar la app
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

   /**
   * Login del usuario
   * @param {Object} userData - Datos del usuario
   * @param {string} token - Token JWT recibido del backend
   */
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

    /**
   * Logout del usuario
   * Elimina datos del localStorage y reinicia el estado
   */
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
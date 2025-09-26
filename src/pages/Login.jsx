import React from 'react';
// Componente que contiene el formulario de inicio de sesión
import LoginForm from "../components/InfoLogin";

/**
 * Componente de la página de Login
 * Renderiza el formulario de inicio de sesión dentro de un contenedor.
 */
const Login = () => {
  return (
    <div>
      {/* Mostrar formulario de login */}
      <LoginForm />
    </div>
  )
}

export default Login;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const InfoLogin = () => {
  // Estados controlados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Contexto de autenticación (maneja el login global)
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

    /**
   * Maneja el inicio de sesión
   * 1. Envía credenciales al backend.
   * 2. Guarda el usuario y token en el contexto global si es exitoso.
   * 3. Muestra alertas con SweetAlert según el resultado.
   */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    // Petición POST al backend para login
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Guardamos usuario y token en el contexto de Auth
      login(data.user, data.token);
      
      console.log("Login exitoso ✅", data);

      // Notificación de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Login exitoso!',
        text: `Bienvenido ${data.user.name}`,
        timer: 1500,
        showConfirmButton: false
      });

      // Redirigir al home
      navigate("/");
    } else {
      // Error controlado (ej: credenciales inválidas)
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: data.msg || 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    // Error de conexión o servidor caído
    console.error("Error en login:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor'
    });
  }
};

  /**
   * Redirige al home ("/")
   */
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8B5E3C] to-[#F7C6C7]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Título del formulario */}
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión
        </h1>

        {/* Formulario de login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Campo Email */}
          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* Campo Password */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* Botón de Ingreso */}
          <button
            type="submit"
            className="w-full bg-[#8B5E3C] text-white py-2 rounded-md hover:bg-[#704A2B] transition"
          >
            Iniciar Sesión
          </button>

          {/* Botón de volver a Home */}
          <button
            type="button"
            onClick={goHome}
            className="w-full mt-2 border border-[#8B5E3C] text-[#8B5E3C] py-2 rounded-md hover:bg-[#F7C6C7] transition"
          >
            Volver a Home
          </button>
        </form>

      </div>
    </div>
  )
}

export default InfoLogin

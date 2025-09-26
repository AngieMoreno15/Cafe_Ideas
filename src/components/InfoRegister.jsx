import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const InfoRegister = () => {
  // Estados controlados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

    /**
   * Maneja el envío del formulario de registro.
   * 1. Valida que las contraseñas coincidan.
   * 2. Envía los datos al backend.
   * 3. Muestra feedback al usuario según la respuesta.
   */

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación: contraseñas iguales
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: 'warning',
        title: 'Ups...',
        text: 'Las contraseñas no coinciden',
        confirmButtonColor: '#8B5E3C'
      });
    }

    try {
    // Llamada al backend (mejor usar variable de entorno en vez de localhost fijo)
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nombre,
        email,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Registro exitoso
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Tu cuenta ha sido registrada con éxito. ',
        confirmButtonColor: '#8B5E3C'
      }).then(() => navigate('/login'));

    } else {
      // Error controlado desde backend
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.msg || 'Error al registrar',
        confirmButtonColor: '#E69A9A'
      });
    }
  } catch (error) {
    // Error de red o servidor caído
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error en el servidor',
      confirmButtonColor: '#E69A9A'
    });
  }
};

  /**
   * Redirige al home ("/") cuando el usuario hace clic en "Volver a Home".
   */
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-[#8B5E3C] to-[#F7C6C7]">

      {/* Título del formulario */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Cuenta
        </h1>

        {/* Formulario de registro */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
          </div>

          {/* Campo Confirmar contraseña */}
          <div>
            <label className="block text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
          </div>

          {/* Botón Registrar */}
          <button
            type="submit"
            className="w-full bg-[#8B5E3C] text-white py-2 rounded-md hover:bg-[#704A2B] transition"
          >
            Registrar
          </button>

          {/* Botón Volver a Home */}
          <button
            type="button"
            onClick={goHome}
            className="w-full mt-2 border border-[#8B5E3C] text-[#8B5E3C] py-2 rounded-md hover:bg-[#F7C6C7] transition"
          >
            Volver a Home
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          ¿Ya tienes una cuenta?{' '}
          <a href="#/login" className="text-[#8B5E3C] hover:underline">
            Inicia Sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default InfoRegister
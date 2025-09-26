import {Menu, X} from "lucide-react";
import { useState, useContext } from "react"; 
import logo from "../assets/logo.png";
import {navItems} from "../constants/index";
import { AuthContext } from "../context/AuthContext";

/**
 * Navbar principal de la aplicación.
 *
 * 📌 Características:
 * - Muestra enlaces de navegación (navItems).
 * - Cambia entre versión desktop (horizontal) y móvil (drawer).
 * - Usa AuthContext para mostrar saludo y acciones de login/logout.
 *
 * ⚠️ Notas:
 * - Se recomienda usar <Link /> en vez de <a> para navegación interna con React Router.
 * - El menú móvil tiene animación slide-in para mejor UX.
 */

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-[#F2C1B6] shadow-md">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            {/* Logo */}
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <span className="text-xl tracking-tight text-[#3C6373] font-bold">EL CAFÉ DE LAS IDEAS</span>
          </div>

          {/* Links en desktop */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-[#3C6373] transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Acciones usuario en desktop */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {user ? (
              <>
                <span className="text-2xl md:text-xl font-medium text-[#3C6373]">
                  Hola, {user.name} 👋
                </span>
                <button
                  onClick={logout}
                  className="py-2 px-3 border border-[#3C6373] text-[#3C6373] rounded-xl hover:bg-[#F5CBCB] transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <a href="#/login" className="py-2 px-3 border rounded-xl">
                  Iniciar sesión
                </a>
                <a
                  href="#/register"
                  className="bg-gradient-to-r from-[#9ECAD6] to-[#F5CBCB] text-[#000000] py-2 px-3 rounded-xl"
                >
                  Crear una cuenta
                </a>
              </>
            )}
          </div>

          {/* Botón menú móvil */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} aria-label="Abrir menú de navegación">
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Drawer móvil */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-[#F5D6D6] w-full p-12 flex flex-col justify-center items-center lg:hidden transition-transform duration-300">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-3 hover:text-[#3C6373] transition-colors">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>

            {/* Acciones usuario en móvil */}
            <div className="flex space-x-6 mt-4">
              {user ? (
                <>
                  <span className="text-[#3C6373] font-medium">
                    Hola, {user.name} 👋
                  </span>
                  <button
                    onClick={logout}
                    className="py-2 px-3 border border-[#3C6373] text-[#3C6373] rounded-xl hover:bg-[#F5CBCB] transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <a href="#/login" className="py-2 px-3 border rounded-2xl">
                    Iniciar sesión
                  </a>
                  <a
                    href="#/register"
                    className="bg-gradient-to-r from-[#9ECAD6] to-[#F5CBCB] text-[#000000] py-2 px-3 border rounded-2xl"
                  >
                    Crear una cuenta
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar
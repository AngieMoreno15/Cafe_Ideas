import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import slogan_logo from "../assets/slogan_logo.png";
import { navItems } from "../constants/index"; 

// Componente Footer
// Muestra la parte inferior del sitio con el eslogan, enlaces de navegación y redes sociales
const Footer = () => {
  return (
    <footer className="bg-[#3B3B3B] text-[#F2E8DF] py-10 mt-12">

      {/* Contenedor principal dividido en 1, 2 o 3 columnas según el tamaño de pantalla */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Columna 1: Logo + eslogan */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={slogan_logo} alt="slogan_logo" className="h-28 w-auto mb-4 rounded-lg"/>
          <p className="text-center sm:text-left text-lg">
            Donde el café inspira, los libros hablan y las ideas viajan.
          </p>
        </div>

        {/* Columna 2: Enlaces de navegación */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-xl mb-3 text-[#F5CBCB]">Enlaces</h3>
          <ul className="space-y-2 text-center sm:text-left">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-[#9ECAD6] transition-colors">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Redes sociales */}
        <div className="flex flex-col items-center sm:items-end">
          <h3 className="font-bold text-xl mb-3 text-[#F5CBCB]">Conéctate</h3>
          <div className="flex space-x-6 mb-4">
            <a href="#" className="hover:text-[#9ECAD6]"><Instagram size={28} /></a>
            <a href="#" className="hover:text-[#9ECAD6]"><Twitter size={28} /></a>
            <a href="#" className="hover:text-[#9ECAD6]"><Facebook size={28} /></a>
          </div>
        </div>
      </div>
      
      {/* Línea inferior con derechos de autor */}
      <div className="text-center text-sm text-[#F2E8DF] mt-10 border-t border-[#F2C1B6] pt-4">
        © 2025 El Café de las Ideas · Creado con ☕ y 📚
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Info from "../components/InfoAbout";

/**
 * Componente de la página "About"
 * Muestra información general de la aplicación o del proyecto.
 * Incluye Navbar al inicio y Footer al final.
 */
const About = () => {
  return (
    <div>
        {/* Navbar */}
        <Navbar />
        {/* Contenido principal */}
        <Info />
        {/* Footer */}
        <Footer />
    </div>
  )
}

export default About
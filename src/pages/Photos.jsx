import React from "react";

// Componente que renderiza el álbum de fotos
import PhotosPage from "../components/Album"; 

// Componentes reutilizables de layout
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Photos = () => {
  return (
    <div>
      {/* Barra de navegación */}
      <Navbar />

      {/* Sección principal con el álbum de fotos */}
      <section className="container mx-auto px-6 py-12">
        <PhotosPage />
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Photos;
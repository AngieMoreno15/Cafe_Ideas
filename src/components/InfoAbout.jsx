import React from 'react'
// Importamos las imágenes que vamos a usar en la sección
import heroImage from "../assets/LibroventanaCafe.jpg";
import imageTop from "../assets/ConejoCafe.jpg";
import imageLeft from "../assets/CafeAlaire.jpg";
import imageRight from "../assets/CafeHeladojpg.jpg";

// Componente principal "InfoAbout"
// Muestra una sección con imagen de fondo y un bloque con texto e imágenes decorativas
const InfoAbout = () => {
  return (
    <section className="relative w-full">
      {/* Imagen principal tipo "hero" */}
      <div className="w-full h-[500px] md:h-[600px] overflow-hidden relative">
        {/* Imagen de portada */}
        <img src={heroImage} alt="hero" className="w-full h-full object-cover"/>
        {/* Capa semitransparente para oscurecer la imagen y mejorar la legibilidad del contenido */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Contenedor principal con el contenido superpuesto */}
      <div className="max-w-6xl mx-auto -mt-32 md:-mt-40 bg-white/95 rounded-xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-6 relative z-10">
        {/* Columna izquierda: Texto de presentación */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center !text-[#A67B5B]">Acerca de mí</h1>
          {/* Texto introductorio */}
          <p className="text-gray-700 text-lg md:text-xl">
            <p>¡Hola! Soy Angie Moreno, este es mi pequeño rincón donde los libros, cafés y las cafeterías se mezclan para crear momentos especiales ☕📚.</p>
            <br></br>
            <p>Aquí comparto mis pasiones: De lecturas que inspiran, lugares donde pausar , respirar y pequeños descubrimientos que alegran el día.</p>
            <br></br>
            <p>Mi intención es que cada visita a este espacio te deje un instante de calma, alegría y encuentres inspiración para disfrutar de esos detalles que hacen la vida más bonita. ¡Siéntete como en casa acompañandome a descubrir cada libro, café y rincón que valga la pena! 💛</p>
          </p>
        </div>

        {/* Columna derecha: Collage de imágenes */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Imagen superior grande */}
          <img src={imageTop} alt="collage-top" className="w-full h-40 md:h-48 object-cover rounded-lg"/>
          {/* Dos imágenes pequeñas lado a lado */}
          <div className="flex gap-4">
            <img src={imageLeft} alt="collage-left" className="w-1/2 h-32 md:h-40 object-cover rounded-lg"/>
            <img src={imageRight} alt="collage-right" className="w-1/2 h-32 md:h-40 object-cover rounded-lg"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoAbout
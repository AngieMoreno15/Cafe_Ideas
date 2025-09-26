import img1 from "../assets/SectionHero/CatWhitbookd.jpg";
import img2 from "../assets/SectionHero/Coffee.jpg";
import img3 from "../assets/SectionHero/Coffeeandlibrary.jpg";
import React from 'react'

// Componente HeroSection
// Muestra un "hero" visual con imágenes en cuadrícula y un mensaje principal en el centro
const HeroSection = () => {
  return (
<section className="relative w-full">

    {/* Galería de imágenes en grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {/* Imagen 1 */}
        <img src={img1} alt="Imagen 1" className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"/>
        {/* Imagen 2 */}
        <img src={img2} alt="Imagen 2" className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"/>
        {/* Imagen 3 (ocupa 2 columnas en pantallas pequeñas y 1 en pantallas grandes) */}
        <img src={img3} alt="Imagen 3" className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover sm:col-span-2 md:col-span-1"/>
    </div>

    {/* Caja de texto superpuesta en el centro inferior */}
    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-[#FFEAEA] shadow-lg rounded-xl p-4 sm:p-6 w-[90%] sm:w-[60%] md:w-[60%] text-center">
        {/* Texto principal (slogan) */}
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#3B3B3B]">
            El aroma del café, <span className="text-[#3C6373]">el sabor de las ideas.</span>
        </h1>
    </div>
</section>
  )
}

export default HeroSection;
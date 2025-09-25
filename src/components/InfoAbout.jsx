import React from 'react'
import heroImage from "../assets/LibroventanaCafe.jpg";
import imageTop from "../assets/ConejoCafe.jpg";
import imageLeft from "../assets/CafeAlaire.jpg";
import imageRight from "../assets/CafeHeladojpg.jpg";


const InfoAbout = () => {
  return (
    <section className="relative w-full">
      <div className="w-full h-[500px] md:h-[600px] overflow-hidden relative">
        <img src={heroImage} alt="hero" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-6xl mx-auto -mt-32 md:-mt-40 bg-white/95 rounded-xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-6 relative z-10">
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center !text-[#A67B5B]">Acerca de mí</h1>
          <p className="text-gray-700 text-lg md:text-xl">
            <p>¡Hola! Soy Angie Moreno, y este es mi pequeño rincón donde los libros, los cafés y las cafeterías se mezclan para crear momentos especiales ☕📚.</p>
            <br></br>
            <p>Aquí comparto mis pasiones: lecturas que inspiran, lugares donde pausar y respirar, y pequeños descubrimientos que alegran el día.</p>
            <br></br>
            <p>Mi intención es que cada visita a este espacio te deje un instante de calma y alegría, y que encuentres inspiración para disfrutar de esos detalles que hacen la vida más bonita. ¡Siéntete como en casa y acompáñame a descubrir cada libro, café y rincón que valga la pena! 💛</p>
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <img src={imageTop} alt="collage-top" className="w-full h-40 md:h-48 object-cover rounded-lg"/>
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
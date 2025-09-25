import React from "react";

// Importamos tus fotos desde assets
import img1 from "../assets/Album/Album (1).jpg";
import img2 from "../assets/Album/Album (2).jpg";
import img3 from "../assets/Album/Album (3).jpg";
import img4 from "../assets/Album/Album (4).jpg";
import img5 from "../assets/Album/Album (5).jpg";
import img6 from "../assets/Album/Album (6).jpg";
import img7 from "../assets/Album/Album (7).jpg";
import img8 from "../assets/Album/Album (8).jpg";
import img9 from "../assets/Album/Album (9).jpg";
import img10 from "../assets/Album/Album (10).jpg";
import img11 from "../assets/Album/Album (11).jpg";
import img12 from "../assets/Album/Album (12).jpg";
import img13 from "../assets/Album/Album (13).jpg";
import img14 from "../assets/Album/Album (14).jpg";

const PhotosPage = () => {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#A67B5B] mb-10">
        Galería de momentos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <img src={img1} alt="foto1" className="w-full h-64 object-cover rounded-xl lg:col-span-2" />
        <img src={img2} alt="foto2" className="w-full h-64 object-cover rounded-xl" />
        <img src={img3} alt="foto3" className="w-full h-64 object-cover rounded-xl" />

        <img src={img4} alt="foto4" className="w-full h-64 object-cover rounded-xl lg:row-span-2" />
        <img src={img5} alt="foto5" className="w-full h-64 object-cover rounded-xl" />
        <img src={img6} alt="foto6" className="w-full h-64 object-cover rounded-xl" />
        <img src={img8} alt="foto7" className="w-full h-64 object-cover rounded-xl" />

        <img src={img7} alt="foto8" className="w-full h-64 object-cover rounded-xl lg:col-span-2 lg:col-start-1" />
        <img src={img9} alt="foto9" className="w-full h-64 object-cover rounded-xl" />
        <img src={img10} alt="foto10" className="w-full h-64 object-cover rounded-xl" />

        <img src={img11} alt="foto11" className="w-full h-64 object-cover rounded-xl" />
        <img src={img12} alt="foto12" className="w-full h-64 object-cover rounded-xl lg:row-span-2" />
        <img src={img13} alt="foto13" className="w-full h-64 object-cover rounded-xl" />
        <img src={img14} alt="foto14" className="w-full h-64 object-cover rounded-xl" />

      </div>
    </section>
  )
}

export default PhotosPage;
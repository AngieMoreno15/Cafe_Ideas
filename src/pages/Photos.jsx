import React from "react";
import PhotosPage from "../components/Album"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Photos = () => {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-6 py-12">
        <PhotosPage />
      </section>
      <Footer />
    </div>
  );
};

export default Photos;
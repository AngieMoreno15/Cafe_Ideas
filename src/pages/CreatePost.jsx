import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cafeImg from "../assets/Hero/create.jpg";
import Swal from "sweetalert2";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes estar logueado para crear un post',
        confirmButtonColor: '#748DAE'
      });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: 'success',
        title: '¡Listo!',
        text: 'Tu post ha sido creado',
        confirmButtonColor: '#9ECAD6'
      }).then(() => navigate("/blog"));

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el post',
        confirmButtonColor: '#E69A9A'
      });
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero pequeño */}
      <div className="relative w-full h-48">
        <img src={cafeImg} alt="café" className="w-full h-full object-cover" />
      </div>

      {/* Card blanca del título */}
      <div className="max-w-3xl mx-auto -mt-12 bg-white p-6 rounded-xl shadow-md text-center relative z-10">
        <h1 className="text-3xl font-bold text-[#3C6373]">Crear Nuevo Post</h1>
      </div>

      {/* Formulario */}
      <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-xl shadow-md relative z-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/blog")}
            className="mb-4 bg-gradient-to-r from-[#9ECAD6] to-[#F5CBCB] text-[#000] px-4 py-2 rounded hover:opacity-90"
          >
            Volver al blog
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#9ECAD6]"
            required
          />
          <textarea
            placeholder="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded h-40 focus:outline-none focus:ring-2 focus:ring-[#9ECAD6]"
            required
          />

          {/* Input de imagen customizado */}
          <label className="bg-[#9ECAD6] hover:bg-[#F5CBCB] text-[#000] px-4 py-2 rounded cursor-pointer w-max">
            Subir imagen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-64 h-40 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="bg-[#3C6373] hover:bg-[#5a7b87] text-white px-4 py-2 rounded mt-4"
          >
            Crear Post
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default CreatePost
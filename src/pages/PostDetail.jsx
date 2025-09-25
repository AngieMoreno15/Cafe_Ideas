import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams(); // trae el id del post de la URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => navigate("/blog"))
    .catch((err) => console.error(err));
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!post) return <p className="text-center mt-10">Cargando...</p>;

  const imageSrc = post.imageUrl
    ? post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `http://localhost:5000${post.imageUrl}`
    : null;

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">
        {/* Botones alineados a la derecha, dentro del mismo ancho de la card */}
        {user && String(user.id) === String(post.author._id) && (
          <div className="flex justify-end gap-2 mb-2">
            <button 
              onClick={handleEdit} 
              className="bg-[#9ECAD6] text-black px-4 py-2 rounded shadow hover:opacity-90"
            >
              Editar
            </button>
            <button 
              onClick={handleDelete} 
              className="bg-[#F5CBCB] text-black px-4 py-2 rounded shadow hover:opacity-90"
            >
              Eliminar
            </button>
          </div>
        )}

        {/* Card blanca */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 mb-3">
            {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          {imageSrc && (
            <img
              src={imageSrc}
              alt={post.title}
              className="w-full max-h-80 object-cover rounded-xl mb-4"
            />
          )}

          <p className="text-gray-800 whitespace-pre-line break-words">{post.content}</p>

          {/* Botón Volver alineado a la derecha y con color suave */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/blog")}
              className="bg-[#9ECAD6] text-black px-4 py-2 rounded shadow hover:opacity-90"
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PostDetail
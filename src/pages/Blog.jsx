import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

/**
 * Componente que muestra todos los posts del blog
 * - Permite filtrar por “mis posts”
 * - Soporta paginación con botón "Cargar más"
 * - Usuarios logueados pueden crear, editar y eliminar posts
 */
const Blog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Número de posts visibles inicialmente
  const [showOnlyMine, setShowOnlyMine] = useState(false); // Filtrar posts propios

  // Traer todos los posts
  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => setPosts(res.data));
  }, []);

  // Eliminar post
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setPosts(posts.filter((p) => p._id !== id)));
  };

  // Navegar a edición
  const handleEdit = (post) => {
    navigate(`/edit/${post._id}`);
  };

  // Filtrar posts si se quiere mostrar solo los propios
  const filteredPosts = showOnlyMine
    ? posts.filter((post) => String(post.author._id) === String(user?.id))
    : posts;

  // Posts visibles según la paginación
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto p-4">
        {/* Título principal */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3B3B3B] mt-12 mb-12 text-center">
          Contenido del blog
        </h2>

        {/* Controles: Crear post y filtro Mis posts */}
        {user && (
          <div className="flex justify-between w-full max-w-5xl mx-auto mb-4">
            <button
              onClick={() => navigate("/create-post")}
              className="px-4 py-2 bg-[#E69A9A] text-white rounded hover:bg-[#D88787] transition"
            >
              Crear nuevo post
            </button>

            <button
              onClick={() => setShowOnlyMine((prev) => !prev)}
              className="px-4 py-2 bg-[#748DAE] text-white border border-[#748DAE] rounded hover:bg-[#9ECAD6] transition"
            >
              {showOnlyMine ? "Mostrar todos" : "Mis posts"}
            </button>
          </div>
        )}

        {/* Grid de posts */}
        <div className="flex flex-col gap-4">
          {visiblePosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {/* Botón "Cargar más" */}
        {visibleCount < filteredPosts.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-4 py-2 bg-[#7EB0D6] text-white rounded hover:bg-[#5C88B0] transition"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
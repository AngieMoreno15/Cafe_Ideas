import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const PostCard = ({ post}) => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const [maxWords, setMaxWords] = useState(50);

  // Ajustar cantidad de palabras según ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // móviles
        setMaxWords(6);
      } else {
        setMaxWords(50);
      }
    };

    handleResize(); // inicial
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    navigate(`/post/${post._id}`); // Navega a la página de detalle
  };

  const isAuthor = user && String(user.id) === String(post.author._id);

  console.log(post.imageUrl);

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer border rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden mb-6 mx-auto w-full max-w-5xl flex h-[200px]"

    >
      {/* Imagen fija al costado izquierdo para mantener consistencia visual */}
      <div className="w-56 h-56 flex-shrink-0">
        {post.imageUrl ? (
          <img
            src={`http://localhost:5000${post.imageUrl}`}
            alt={post.title}
            className="w-full h-full object-cover rounded-l-xl"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-l-xl">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido del post */}
      <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          <h2 className="text-2xl font-bold mb-1 break-words">{post.title}</h2>
          <p className="text-gray-500 text-sm mb-2 break-words">
            {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 break-words">
            {post.content.split(" ").slice(0, maxWords).join(" ")}
            {post.content.split(" ").length > maxWords && '...'}
          </p>
        </div>

        {isAuthor && (
          <p className="mt-2 text-gray-400 text-sm text-right">
            Puedes editar y eliminar este post.
          </p>
        )}

        {isAuthor && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
            ✓
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
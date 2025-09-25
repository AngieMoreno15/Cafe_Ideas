import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hero from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const allPosts = response.data; // Asegúrate de acceder a 'data'
        
        if (!allPosts) {
          console.error("No se encontraron posts");
          return;
        }

        // Ordenamos por fecha y tomamos solo los 3 primeros
        const sortedPosts = allPosts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error cargando los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-16 text-center">Posts destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/post/${post._id}`)} // <-- Aquí navegamos al detalle
            >
              {post.imageUrl ? (
                <img
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 break-words">{post.content?.slice(0, 200)}...</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-3 bg-[#9ECAD6] text-white rounded-xl hover:bg-[#748DAE] transition"
          >
            Ver todos los posts
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
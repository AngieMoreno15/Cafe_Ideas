import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Photos from "./pages/Photos";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};

export default App;
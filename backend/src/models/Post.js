const mongoose = require("mongoose");

/**
 * 📌 Esquema de publicaciones (Post)
 * 
 * Campos:
 * - title: Título de la publicación (obligatorio).
 * - content: Contenido de la publicación (obligatorio).
 * - imageUrl: Ruta de la imagen asociada (opcional).
 * - createdAt: Fecha de creación (se asigna automáticamente).
 * - author: Referencia al usuario creador (obligatorio, referencia al modelo "User").
 */
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, // ruta de la imagen
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Post", PostSchema);
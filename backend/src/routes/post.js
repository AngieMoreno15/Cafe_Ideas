const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

// 📂 Configuración de multer para manejar uploads de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/**
 * @route   POST /api/posts
 * @desc    Crear publicación con imagen (requiere autenticación)
 * @access  Privado
 */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id, // tomado del token decodificado
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route   GET /api/posts
 * @desc    Listar todas las publicaciones
 * @access  Público
 */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Obtener publicación específica por ID
 * @access  Público
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ msg: "No encontrado" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route   PUT /api/posts/:id
 * @desc    Editar publicación (solo el autor puede hacerlo)
 * @access  Privado
 */
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No encontrado" });
    // Solo el autor puede editar
    if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    // Actualizamos campos
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    if (req.file) post.imageUrl = `/uploads/${req.file.filename}`;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Eliminar publicación (solo el autor puede hacerlo)
 * @access  Privado
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No encontrado" });

    // Solo el autor puede eliminar
    if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    await post.deleteOne();
    res.status(200).json({ msg: "Eliminado correctamente" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
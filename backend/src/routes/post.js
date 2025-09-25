const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Crear publicación con imagen
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Listar todas las publicaciones
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Consultar publicación específica
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ msg: "No encontrado" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Editar publicación (solo autor)
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No encontrado" });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    if (req.file) post.imageUrl = `/uploads/${req.file.filename}`;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Eliminar publicación (solo autor)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "No encontrado" });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    await post.deleteOne();
    res.status(200).json({ msg: "Eliminado correctamente" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
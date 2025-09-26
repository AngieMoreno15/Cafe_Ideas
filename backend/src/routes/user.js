const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @route   GET /api/users
 * @desc    Obtener lista de usuarios
 * @access  Público (⚠️ deberías protegerlo con JWT si no quieres exponer todos los usuarios)
 * 
 * Funcionalidad:
 * - Permite filtrar usuarios por nombre y/o email usando query params.
 * - Usa expresiones regulares (case-insensitive) para búsquedas parciales.
 * - Excluye el campo "password" de la respuesta por seguridad.
 * 
 * Ejemplos:
 *   GET /api/users                → retorna todos los usuarios
 *   GET /api/users?name=ana       → retorna usuarios cuyo nombre contenga "ana"
 *   GET /api/users?email=gmail    → retorna usuarios con "gmail" en su email
 */
router.get('/', async (req, res) => {
  try {
    const { name, email } = req.query;

    // Construimos el objeto de búsqueda dinámicamente
    let query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    // Buscamos en la BD y excluimos "password"
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
});

module.exports = router;
const mongoose = require('mongoose');

/**
 * 📌 Esquema de usuarios (User)
 *
 * Campos:
 * - name: Nombre del usuario (obligatorio, con espacios recortados).
 * - email: Correo electrónico único, convertido siempre a minúsculas.
 * - password: Contraseña encriptada (obligatoria).
 * 
 * Opciones:
 * - timestamps: agrega automáticamente `createdAt` y `updatedAt`.
 */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

// Exportamos el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
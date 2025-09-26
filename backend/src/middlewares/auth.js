// Importamos la librería para trabajar con JWT
const jwt = require("jsonwebtoken");

/**
 * Middleware para verificar el token JWT en las solicitudes protegidas.
 * 
 * Flujo:
 * 1. Revisa si el encabezado "Authorization" está presente.
 * 2. Extrae el token (se espera en formato "Bearer <token>").
 * 3. Verifica la validez del token con la clave secreta (JWT_SECRET).
 * 4. Si es válido, adjunta la info decodificada a `req.user` y continúa.
 * 5. Si no es válido, responde con el error correspondiente.
 */

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Encabezado de autorización

  // Caso: encabezado faltante
  if (!authHeader) return res.status(401).json({ msg: "Acceso denegado: falta encabezado Authorization" });

  // Extraemos el token (se espera "Bearer <token>")
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Acceso denegado: token no encontrado" });

  try {
    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos la info del usuario en la request para usarla en rutas protegidas
    req.user = decoded;

    next(); // Continuamos hacia la siguiente función/middleware
  } catch (err) {
    res.status(403).json({ msg: "Token inválido" });
  }
};

module.exports = { verifyToken };
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No autorizado" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token faltante" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Token inválido" });
  }
};

module.exports = { verifyToken };
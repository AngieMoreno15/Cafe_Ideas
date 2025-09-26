const mongoose = require("mongoose");
const User = require("./src/models/User"); // Ajusta la ruta según tu proyecto
const Post = require("./src/models/Post");
const bcrypt = require("bcrypt");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado ✅");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const initDB = async () => {
  await connectDB();

  // Verifica si ya existe el usuario por defecto
  let user = await User.findOne({ email: "admin@cafe.com" });
  if (!user) {
    const hashedPassword = await bcrypt.hash("Amiguitos", 10);
    user = new User({
      name: "Admin",
      email: "admin@cafe.com",
      password: hashedPassword
    });
    await user.save();
    console.log("Usuario por defecto creado ✅");
  } else {
    console.log("Usuario por defecto ya existe ⚠️");
  }

  // Crea 3 posts si no existen
  const postsCount = await Post.countDocuments();
  if (postsCount === 0) {
    const posts = [
      { title: "Primer post", content: "Contenido del primer post", author: user._id },
      { title: "Segundo post", content: "Contenido del segundo post", author: user._id },
      { title: "Tercer post", content: "Contenido del tercer post", author: user._id }
    ];
    await Post.insertMany(posts);
    console.log("3 posts iniciales creados ✅");
  } else {
    console.log("Ya existen posts en la base de datos ⚠️");
  }

  mongoose.connection.close();
};

initDB();
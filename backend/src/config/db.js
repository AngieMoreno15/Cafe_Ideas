// Importa la librería mongoose para manejar MongoDB en Node.js
const mongoose = require('mongoose');

// Función asincrónica para conectar a la base de datos
const connectDB = async () => {
  try {
    // Conexión a MongoDB usando la URI desde las variables de entorno (.env)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Parser más reciente para la URI
      useUnifiedTopology: true, // Motor de topología unificada (mejor manejo de conexiones)
    });
    console.log('MongoDB conectado ✅');
  } catch (error) {
    // Si ocurre un error, muestra el mensaje y termina la app
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

// Exporta la función para reutilizarla en cualquier parte del proyecto
module.exports = connectDB;
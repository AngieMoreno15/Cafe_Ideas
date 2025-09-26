// Carga las variables de entorno desde .env
require("dotenv").config();

// Flag para identificar que este proceso es de inicialización
process.env.INIT_DB = true;

const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Modelos de la base de datos
const User = require("./src/models/User");
const Post = require("./src/models/Post");

// Función para conectar con MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado ✅");
  } catch (err) {
    console.error(err);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

// Función principal de inicialización
const initDB = async () => {
  await connectDB();

  // 🔹 1. Crear usuario por defecto
  let user = await User.findOne({ email: "admin@cafe.com" });
  if (!user) {
    // Hashear contraseña antes de guardar
    const hashedPassword = await bcrypt.hash("Amiguitos", 10);

    // Crea usuario admin inicial
    user = await User.create([{
      name: "Admin",
      email: "admin@cafe.com",
      password: hashedPassword
    }], { validateBeforeSave: false });
    user = user[0]; // User.create devuelve array si se pasa un objeto dentro de []
    console.log("Usuario por defecto creado ✅");
  } else {
    console.log("Usuario por defecto ya existe ⚠️");
  }

  // 🔹 2. Crear posts iniciales si no hay ninguno
  const postsCount = await Post.countDocuments();
  if (postsCount === 0) {
    const posts = [
  { 
    title: "Café y libros, un refugio en cada taza", 
    content: `No hay nada como abrir un libro mientras el aroma del café recién hecho llena la habitación. Esa combinación de sensaciones, la calidez de la bebida y la inmersión en historias, transforma cualquier momento en un pequeño refugio personal. Ya sea una novela que te haga viajar a otros mundos o un ensayo que te haga reflexionar, el café funciona como un compañero silencioso que despierta los sentidos y relaja la mente.
              Para quienes disfrutan de la lectura diaria, crear un rincón especial con una lámpara cálida, una manta suave y tu taza favorita puede marcar la diferencia. Cada sorbo es un pequeño ritual que invita a la concentración y al disfrute de la lectura. Incluso un café sencillo puede convertirse en un instante de lujo, un espacio donde desconectas del ruido exterior y te sumerges en las palabras.
              La belleza de esta combinación está en la versatilidad: puedes acompañar un café intenso con libros densos o un café suave con lecturas ligeras. Lo importante es que el momento sea tuyo, que cada página y cada sorbo se conviertan en una pausa que nutra tanto la mente como el alma.`, 
    author: user._id,
    image: "" // puedes dejar vacío o cargar luego una ruta/URL
  },
  { 
    title: "Descubriendo los mejores lugares para tomar café", 
    content: `Un buen café no solo depende de la bebida, sino del lugar donde lo disfrutas. Cafeterías acogedoras, con luz natural y detalles que invitan a quedarse, se convierten en espacios ideales para leer, trabajar o simplemente relajarte. Cada café tiene su propia personalidad: algunos con música suave y rincones cómodos, otros con paredes llenas de libros que puedes hojear mientras esperas tu bebida.
              Para los amantes del café, buscar lugares donde los baristas tengan pasión por su oficio es casi un deporte. La preparación, la atención al detalle y el cuidado en cada taza marcan la diferencia entre un café cualquiera y una experiencia memorable. Además, un buen café suele acompañarse de pequeñas delicias: pasteles, panes o chocolates que complementan la bebida y hacen que la pausa sea aún más placentera.
              Explorar nuevas cafeterías también es descubrir historias: locales que se esconden en calles tranquilas, cafés históricos con décadas de tradición o pequeños rincones modernos que combinan diseño y sabor. Cada visita es una oportunidad para encontrar tu lugar favorito, donde cada taza de café se convierte en un recuerdo especial y en un instante que vale la pena repetir.`, 
    author: user._id,
    image: "" 
  },
  { 
    title: "El café como chispa de creatividad", 
    content: `El café ha sido desde siempre un aliado de escritores, artistas y soñadores. No solo despierta el cuerpo, sino que también estimula la mente, convirtiéndose en una fuente de inspiración para ideas, historias y proyectos. Su aroma, el calor de la taza en las manos y el acto de sentarse a tomarlo crean un ritual que prepara el terreno para la creatividad.
              Muchas personas encuentran en un café su momento de pausa y reflexión. Sentarse en una cafetería tranquila, observar a la gente pasar o escuchar música suave mientras se sorbe lentamente la bebida, puede abrir la mente y despertar nuevas ideas. Incluso el simple acto de preparar el café, medir el agua, moler los granos y esperar la infusión, se convierte en un proceso meditativo que genera enfoque y claridad mental.
              Por eso, si buscas inspiración, no subestimes el poder de una buena taza de café. Ya sea solo en casa, en tu cafetería favorita o mientras lees un libro, este pequeño ritual puede ser el comienzo de algo grande. Cada sorbo puede dar la chispa que encienda tu creatividad y transforme un día común en uno lleno de ideas y momentos especiales.`,   
    author: user._id,
    image: ""
  }
];
    await Post.insertMany(posts);
    console.log("3 posts iniciales creados ✅");
  } else {
    console.log("Ya existen posts en la base de datos ⚠️");
  }

  // 🔹 3. Cierra la conexión con la base de datos
  mongoose.connection.close();
};

// Ejecuta la función de inicialización
initDB();
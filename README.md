# ☕ Café Ideas – Blog App

Aplicación tipo **Blog** donde los usuarios pueden registrarse, iniciar sesión, crear, listar, editar y eliminar publicaciones.  
Proyecto desarrollado como prueba técnica para el rol de **Desarrollador Full-Stack**.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite  
- **Backend**: Node.js + Express  
- **Base de datos**: MongoDB  
- **Estilos**: TailwindCSS  
- **Autenticación**: JWT (JSON Web Tokens)  

---

## 📦 Requisitos previos

Asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) v16 o superior  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/) (local o en la nube)

---

## ⚙️ Instalación

Clona el repositorio:
```bash
git clone https://github.com/AngieMoreno15/Cafe_Ideas.git
cd Cafe_Ideas
```

Instala las dependencias del frontend:
```bash
npm install
```

Instala las dependencias del backend:
```bash
cd backend
npm install
cd ..
```

Dependencias del frontend
- react ^18.2.0
- react-dom ^18.2.0
- vite ^4.4.9
- @vitejs/plugin-react ^4.0.0
- tailwindcss ^3.3.3
- postcss ^8.4.27
- autoprefixer ^10.4.14

Dependencias del backend
- express ^4.18.2 → Framework web
- mongoose ^7.0.0 → ODM para conectarse a MongoDB
- bcryptjs ^2.4.3 → Encriptación de contraseñas
- jsonwebtoken ^9.0.0 → Autenticación con JWT
- cors ^2.8.5 → Habilitar CORS para peticiones del frontend
- dotenv ^16.0.3 → Manejo de variables de entorno

Dependencias de desarrollo:
- nodemon ^2.0.22 → Reinicia automáticamente el servidor en desarrollo

▶️ Ejecución
Backend
En una terminal:
```bash
cd backend
npm run dev
```

El servidor correrá en:
👉 http://localhost:5000/api

Frontend
En otra terminal:
```bash
npm run dev
```
La aplicación estará disponible en:
👉 http://localhost:5173

🔑 Variables de entorno
En la carpeta backend crea un archivo .env con el siguiente contenido:

```env
PORT=5000
MONGO_URI=TU_CADENA_DE_CONEXION_A_MONGODB
JWT_SECRET=miclavesecreta123
```

Usuarios de prueba
```json
{
  "email": "juan@mail.com",
  "password": "123456"
}

{
  "name": "Nova",
  "email": "nova@test.com",
  "password": "123456"
}

{
  "name": "Angie Moreno",
  "email": "angie15.more@gmail.com",
  "password": "Holamundo"
}
```

Endpoints principales (API REST)
- GET http://localhost:5000/api/posts (listar publicaciones)
- GET http://localhost:5000/api/posts/:id (ver publicación específica)
- POST http://localhost:5000/api/posts (crear publicación)
- PUT http://localhost:5000/api/posts/:id (editar publicación)
- DELETE http://localhost:5000/api/posts/:id (eliminar publicación)

Autenticación:
- POST http://localhost:5000/api/auth/register
- POST http://localhost:5000/api/auth/login

---
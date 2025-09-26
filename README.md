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
- **Servidor web**: Nginx

---

## 📦 Dependencias 
Frontend
- react ^18.2.0
- react-dom ^18.2.0
- vite ^4.4.9
- @vitejs/plugin-react ^4.0.0
- tailwindcss ^3.3.3
- postcss ^8.4.27
- autoprefixer ^10.4.14

Backend
- express ^4.18.2 → Framework web
- mongoose ^7.0.0 → ODM para conectarse a MongoDB
- bcryptjs ^2.4.3 → Encriptación de contraseñas
- jsonwebtoken ^9.0.0 → Autenticación con JWT
- cors ^2.8.5 → Habilitar CORS para peticiones del frontend
- dotenv ^16.0.3 → Manejo de variables de entorno

Desarrollo:
- nodemon ^2.0.22 → Reinicia automáticamente el servidor en desarrollo

---

## ⚙️ Requisitos previos
- Docker y Docker Compose instalados.
- Variables de entorno configuradas en backend/.env.

Opcional si ejecutas localmente:
- [Node.js](https://nodejs.org/) v16 o superior  
- [npm](https://www.npmjs.com/)  
- [MongoDB](https://www.mongodb.com/) (local o en la nube)

---

## 🛠️ Instalación y uso con Docker

1. Clona el repositorio:
```bash
git clone https://github.com/AngieMoreno15/Cafe_Ideas.git
cd Cafe_Ideas
```

2. Configurar variables de entorno
- Crea un archivo .env en la raíz del proyecto
```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/cafe_db
JWT_SECRET=miclavesecreta123
```

3. Levantar los contenedores
```bash
docker-compose up --build
```
Esto levantará los contenedores de:
+ Frontend (frontend) → puerto 8080
+ Backend (backend) → puerto 5000
+ MongoDB (mongo) → puerto 27017
+ Nginx sirve el frontend en el contenedor frontend

4. Inicializar la base de datos de prueba
```bash
docker exec -it cafe_ideas-backend-1 node initDB.js
```

5. Acceder a la aplicación
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000/api

---

## 🔧 Configuración de Nginx

Archivo nginx.conf usado para servir el frontend:
```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }
}
```

---

## ▶️ Ejecución Manual
Backend
```bash
cd backend
npm install
node server.js
```

Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Usuarios de prueba
```json
{
  "email": "admin@cafe.com",
  "password": "Amiguitos"
}
```

---

## 🗂 Endpoints principales (API REST)
Posts
* GET /api/posts → Listar publicaciones
* GET /api/posts/:id → Ver publicación específica
* POST /api/posts → Crear publicación
* PUT /api/posts/:id → Editar publicación
* DELETE /api/posts/:id → Eliminar publicación

Autenticación
* POST /api/auth/register
* POST /api/auth/login

---
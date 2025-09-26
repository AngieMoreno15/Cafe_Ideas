# Imagen base
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json y luego instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código del backend
COPY . .

# Exponer el puerto donde corre el backend
EXPOSE 5000

# Comando para iniciar el backend
CMD ["node", "server.js"]
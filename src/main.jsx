import { StrictMode } from 'react' // Ayuda a detectar problemas en el código en desarrollo
import { createRoot } from 'react-dom/client' // Nueva API de React 18 para renderizado
import './index.css' // Estilos globales
import App from './App.jsx' // Componente principal de la aplicación
import { HashRouter } from "react-router-dom"; // Router basado en hash para navegación
import { AuthProvider } from "./context/AuthContext"; // Contexto de autenticación

// Renderizado de la aplicación
// Orden de envoltorios:
// 1. StrictMode: ayuda a detectar errores en desarrollo
// 2. AuthProvider: provee estado de autenticación a todos los componentes
// 3. HashRouter: permite la navegación con rutas basadas en hash
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </StrictMode>
)

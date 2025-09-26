// Importar configuraciones y plugins necesarios
import js from '@eslint/js'                      // Configuración base de ESLint para JS
import globals from 'globals'                   // Variables globales predefinidas (browser, node, etc.)
import reactHooks from 'eslint-plugin-react-hooks'  // Reglas para hooks de React
import reactRefresh from 'eslint-plugin-react-refresh' // Reglas para Vite + React Refresh
import { defineConfig, globalIgnores } from 'eslint/config' // Funciones para definir la config

// Exportar configuración de ESLint
export default defineConfig([
  // Ignorar carpetas que no deben ser analizadas
  globalIgnores(['dist']),
  {
    // Archivos a los que se aplica esta configuración
    files: ['**/*.{js,jsx}'],

    // Extiende configuraciones existentes
    extends: [
      js.configs.recommended,                  // Configuración recomendada de ESLint
      reactHooks.configs['recommended-latest'],// Reglas recomendadas para React Hooks
      reactRefresh.configs.vite,               // Reglas específicas para Vite + React Refresh
    ],

    // Opciones de lenguaje
    languageOptions: {
      ecmaVersion: 2020,        // Versión ECMAScript mínima compatible
      globals: globals.browser, // Variables globales del navegador
      parserOptions: {
        ecmaVersion: 'latest',  // Soporte para la última versión de JS
        ecmaFeatures: { jsx: true }, // Habilitar JSX
        sourceType: 'module',   // Permite usar import/export

      },
    },

    // Reglas personalizadas
    rules: {
      // Evita errores por variables no usadas, excepto aquellas que comienzan con mayúscula o "_"
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

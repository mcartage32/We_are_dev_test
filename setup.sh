#!/bin/bash

# Salir en caso de errores
set -e

echo "Configurando el entorno del proyecto..."

# Ir a la carpeta del backend y configurar
echo "Configurando el backend..."
cd backend
npm install
npm run build

# Volver a la raíz del proyecto
cd ..

# Ir a la carpeta del frontend y configurar
echo "Configurando el frontend..."
cd frontend
npm install
npm run build

# Volver a la raíz del proyecto
cd ..

echo "Iniciando las aplicaciones..."

# Iniciar backend en segundo plano
echo "Iniciando el backend..."
cd backend
npm run start:dev & # Backend en segundo plano

# Volver a la raíz del proyecto
cd ..

# Iniciar frontend
echo "Iniciando el frontend..."
cd frontend
npm run dev # Frontend en primer plano

echo "¡El proyecto está en ejecución!"

#!/bin/bash

# Instalar Inertia.js en Laravel
composer require inertiajs/inertia-laravel

# Publicar middleware
php artisan inertia:middleware

# Instalar dependencias de Node.js para React
npm install @inertiajs/react @vitejs/plugin-react

# Instalar React y dependencias
npm install react react-dom

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "✅ Inertia.js instalado correctamente"
echo "📝 Ahora configura los archivos según las instrucciones"

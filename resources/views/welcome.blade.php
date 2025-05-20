<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inicio | Crítico de Bolsillo</title>
    {{-- @vite('resources/css/app.css') --}}
    <script src="https://cdn.tailwindcss.com"></script>

</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 class="text-3xl font-bold text-blue-900 mb-6 text-center">Crítico de Bolsillo</h1>
        <form 
            class="flex gap-2"
            action="" 
            method="GET" 
            onsubmit="event.preventDefault(); window.location.href='/buscar-libro/' + encodeURIComponent(this.elements['q'].value);"
        >
            <input 
                type="text" 
                name="q" 
                placeholder="Buscar libro..." 
                required
                class="flex-1 px-4 py-2 rounded-l-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button 
                type="submit"
                class="bg-blue-700 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-blue-800 transition"
            >
                Buscar
            </button>
        </form>
        <p class="mt-8 text-center text-blue-800/80">¡Encuentra tu próximo libro favorito!</p>
    </div>
</body>
</html>
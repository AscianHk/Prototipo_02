@extends('layouts.app')

@section('title', 'Crítico de Bolsillo - Descubre tu próxima gran lectura')

@section('content')
<!-- Hero Section -->
<section class="relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
    <div class="relative h-[500px] w-full overflow-hidden">
        <img src="/placeholder.svg?height=500&width=1200&text=Libros+destacados" alt="Libros destacados" class="w-full h-full object-cover">
    </div>
    <div class="absolute inset-0 flex flex-col justify-center items-start z-20 p-6 md:p-12 max-w-4xl">
        <div class="flex items-center gap-2 mb-4">
            <i data-lucide="book-open" class="h-6 w-6 text-blue-400"></i>
            <h2 class="text-xl font-semibold text-blue-400">Crítico de Bolsillo</h2>
        </div>
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">
            @auth
                ¡Bienvenido de vuelta, {{ auth()->user()->nombre_usuario }}!
            @else
                Descubre tu próxima gran lectura
            @endauth
        </h1>
        <p class="text-lg md:text-xl text-white/80 mb-6 max-w-2xl">
            @auth
                Explora nuevos libros, comparte tus reseñas y conecta con otros lectores.
            @else
                Conecta con otros lectores, comparte tus opiniones y descubre nuevos libros que amarás.
            @endauth
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
            @auth
                <a href="#" class="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold text-white transition-colors">
                    Explorar libros
                </a>
                <a href="{{ route('user.profile') }}" class="inline-flex items-center justify-center rounded-full border border-purple-400 text-purple-400 hover:bg-purple-50/10 px-6 py-3 font-semibold transition-colors">
                    Mis listas
                </a>
            @else
                <a href="{{ route('register') }}" class="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold text-white transition-colors">
                    Unirse ahora
                </a>
                <a href="#" class="inline-flex items-center justify-center rounded-full border border-purple-400 text-purple-400 hover:bg-purple-50/10 px-6 py-3 font-semibold transition-colors">
                    Explorar libros
                </a>
            @endauth
        </div>
    </div>
</section>

<!-- Featured Books Sections -->
@foreach([
    ['title' => 'Tendencias esta semana', 'books' => $trendingBooks],
    ['title' => 'Populares en Ficción', 'books' => $featuredBooks],
    ['title' => 'Recién añadidos', 'books' => $recentBooks]
] as $section)
<section class="py-8 px-4 md:px-6">
    <div class="container mx-auto">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-white">{{ $section['title'] }}</h2>
            <button class="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                Ver todos <i data-lucide="chevron-right" class="h-4 w-4"></i>
            </button>
        </div>
        
        <!-- Book Carousel -->
        <div class="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
            @foreach($section['books'] as $book)
            <div class="min-w-[180px] md:min-w-[200px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg transition-all hover:scale-105 hover:bg-white/20">
                <div class="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                    <img src="/placeholder.svg?height=300&width=200&text={{ urlencode($book['title']) }}" 
                         alt="{{ $book['title'] }}" 
                         class="object-cover w-full h-full">
                </div>
                <div class="p-3">
                    <h3 class="font-medium text-sm line-clamp-1 text-white">{{ $book['title'] }}</h3>
                    <p class="text-xs text-white/70">{{ $book['author'] }}</p>
                    <div class="flex items-center mt-1">
                        <i data-lucide="star" class="h-3 w-3 fill-purple-500 text-purple-500"></i>
                        <span class="text-xs ml-1 text-white/80">{{ number_format($book['rating'], 1) }}</span>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
@endforeach

<!-- Footer -->
<footer class="border-t border-white/20 py-12 px-4 md:px-6 mt-16">
    <div class="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
            <h3 class="font-bold mb-4 text-white">Crítico de Bolsillo</h3>
            <ul class="space-y-2">
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Empleos</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Blog</a></li>
            </ul>
        </div>
        <div>
            <h3 class="font-bold mb-4 text-white">Comunidad</h3>
            <ul class="space-y-2">
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Foros</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Eventos</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Clubes de lectura</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Reseñas</a></li>
            </ul>
        </div>
        <div>
            <h3 class="font-bold mb-4 text-white">Recursos</h3>
            <ul class="space-y-2">
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Guías</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">API</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Desarrolladores</a></li>
            </ul>
        </div>
        <div>
            <h3 class="font-bold mb-4 text-white">Legal</h3>
            <ul class="space-y-2">
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" class="text-white/70 hover:text-white transition-colors">Licencias</a></li>
            </ul>
        </div>
    </div>
    <div class="container mx-auto mt-8 pt-8 border-t border-white/20">
        <p class="text-center text-white/70">© 2025 Crítico de Bolsillo. Todos los derechos reservados.</p>
    </div>
</footer>
@endsection

@extends('layouts.app')

@section('title', 'Registro - Crítico de Bolsillo')

@section('content')
<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Floating decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-16 left-16 text-purple-300/20 transform rotate-12">
            <i data-lucide="users" class="h-8 w-8"></i>
        </div>
        <div class="absolute top-32 right-24 text-blue-300/20 transform -rotate-12">
            <i data-lucide="star" class="h-6 w-6"></i>
        </div>
        <div class="absolute bottom-40 left-24 text-purple-400/20 transform rotate-45">
            <i data-lucide="book-open" class="h-10 w-10"></i>
        </div>
        <div class="absolute bottom-24 right-16 text-blue-400/20 transform -rotate-45">
            <i data-lucide="sparkles" class="h-8 w-8"></i>
        </div>
    </div>

    <div class="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg relative z-10">
        <div class="text-center p-6 space-y-4">
            <div class="flex items-center justify-center gap-3 mb-4">
                <div class="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full">
                    <i data-lucide="book-open" class="h-8 w-8 text-white"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        Crítico de Bolsillo
                    </h1>
                    <p class="text-xs text-purple-200/80">Tu red social de libros</p>
                </div>
            </div>
            <h2 class="text-2xl text-white font-bold">Registro</h2>
            <p class="text-purple-200/80">Únete a nuestra comunidad de lectores apasionados</p>
        </div>
        
        <div class="p-6">
            @if($errors->any())
                <div class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
                    @foreach($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form action="{{ route('register') }}" method="POST" class="space-y-5">
                @csrf
                <div class="space-y-2">
                    <label for="nombre_usuario" class="text-white">Nombre</label>
                    <input 
                        id="nombre_usuario" 
                        name="nombre_usuario" 
                        type="text" 
                        placeholder="Tu nombre"
                        value="{{ old('nombre_usuario') }}"
                        required 
                        autofocus
                        class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2"
                    />
                </div>
                
                <div class="space-y-2">
                    <label for="email" class="text-white">Correo electrónico</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="tu@email.com"
                        value="{{ old('email') }}"
                        required
                        class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2"
                    />
                </div>
                
                <div class="space-y-2">
                    <label for="password" class="text-white">Contraseña</label>
                    <div class="relative">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="••••••••"
                            required
                            class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2 pr-10"
                        />
                        <button 
                            type="button" 
                            onclick="togglePassword('password')"
                            class="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                        >
                            <i data-lucide="eye" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <label for="password_confirmation" class="text-white">Confirmar contraseña</label>
                    <div class="relative">
                        <input 
                            id="password_confirmation" 
                            name="password_confirmation" 
                            type="password" 
                            placeholder="••••••••"
                            required
                            class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2 pr-10"
                        />
                        <button 
                            type="button" 
                            onclick="togglePassword('password_confirmation')"
                            class="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                        >
                            <i data-lucide="eye" class="h-4 w-4"></i>
                        </button>
                    </div>
                </div>
                
                <button 
                    type="submit"
                    class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105"
                >
                    Registrarse
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-white/80 text-sm">
                    ¿Ya tienes cuenta? 
                    <a href="{{ route('login') }}" class="text-purple-300 hover:text-purple-200 hover:underline font-medium">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

<script>
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    
    lucide.createIcons();
}
</script>
@endsection

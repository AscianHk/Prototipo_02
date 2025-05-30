@extends('layouts.app')

@section('title', 'Iniciar Sesión - Crítico de Bolsillo')

@section('content')
<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Floating decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-20 text-blue-300/20 transform rotate-12">
            <i data-lucide="book-open" class="h-8 w-8"></i>
        </div>
        <div class="absolute top-40 right-32 text-purple-300/20 transform -rotate-12">
            <i data-lucide="sparkles" class="h-6 w-6"></i>
        </div>
        <div class="absolute bottom-32 left-32 text-blue-400/20 transform rotate-45">
            <i data-lucide="book-open" class="h-10 w-10"></i>
        </div>
        <div class="absolute bottom-20 right-20 text-purple-400/20 transform -rotate-45">
            <i data-lucide="sparkles" class="h-8 w-8"></i>
        </div>
    </div>

    <div class="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg relative z-10">
        <div class="text-center p-6 space-y-4">
            <div class="flex items-center justify-center gap-3 mb-4">
                <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                    <i data-lucide="book-open" class="h-8 w-8 text-white"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                        Crítico de Bolsillo
                    </h1>
                    <p class="text-xs text-blue-200/80">Tu red social de libros</p>
                </div>
            </div>
            <h2 class="text-2xl text-white font-bold">Iniciar Sesión</h2>
            <p class="text-blue-200/80">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>
        
        <div class="p-6">
            @if($errors->any())
                <div class="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
                    @foreach($errors->all() as $error)
                        <p>{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form action="{{ route('login') }}" method="POST" class="space-y-6">
                @csrf
                <div class="space-y-2">
                    <label for="email" class="text-white">Correo electrónico</label>
                    <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="tu@email.com"
                        value="{{ old('email') }}"
                        required 
                        autofocus
                        class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 rounded px-3 py-2"
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
                            class="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 rounded px-3 py-2 pr-10"
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
                
                <button 
                    type="submit"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105"
                >
                    Entrar
                </button>
            </form>
            
            <div class="mt-6 text-center">
                <p class="text-white/80 text-sm">
                    ¿No tienes cuenta? 
                    <a href="{{ route('register') }}" class="text-blue-300 hover:text-blue-200 hover:underline font-medium">
                        Regístrate aquí
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

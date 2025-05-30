<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Crítico de Bolsillo')</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        blue: {
                            50: '#e6f1ff',
                            100: '#cce3ff',
                            200: '#99c8ff',
                            300: '#66acff',
                            400: '#3390ff',
                            500: '#0074ff',
                            600: '#005dcc',
                            700: '#004699',
                            800: '#002f66',
                            900: '#001733',
                        },
                        purple: {
                            50: '#f3e6ff',
                            100: '#e7ccff',
                            200: '#cf99ff',
                            300: '#b766ff',
                            400: '#9f33ff',
                            500: '#8700ff',
                            600: '#6c00cc',
                            700: '#510099',
                            800: '#360066',
                            900: '#1b0033',
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    
    @stack('styles')
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white">
    <!-- Navigation -->
    @include('components.navigation')
    
    <!-- Main Content -->
    <main>
        @yield('content')
    </main>
    
    <!-- Scripts -->
    <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // CSRF token for AJAX requests
        window.Laravel = {
            csrfToken: '{{ csrf_token() }}'
        };
        
        // Setup AJAX headers
        if (window.fetch) {
            const originalFetch = window.fetch;
            window.fetch = function(url, options = {}) {
                options.headers = options.headers || {};
                options.headers['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
                options.headers['X-Requested-With'] = 'XMLHttpRequest';
                return originalFetch(url, options);
            };
        }
    </script>
    
    @stack('scripts')
</body>
</html>

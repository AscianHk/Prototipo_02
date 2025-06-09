<!-- filepath: resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Crítico de Bolsillo')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    @stack('styles')
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen">
    @yield('content')
</body>
</html>
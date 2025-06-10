<?php

use App\Http\Middleware\AuthControl;
use App\Http\Controllers\ManejoAPIController;
use App\Http\Controllers\CacheoApiController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\UserPanelController;
use App\Http\Controllers\ListaController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\User;


    Route::get('/', function () {
        return view('homepage');
    });


    Route::match(['get', 'post'], '/buscar-libro/{q?}', [ManejoAPIController::class, 'buscarLibro']);

    Route::get('/resultado', function () {
        return view('resultado');
    })->name('resultado');

    Route::get('/libro/{id}', [CacheoApiController::class, 'mostrarLibro'])->name('libro.mostrar');


//=========================================================================
//                                Reseñas de Libros
//=========================================================================


    Route::get('/libro/{id}/resenas', [LibroController::class, 'mostrarResenas'])->middleware(AuthControl::class);
    Route::post('/libro/{id}/resenas', [LibroController::class, 'guardarResena'])->middleware(AuthControl::class);
    Route::get('/libro/{id}/resenas/editar/{resenaId}', [LibroController::class, 'editarResena'])->middleware(AuthControl::class);
    Route::post('/libro/{id}/resenas/editar/{resenaId}', [LibroController::class, 'actualizarResena'])->middleware(AuthControl::class);
    Route::get('/libro/{id}/resenas/borrar/{resenaId}', [LibroController::class, 'borrarResena'])->middleware(AuthControl::class);

//=========================================================================
//                                Edicion De Libros
//=========================================================================

    Route::get('/libro/{id}/editar', [LibroController::class, 'editarLibro'])
        ->middleware(AuthControl::class)
        ->name('libro.editar');
    Route::put('/libro/{id}/actualizar', [LibroController::class, 'actualizarLibro'])
        ->middleware(AuthControl::class)
        ->name('libro.actualizar');


//=========================================================================
//=========================================================================


//=========================================================================
//                                Usuarios
//=========================================================================
    
    Route::get('/perfil/{id}', [UserPanelController::class, 'verPerfil'])
        ->middleware('auth')
        ->name('perfil.usuario');

    Route::post('/usuario/{id}/seguir', [UserPanelController::class, 'seguirUsuario'])
        ->middleware('auth')
        ->name('usuario.seguir');

    Route::delete('/usuario/{id}/dejar-seguir', [UserPanelController::class, 'dejarDeSeguir'])
        ->middleware('auth')
        ->name('usuario.dejar-seguir');

//=========================================================================
//                                Listas
//=========================================================================



    Route::get('/usuario/listas', [ListaController::class, 'index'])
        ->middleware('auth')
        ->name('usuario.listas');

    Route::post('/listas/agregar', [ListaController::class, 'agregar'])->name('listas.agregar')->middleware('auth');

    Route::delete('/listas/{id}/eliminar', [ListaController::class, 'eliminar'])->name('listas.eliminar')->middleware('auth');


    Route::get('/buscar-usuario', [UserPanelController::class, 'buscarUsuario'])
        ->middleware('auth')
        ->name('buscar.usuario');


    Route::get('/usuario/{usuario_id}/libro/{libro_id}/diario', [UserPanelController::class, 'mostrarDiario'])
    ->middleware('auth')
    ->name('usuario.diario');
    Route::post('/usuario/{usuario_id}/libro/{libro_id}/diario', [UserPanelController::class, 'guardarEntradaDiario'])
    ->name('usuario.diario.guardar');

//=========================================================================
//                             Administración
//=========================================================================
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::post('/admin/actualizar-usuario/{id}', [AdminController::class, 'actualizarUsuario'])->name('admin.actualizarUsuario');
    Route::post('/admin/crear-usuario', [AdminController::class, 'crearUsuario'])->name('admin.crearUsuario');
    Route::get('/admin/editar-usuario/{id}', [AdminController::class, 'editarUsuario'])->name('admin.editarUsuario');
    Route::get('/seed', function () {
  
    if (User::where('email', 'p@p.com')->exists()) {
        return response()->json(['message' => 'El usuario ya existe'], 409);
    }

    // Crear el usuario
    User::factory()->create([
        'nombre_usuario' => 'Admin',
        'email' => 'jesuscereceda7@gmail.com',
        'password' => bcrypt('maiden05062003'),
        'rol' => 'admin',
        ]);

    return response()->json(['message' => 'Usuario creado correctamente'], 201);
});




//=========================================================================
//                                Paneles
//=========================================================================



    Route::get('/usuario/panel', [UserPanelController::class, 'panel'])
        ->middleware('auth')
        ->name('usuario.panel');



    Route::post('/usuario/foto', [UserPanelController::class, 'actualizarFoto'])
        ->middleware('auth')
        ->name('usuario.foto');

  
    Route::post('/usuario/biografia', [UserPanelController::class, 'actualizarBiografia'])
        ->middleware('auth')
        ->name('usuario.biografia');


    

//=========================================================================
//                                Autenticaciónes
//=========================================================================




    Route::get('login', function () {
        return view('Auth.login');
    })->name('login');

    Route::post('login', function(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::login($user);
            return redirect('/')->with('success', 'Sesión iniciada correctamente');
        } else {
            return back()->withErrors(['email' => 'Credenciales incorrectas'])->withInput();
        }
    })->name('login.post');

    Route::get('register', function () {
        return view('Auth.register');
    })->name('register');


    Route::post('register', function(Request $request) {

        
        $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:1|confirmed',
        ]);
        
        $user = User::create([
            'nombre_usuario' => $request->nombre_usuario,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => 'usuario',
        ]);

        Auth::login($user);
        return redirect('/')->with('success', 'Usuario registrado correctamente');
    })->name('register.post');




    Route::post('logout', function() {
        Auth::logout();
        return redirect('/')->with('success', 'Sesión cerrada correctamente');
    })->name('logout');

//=========================================================================
//=========================================================================
//=========================================================================
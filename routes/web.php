<?php

use App\Http\Middleware\AuthControl;
use App\Http\Controllers\ManejoAPIController;
use App\Http\Controllers\CacheoApiController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\UserPanelController;
use App\Http\Controllers\ListaController;
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

    Route::get('/libro/{id}', [CacheoApiController::class, 'mostrarLibro']);


    Route::get('/libro/{id}/resenas', [LibroController::class, 'mostrarResenas'])->middleware(AuthControl::class);
    Route::post('/libro/{id}/resenas', [LibroController::class, 'guardarResena'])->middleware(AuthControl::class);
    Route::get('/libro/{id}/resenas/editar/{resenaId}', [LibroController::class, 'editarResena'])->middleware(AuthControl::class);
    Route::post('/libro/{id}/resenas/editar/{resenaId}', [LibroController::class, 'actualizarResena'])->middleware(AuthControl::class);
    Route::get('/libro/{id}/resenas/borrar/{resenaId}', [LibroController::class, 'borrarResena'])->middleware(AuthControl::class);




//=========================================================================
//                                Listas
//=========================================================================



    Route::get('/usuario/listas', [ListaController::class, 'index'])
        ->middleware('auth')
        ->name('usuario.listas');

    Route::post('/listas/agregar', [ListaController::class, 'agregar'])->name('listas.agregar')->middleware('auth');

    Route::delete('/listas/{id}/eliminar', [ListaController::class, 'eliminar'])->name('listas.eliminar')->middleware('auth');








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
            'password' => 'required|min:4|confirmed',
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




    Route::get('logout', function() {
        Auth::logout();
        return redirect('/')->with('success', 'Sesión cerrada correctamente');
    })->name('logout');


//=========================================================================
//=========================================================================
//=========================================================================
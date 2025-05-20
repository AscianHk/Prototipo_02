<?php
use App\Http\Controllers\ManejoAPIController;
use App\Http\Controllers\CacheoApiController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/buscar-libro/{titulo}', [ManejoAPIController::class, 'buscarLibro']);

Route::get('/resultado', function () {
    return view('resultado');
});

Route::get('/libro/{id}', [CacheoApiController::class, 'mostrarLibro']);
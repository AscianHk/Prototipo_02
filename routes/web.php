<?php
use App\Http\Controllers\ManejoAPIController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/buscar-libro/{titulo}', [ManejoAPIController::class, 'buscarLibro']);

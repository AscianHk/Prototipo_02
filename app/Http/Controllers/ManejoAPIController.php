<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Libro;

class ManejoAPIController extends Controller
{
    public function buscarLibro($titulo)
{
    $apiKey = config('services.google_books.api_key');
    $url = "https://www.googleapis.com/books/v1/volumes?q=" . urlencode($titulo) . "&key=" . $apiKey;

    $respuesta = Http::get($url);

    return response()->json($respuesta->json());
}
}

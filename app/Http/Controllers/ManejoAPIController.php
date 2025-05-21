<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Libro;

class ManejoAPIController extends Controller
{
    public function buscarLibro(Request $request, $q = null)
    {
        // Si viene de formulario, $q puede ser null y se toma de $request->q
        $busqueda = $q ?? $request->q;
        $tipo = $request->tipo;

        $apiKey = config('services.google_books.api_key');

        // Construir query según tipo
        if ($tipo === 'autor') {
            $query = 'inauthor:' . $busqueda;
        } elseif ($tipo === 'genero') {
            $query = 'subject:' . $busqueda;
        } else {
            $query = 'intitle:' . $busqueda; // título por defecto
        }

        $url = "https://www.googleapis.com/books/v1/volumes?q=" . urlencode($query) . "&key=" . $apiKey;

        $respuesta = Http::get($url);

        return redirect('/resultado')->with('resultado', $respuesta->json());
    }
}
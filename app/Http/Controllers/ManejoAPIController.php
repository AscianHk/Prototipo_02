<?php


namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Libro;

class ManejoAPIController extends Controller
{
    public function buscarLibro(Request $request, $q = null)
{
    $busqueda = $q ?? $request->q;
    $tipo = $request->tipo;

    if ($tipo === 'usuario') {
        // Búsqueda parcial por nombre de usuario
        $usuarios = User::where('nombre_usuario', 'LIKE', '%' . $busqueda . '%')->get();
        return redirect('/resultado')->with('usuarios', $usuarios);
    }

    $apiKey = config('services.google_books.api_key');

    if ($tipo === 'autor') {
        $query = 'inauthor:' . $busqueda;
    } elseif ($tipo === 'genero') {
        $query = 'subject:' . $busqueda;
    } else {
        $query = 'intitle:' . $busqueda;
    }

    $url = "https://www.googleapis.com/books/v1/volumes?q=" . urlencode($query) . "&key=" . $apiKey;

    $respuesta = Http::get($url);

    return view('resultado', ['resultado' => $respuesta->json()]);
    }
}

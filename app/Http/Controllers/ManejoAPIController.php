<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Pagination\LengthAwarePaginator;

class ManejoAPIController extends Controller
{


public function buscarLibro(Request $request, $q = null)
{
    $busqueda = $q ?? $request->q;
    $tipo = $request->tipo;

    if ($tipo === 'usuario') {
        $usuarios = User::where('nombre_usuario', 'LIKE', '%' . $busqueda . '%')->get();
        return view('resultado', [
            'usuarios' => $usuarios,
            'libros' => null,
        ]);
    }

    $apiKey = config('services.google_books.api_key');
    if ($tipo === 'autor') {
        $query = 'inauthor:' . $busqueda;
    } elseif ($tipo === 'genero') {
        $query = 'subject:' . $busqueda;
    } else {
        $query = 'intitle:' . $busqueda;
    }

    $perPage = 5;
    $page = $request->get('page', 1);
    $startIndex = ($page - 1) * $perPage;

    $url = "https://www.googleapis.com/books/v1/volumes?q=" . urlencode($query)
        . "&key=" . $apiKey
        . "&maxResults={$perPage}"
        . "&startIndex={$startIndex}";

    $respuesta = Http::get($url);
    $json = $respuesta->json();
    $items = collect($json['items'] ?? []);
    $total = $json['totalItems'] ?? 0;

    // Limitar a un máximo de 10 páginas
    $maxTotal = $perPage * 10; // 5 * 10 = 50 resultados máximo
    if ($total > $maxTotal) {
        $total = $maxTotal;
    }

    $libros = new \Illuminate\Pagination\LengthAwarePaginator(
        $items,
        $total,
        $perPage,
        $page,
        ['path' => url()->current(), 'query' => $request->query()]
    );

    return view('resultado', [
        'libros' => $libros,
        'usuarios' => [],
    ]);
}
}
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
    $url = "https://www.googleapis.com/books/v1/volumes?q=intitle:" . urlencode($titulo) . "&key=" . $apiKey;

    $respuesta = Http::get($url)->json();

    // Verificar si hay resultados
    if (!empty($respuesta['items'])) {
        // Filtrar para encontrar un título exactamente igual
        foreach ($respuesta['items'] as $item) {
            $datosLibro = $item['volumeInfo'];

            if (strcasecmp($datosLibro['title'], $titulo) == 0) { // Comparación insensible a mayúsculas
                // Buscar en la BD
                $libro = Libro::where('title', $titulo)->first();

                // Si no está en la BD, guardarlo
                if (!$libro) {
                    $libro = Libro::create([
                        'title' => $datosLibro['title'],
                        'author' => $datosLibro['authors'][0] ?? null,
                        'publisher' => $datosLibro['publisher'] ?? null,
                        'published_date' => $datosLibro['publishedDate'] ?? null,
                        'description' => $datosLibro['description'] ?? null,
                        'page_count' => $datosLibro['pageCount'] ?? null,
                        'image' => $datosLibro['imageLinks']['thumbnail'] ?? null,
                        'language' => $datosLibro['language'] ?? null,
                    ]);
                }

                return response()->json($libro);
            }
        }
    }

    // Si no hay coincidencias exactas, devolver un mensaje
    return response()->json(['message' => 'Libro no encontrado en la API ni en la base de datos'], 404);
}

}

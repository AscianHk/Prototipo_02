<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Libro;

class CacheoApiController extends Controller
{
    public function mostrarLibro($id)
    {
        $apiKey = config('services.google_books.api_key');
        $url = "https://www.googleapis.com/books/v1/volumes/{$id}?key={$apiKey}";

        $respuesta = Http::get($url)->json();

        if (!empty($respuesta['volumeInfo'])) {
            $info = $respuesta['volumeInfo'];

            // Guardar en la base de datos si no existe
            $libro = Libro::firstOrCreate(
        ['google_id' => $id],
        [
            'google_id'      => $id, // <-- ¡Esto es importante!
            'title'           => $info['title'] ?? null,
            'author'          => isset($info['authors']) ? implode(', ', $info['authors']) : null,
            'publisher'       => $info['publisher'] ?? null,
            'published_date'  => $info['publishedDate'] ?? null,
            'description'     => $info['description'] ?? null,
            'page_count'      => $info['pageCount'] ?? null,
            'imagen_url'      => $info['imageLinks']['thumbnail'] ?? null,
            'language'        => $info['language'] ?? null,
            'average_rating'  => $info['averageRating'] ?? null,
            'categories'      => isset($info['categories']) ? json_encode($info['categories']) : null,
            'authors'         => isset($info['authors']) ? json_encode($info['authors']) : null,
        ]
    );

            // Devuelve una vista con los datos del libro guardado
            return view('libro', ['libro' => $libro]);
        }

        
        return redirect('/resultado')->with('error', 'Libro no encontrado');
    }
}
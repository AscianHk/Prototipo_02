<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Libro;
use App\Models\ListaLibroUsuario;
use Inertia\Inertia;

class LibroController extends Controller
{
    public function index()
    {
        $librosDestacados = $this->obtenerLibrosDestacados();
        $librosTendencia = $this->obtenerLibrosTendencia();
        $librosRecientes = $this->obtenerLibrosRecientes();
        
        return Inertia::render('Home', [
            'librosDestacados' => $librosDestacados,
            'librosTendencia' => $librosTendencia,
            'librosRecientes' => $librosRecientes,
        ]);
    }

    public function mostrar($id)
    {
        try {
            // Buscar en base de datos local primero
            $libro = Libro::where('google_id', $id)->first();
            
            if (!$libro) {
                // Si no existe, buscar en Google Books API
                $datosLibro = $this->obtenerLibroDeGoogleAPI($id);
                if (!$datosLibro) {
                    return Inertia::render('Libro/NoEncontrado', ['libroId' => $id]);
                }
                
                // Guardar en base de datos
                $libro = Libro::create([
                    'google_id' => $id,
                    'titulo' => $datosLibro['title'] ?? 'Sin título',
                    'autor' => implode(', ', $datosLibro['authors'] ?? ['Autor desconocido']),
                    'descripcion' => $datosLibro['description'] ?? '',
                    'editorial' => $datosLibro['publisher'] ?? '',
                    'fecha_publicacion' => $datosLibro['publishedDate'] ?? null,
                    'numero_paginas' => $datosLibro['pageCount'] ?? 0,
                    'idioma' => $datosLibro['language'] ?? 'es',
                    'imagen_url' => $datosLibro['imageLinks']['thumbnail'] ?? null,
                    'categorias' => json_encode($datosLibro['categories'] ?? []),
                ]);
            }
            
            // Obtener listas del usuario si está autenticado
            $listasUsuario = [];
            if (auth()->check()) {
                $listasUsuario = ListaLibroUsuario::where('usuario_id', auth()->id())
                    ->where('libro_id', $libro->id)
                    ->pluck('tipo_lista')
                    ->toArray();
            }
            
            return Inertia::render('Libro/Mostrar', [
                'libro' => $libro,
                'listasUsuario' => $listasUsuario,
            ]);
            
        } catch (\Exception $e) {
            return Inertia::render('Libro/NoEncontrado', ['libroId' => $id]);
        }
    }

    public function agregarALista(Request $request, $id)
    {
        $request->validate([
            'tipo_lista' => 'required|in:favoritos,pendiente,leyendo,terminado,me_gusta'
        ]);

        $libro = Libro::where('google_id', $id)->first();
        if (!$libro) {
            return response()->json(['error' => 'Libro no encontrado'], 404);
        }

        // Verificar si ya está en la lista
        $existe = ListaLibroUsuario::where('usuario_id', auth()->id())
            ->where('libro_id', $libro->id)
            ->where('tipo_lista', $request->tipo_lista)
            ->exists();

        if ($existe) {
            return response()->json(['mensaje' => 'El libro ya está en esta lista'], 200);
        }

        ListaLibroUsuario::create([
            'usuario_id' => auth()->id(),
            'libro_id' => $libro->id,
            'tipo_lista' => $request->tipo_lista
        ]);

        return response()->json(['mensaje' => 'Libro añadido a la lista exitosamente'], 201);
    }

    public function quitarDeLista(Request $request, $id)
    {
        $request->validate([
            'tipo_lista' => 'required|in:favoritos,pendiente,leyendo,terminado,me_gusta'
        ]);

        $libro = Libro::where('google_id', $id)->first();
        if (!$libro) {
            return response()->json(['error' => 'Libro no encontrado'], 404);
        }

        ListaLibroUsuario::where('usuario_id', auth()->id())
            ->where('libro_id', $libro->id)
            ->where('tipo_lista', $request->tipo_lista)
            ->delete();

        return response()->json(['mensaje' => 'Libro eliminado de la lista'], 200);
    }

    private function obtenerLibrosDestacados()
    {
        return collect([
            ['id' => 'dune', 'titulo' => 'Dune', 'autor' => 'Frank Herbert', 'puntuacion' => 4.7],
            ['id' => 'cien-anos', 'titulo' => 'Cien años de soledad', 'autor' => 'Gabriel García Márquez', 'puntuacion' => 4.9],
            ['id' => '1984', 'titulo' => '1984', 'autor' => 'George Orwell', 'puntuacion' => 4.6],
            ['id' => 'hobbit', 'titulo' => 'El Hobbit', 'autor' => 'J.R.R. Tolkien', 'puntuacion' => 4.8],
        ]);
    }

    private function obtenerLibrosTendencia()
    {
        return $this->obtenerLibrosDestacados();
    }

    private function obtenerLibrosRecientes()
    {
        return $this->obtenerLibrosDestacados();
    }

    private function obtenerLibroDeGoogleAPI($id)
    {
        try {
            $response = Http::get("https://www.googleapis.com/books/v1/volumes/{$id}");
            
            if ($response->successful()) {
                return $response->json()['volumeInfo'] ?? null;
            }
            
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}

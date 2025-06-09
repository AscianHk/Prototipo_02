<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;
use App\Models\Resena;
use Illuminate\Support\Facades\Auth;

    class LibroController extends Controller
    {
        public function mostrarResenas($id)
        {
            $libro = Libro::findOrFail($id);
            $resenas = Resena::where('libro_id', $id)->with('usuario')->get();
            return view('resenas', compact('libro', 'resenas'));
        }

        public function guardarResena(Request $request, $id)
        {
            $request->validate([
                'texto' => 'required|string|max:1000',
                'puntuacion' => 'required|integer|min:1|max:5',
            ]);

            Resena::create([
                'libro_id' => $id,
                'usuario_id' => Auth::id(),
                'texto' => $request->texto,
                'puntuacion' => $request->puntuacion,
            ]);

            return redirect()->back()->with('success', 'Reseña creada correctamente.');
        }


        public function editarResena($id, $resenaId)
        {
            $libro = Libro::findOrFail($id);
            $resena = Resena::findOrFail($resenaId);

            // Opcional: Solo permitir editar si el usuario es el autor
            if ($resena->usuario_id !== Auth::id()) {
                return redirect()->back()->with('error', 'No tienes permiso para editar esta reseña.');
            }

            return view('editar_resena', compact('libro', 'resena'));
        }

        public function actualizarResena(Request $request, $id, $resenaId)
    {
        $request->validate([
            'texto' => 'required|string|max:1000',
            'puntuacion' => 'required|integer|min:1|max:5',
        ]);

        $resena = Resena::findOrFail($resenaId);

        // Opcional: Solo permitir editar si el usuario es el autor
        if ($resena->usuario_id !== Auth::id()) {
            return redirect()->back()->with('error', 'No tienes permiso para editar esta reseña.');
        }

        $resena->update([
            'texto' => $request->texto,
            'puntuacion' => $request->puntuacion,
        ]);

        return redirect('/libro/'.$id.'/resenas')->with('success', 'Reseña actualizada correctamente.');
    }

        
    public function borrarResena($id, $resenaId)
    {
        $resena = Resena::findOrFail($resenaId);
        $resena->delete();

        return redirect()->back()->with('success', 'Reseña eliminada correctamente.');
    }
        public function editarLibro($id)
    {
        $libro = Libro::findOrFail($id);

        // Solo permitir acceso a administradores
        if (Auth::user()->rol !== 'admin') {
            return redirect()->back()->with('error', 'No tienes permiso para editar este libro.');
        }

        return view('AdminPanel.editar_libro', compact('libro'));
    }

    public function actualizarLibro(Request $request, $id)
    {
        $libro = Libro::findOrFail($id);

        // Solo permitir acceso a administradores
        if (Auth::user()->rol !== 'admin') {
            return redirect()->back()->with('error', 'No tienes permiso para actualizar este libro.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'published_date' => 'nullable|string|max:10',
            'language' => 'nullable|string|max:50',
            'page_count' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $libro->update([
            'title' => $request->title,
            'author' => $request->author,
            'publisher' => $request->publisher,
            'published_date' => $request->published_date,
            'language' => $request->language,
            'page_count' => $request->page_count,
            'description' => $request->description,
        ]);

       return redirect()->route('libro.mostrar', $id)->with('success', 'Libro actualizado correctamente.');
    }
}
    

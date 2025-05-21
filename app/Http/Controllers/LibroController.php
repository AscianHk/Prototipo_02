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

        // $request->validate([
        //     'contenido' => 'required|string|max:1000',
        //     'puntuacion' => 'required|integer|min:1|max:5',
        // ]);

        

        Resena::create([
            'libro_id' => $id,
            'usuario_id' => Auth::id(),
            'texto' => $request->texto, // <--- usa 'contenido' aquí
            'puntuacion' => $request->puntuacion,
        ]);

        return redirect()->back();
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

    public function actualizarResena(Request $request, $id, $resenaId){
        $request->validate([
            'texto' => 'required|string|max:1000', // <--- debe ser 'texto'
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

        return redirect()->back()->with('success', 'Reseña eliminada.');
    }
}
<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Resena;

class UserPanelController extends Controller
{
    public function panel()
    {
        $usuario = Auth::user();
        $resenas = Resena::with('libro')->where('usuario_id', $usuario->id)->get();

        return view('UserPanel.User_Page', compact('usuario', 'resenas'));
    }


  
    public function actualizarFoto(Request $request)
    {
        $request->validate([
            'foto_perfil' => 'required|image|max:2048',
        ]);

        $user = auth()->user();
        $path = $request->file('foto_perfil')->store('fotos_perfil', 'public');
        $user->foto_perfil = $path; // Guarda solo la ruta relativa
        $user->save();

        return redirect()->back()->with('success', 'Foto de perfil actualizada.');
    }


    public function actualizarBiografia(Request $request)
    {
        $request->validate([
            'biografia' => 'nullable|string|max:1000',
        ]);

        $user = auth()->user();
        $user->biografia = $request->biografia;
        $user->save();

        return redirect()->back()->with('success', 'Biografía actualizada.');
    }



        public function listas()
    {
        // Aquí puedes obtener las listas del usuario autenticado
        // $listas = Lista::where('usuario_id', auth()->id())->get();
        // return view('UserPanel.listas', compact('listas'));

        return view('UserPanel.listas');
    }
}


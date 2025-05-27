<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Resena;
use App\Models\User;

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
        $user->foto_perfil = $path;
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
        // Puedes obtener las listas del usuario autenticado aquí si lo necesitas
        // $listas = Lista::where('usuario_id', auth()->id())->get();
        // return view('UserPanel.listas', compact('listas'));

        return view('UserPanel.listas');
    }

    public function verPerfil($id)
    {
        $usuario = User::findOrFail($id);
        $resenas = Resena::with('libro')->where('usuario_id', $usuario->id)->get();

        return view('perfil', compact('usuario', 'resenas'));
    }

    public function seguirUsuario($id)
    {
        $seguidor_id = auth()->id();
        $seguido_id = $id;

        if ($seguidor_id != $seguido_id) {
            \DB::table('follows')->updateOrInsert(
                ['seguidor_id' => $seguidor_id, 'seguido_id' => $seguido_id],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }

        return back()->with('success', 'Ahora sigues a este usuario.');
    }

    public function dejarDeSeguir($id)
    {
        \DB::table('follows')
            ->where('seguidor_id', auth()->id())
            ->where('seguido_id', $id)
            ->delete();

        return back()->with('success', 'Has dejado de seguir a este usuario.');
    }


}
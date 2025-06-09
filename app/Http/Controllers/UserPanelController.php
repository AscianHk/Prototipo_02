<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Resena;
use App\Models\User;
use App\Models\Diario;

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
            'foto_perfil' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = auth()->user();

        // Obtener el archivo y definir la ruta en public/
        $file = $request->file('foto_perfil');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('fotos_perfil'), $filename);

        // Guardar la ruta en la base de datos
        $user->foto_perfil = 'fotos_perfil/' . $filename;
        $user->save();

        return redirect()->back()->with('success', 'Foto de perfil actualizada correctamente.');
    }



    public function actualizarBiografia(Request $request)
    {
        $request->validate([
            'biografia' => 'nullable|string|max:1000',
        ]);

        $user = auth()->user();
        $user->biografia = $request->biografia;
        $user->save();

        return redirect()->back()->with('success', 'Biografía actualizada correctamente.');
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



    public function mostrarDiario($usuario_id, $libro_id)
    {
        $entradas = \App\Models\Diario::where('usuario_id', $usuario_id)
            ->where('libro_id', $libro_id)
            ->orderBy('capitulo')
            ->get();

        return view('UserPanel.Diario', [
            'capitulo' => $capitulo,
            'entradas' => $entradas,
            'usuario_id' => $usuario_id,
            'libro_id' => $libro_id,
        ]);
    }
    public function guardarEntradaDiario(Request $request, $usuario_id, $libro_id)
    {
        $request->validate([
            'texto' => 'required|string|max:5000',
        ]);

        \App\Models\Diario::create([
            'usuario_id' => $usuario_id,
            'libro_id' => $libro_id,
            'texto' => $request->texto,
            'capitulo' => $request->capitulo,
        ]);

        return redirect()->route('usuario.diario', [
            'usuario_id' => $usuario_id,
            'libro_id' => $libro_id
        ])->with('success', 'Entrada guardada correctamente.');
    }

}
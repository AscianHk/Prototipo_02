<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    // Muestra el panel de administración con todos los usuarios
    public function index()
    {
        $usuarios = User::all();
        return view('AdminPanel.Admin_Page', compact('usuarios'));
    }

    // Crea un nuevo usuario desde el panel de administración
    public function crearUsuario(Request $request)
    {
        $request->validate([
            'nombre_usuario' => 'required|string|max:255|unique:users,nombre_usuario',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:1',
            'rol' => 'required|in:usuario,admin',
        ]);

        User::create([
            'nombre_usuario' => $request->nombre_usuario,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol' => $request->rol,
        ]);

        return redirect()->back()->with('success', 'Usuario creado correctamente.');
    }

    // Muestra el formulario para editar un usuario
    public function editarUsuario($id)
    {
        $usuario = User::findOrFail($id);
        return view('AdminPanel.Editar_Usuario', compact('usuario'));
    }

    // Actualiza los datos del usuario editado
    public function actualizarUsuario(Request $request, $id)
    {
        $usuario = User::findOrFail($id);

        $request->validate([
            'nombre_usuario' => 'required|string|max:255|unique:users,nombre_usuario,' . $usuario->id,
            'email' => 'required|email|unique:users,email,' . $usuario->id,
            'rol' => 'required|in:usuario,admin',
        ]);

        $usuario->nombre_usuario = $request->nombre_usuario;
        $usuario->email = $request->email;
        $usuario->rol = $request->rol;

        if ($request->filled('password')) {
            $usuario->password = bcrypt($request->password);
        }

        $usuario->save();

        return redirect()->route('admin.index')->with('success', 'Usuario actualizado correctamente.');
    }
}
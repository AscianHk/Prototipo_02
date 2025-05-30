<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules()
    {
        return [
            'nombre_usuario' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'rol' => 'required|in:usuario,admin'
        ];
    }

    public function messages()
    {
        return [
            'nombre_usuario.required' => 'El nombre de usuario es obligatorio',
            'nombre_usuario.unique' => 'Este nombre de usuario ya está en uso',
            'email.required' => 'El email es obligatorio',
            'email.unique' => 'Este email ya está registrado',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'rol.in' => 'El rol debe ser usuario o admin',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiaryEntryRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check() && auth()->id() == $this->route('usuario_id');
    }

    public function rules()
    {
        return [
            'capitulo' => 'required|integer|min:1',
            'texto' => 'required|string|max:5000'
        ];
    }

    public function messages()
    {
        return [
            'capitulo.required' => 'El número de capítulo es obligatorio',
            'capitulo.min' => 'El capítulo debe ser mayor a 0',
            'texto.required' => 'El texto de la entrada es obligatorio',
            'texto.max' => 'La entrada no puede exceder los 5000 caracteres',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules()
    {
        return [
            'texto' => 'required|string|max:2000',
            'puntuacion' => 'required|integer|min:1|max:5'
        ];
    }

    public function messages()
    {
        return [
            'texto.required' => 'El texto de la reseña es obligatorio',
            'texto.max' => 'La reseña no puede exceder los 2000 caracteres',
            'puntuacion.required' => 'La puntuación es obligatoria',
            'puntuacion.min' => 'La puntuación mínima es 1',
            'puntuacion.max' => 'La puntuación máxima es 5',
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Diario extends Model
{
    protected $fillable = [
        'usuario_id',
        'capitulo',
        'libro_id',
        'texto',
    ];

    public function usuario()
    {
        return $this->belongsTo(\App\Models\User::class, 'usuario_id');
    }

    public function libro()
    {
        return $this->belongsTo(\App\Models\Libro::class, 'libro_id');
    }
}
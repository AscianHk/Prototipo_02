<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    protected $fillable = [
    'google_id',
    'title',
    'author',
    'publisher',
    'published_date',
    'description',
    'page_count',
    'imagen_url',
    'language',
    'average_rating',
    'categories',
    'authors'
];

    protected $casts = [
        'authors' => 'array',
        'categories' => 'array',
        'average_rating' => 'float',
        'page_count' => 'integer',
    ];

    public function resenas()
    {
        return $this->hasMany(Resena::class);
    }

    public function listas()
    {
        return $this->belongsToMany(Lista::class, 'lista_libro');
    }

    // Accessor para imagen predeterminada
    public function getImagenUrlAttribute($value)
    {
        return $value ?? 'default-image.jpg';
    }
    
    public function diarios()
    {
        return $this->hasMany(\App\Models\Diario::class, 'libro_id');
    }


}

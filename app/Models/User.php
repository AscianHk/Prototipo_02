<?php
// filepath: app/Models/User.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'nombre_usuario',
        'email',
        'contrasena',
        'biografia',
        'avatar_url',
    ];

    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'contrasena' => 'hashed',
    ];

    public function resenas()
    {
        return $this->hasMany(Resena::class);
    }

    public function listas()
    {
        return $this->hasMany(Lista::class);
    }

    public function amigos()
    {
        return $this->hasMany(Amigo::class, 'usuario_id');
    }
}
<?php
// filepath: app/Models/User.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use Notifiable, HasFactory; //, HasApiTokens;

    protected $fillable = [
        'nombre_usuario',
        'email',
        'password',
        'biografia',
        'foto_perfil',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function resenas()
    {
        return $this->hasMany(\App\Models\Resena::class, 'usuario_id');

    }

    public function listas()
    {
        return $this->hasMany(Lista::class);
    }

    public function amigos()
    {
        return $this->hasMany(Amigo::class, 'usuario_id');
    }
    public function diarios()
    {
        return $this->hasMany(\App\Models\Diario::class, 'usuario_id');
    }

}
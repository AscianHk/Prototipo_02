<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lista extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'libro_id',
        'favorito',
        'tipo_lista',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    public function libro()
    {
        return $this->belongsTo(Libro::class);
    }
}
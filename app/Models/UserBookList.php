<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBookList extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'list_type',
    ];

    const LIST_TYPES = [
        'favorites',
        'want_to_read',
        'currently_reading',
        'read',
        'liked'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}

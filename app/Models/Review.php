<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book_id',
        'text',
        'rating',
    ];

    protected $casts = [
        'rating' => 'integer',
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

    // Model events
    protected static function booted()
    {
        static::created(function ($review) {
            $review->book->updateAverageRating();
        });

        static::updated(function ($review) {
            $review->book->updateAverageRating();
        });

        static::deleted(function ($review) {
            $review->book->updateAverageRating();
        });
    }
}

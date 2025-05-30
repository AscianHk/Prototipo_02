<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'google_id',
        'title',
        'author',
        'description',
        'publisher',
        'published_date',
        'page_count',
        'language',
        'image_url',
        'categories',
        'average_rating',
    ];

    protected $casts = [
        'categories' => 'array',
        'average_rating' => 'decimal:2',
        'page_count' => 'integer',
    ];

    // Relationships
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function userLists()
    {
        return $this->hasMany(UserBookList::class);
    }

    public function diaryEntries()
    {
        return $this->hasMany(DiaryEntry::class);
    }

    // Helper methods
    public function updateAverageRating()
    {
        $average = $this->reviews()->avg('rating');
        $this->update(['average_rating' => $average]);
    }

    public function getImageUrlAttribute($value)
    {
        return $value ?: "/placeholder.svg?height=300&width=200&text=" . urlencode($this->title);
    }
}

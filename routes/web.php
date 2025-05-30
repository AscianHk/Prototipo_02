<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiaryController;
use App\Http\Controllers\SearchController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home page
Route::get('/', [BookController::class, 'index'])->name('home');

// Search
Route::get('/search', [SearchController::class, 'search'])->name('search');

// Books
Route::get('/book/{id}', [BookController::class, 'show'])->name('book.show');
Route::get('/book/{id}/reviews', [ReviewController::class, 'index'])->name('book.reviews');

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    // User profile
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    
    // Book list management
    Route::post('/book/{id}/add-to-list', [BookController::class, 'addToList'])->name('book.addToList');
    Route::delete('/book/{id}/remove-from-list', [BookController::class, 'removeFromList'])->name('book.removeFromList');
    
    // Reviews
    Route::post('/book/{id}/reviews', [ReviewController::class, 'store'])->name('review.store');
    Route::put('/review/{id}', [ReviewController::class, 'update'])->name('review.update');
    Route::delete('/review/{id}', [ReviewController::class, 'destroy'])->name('review.destroy');
    
    // Reading diary
    Route::get('/diary/{user_id}/{book_id}', [DiaryController::class, 'show'])->name('diary.show');
    Route::post('/diary/{user_id}/{book_id}', [DiaryController::class, 'store'])->name('diary.store');
    
    // Follow users
    Route::post('/user/{id}/follow', [UserController::class, 'follow'])->name('user.follow');
    Route::delete('/user/{id}/unfollow', [UserController::class, 'unfollow'])->name('user.unfollow');
});

// Public user profiles
Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');

require __DIR__.'/auth.php';

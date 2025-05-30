<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Review;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index($bookId)
    {
        $book = Book::where('google_id', $bookId)->first();
        
        if (!$book) {
            return Inertia::render('Book/NotFound');
        }

        $reviews = Review::with('user')
            ->where('book_id', $book->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Book/Reviews', [
            'book' => $book,
            'reviews' => $reviews
        ]);
    }

    public function store(Request $request, $bookId)
    {
        $request->validate([
            'text' => 'required|string|max:2000',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $book = Book::where('google_id', $bookId)->first();
        
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        // Check if user already has a review for this book
        $existingReview = Review::where('user_id', auth()->id())
            ->where('book_id', $book->id)
            ->first();

        if ($existingReview) {
            return response()->json(['error' => 'You already have a review for this book'], 400);
        }

        $review = Review::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
            'text' => $request->text,
            'rating' => $request->rating
        ]);

        return response()->json([
            'message' => 'Review created successfully',
            'review' => $review->load('user')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'text' => 'required|string|max:2000',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        $review = Review::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $review->update([
            'text' => $request->text,
            'rating' => $request->rating
        ]);

        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review
        ]);
    }

    public function destroy($id)
    {
        $review = Review::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\DiaryEntry;
use Inertia\Inertia;

class DiaryController extends Controller
{
    public function show($userId, $bookId)
    {
        // Check if user can access this diary
        if (auth()->id() != $userId) {
            abort(403, 'You do not have permission to access this diary');
        }

        $book = Book::where('google_id', $bookId)->first();
        
        if (!$book) {
            return Inertia::render('Book/NotFound');
        }

        $entries = DiaryEntry::where('user_id', $userId)
            ->where('book_id', $book->id)
            ->orderBy('chapter')
            ->get();

        return Inertia::render('Diary/Show', [
            'book' => $book,
            'entries' => $entries
        ]);
    }

    public function store(Request $request, $userId, $bookId)
    {
        // Check if user can write to this diary
        if (auth()->id() != $userId) {
            abort(403, 'You do not have permission to write to this diary');
        }

        $request->validate([
            'chapter' => 'required|integer|min:1',
            'text' => 'required|string|max:5000'
        ]);

        $book = Book::where('google_id', $bookId)->firstOrFail();

        $entry = DiaryEntry::create([
            'user_id' => $userId,
            'book_id' => $book->id,
            'chapter' => $request->chapter,
            'text' => $request->text
        ]);

        return response()->json([
            'message' => 'Diary entry saved successfully',
            'entry' => $entry
        ], 201);
    }
}

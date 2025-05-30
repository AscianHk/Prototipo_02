<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Book;
use App\Models\UserBookList;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $featuredBooks = $this->getFeaturedBooks();
        $trendingBooks = $this->getTrendingBooks();
        $recentBooks = $this->getRecentBooks();
        
        return Inertia::render('Home', [
            'featuredBooks' => $featuredBooks,
            'trendingBooks' => $trendingBooks,
            'recentBooks' => $recentBooks,
        ]);
    }

    public function show($id)
    {
        try {
            // Search in local database first
            $book = Book::where('google_id', $id)->first();
            
            if (!$book) {
                // If it doesn't exist, search in Google Books API
                $bookData = $this->getBookFromGoogleAPI($id);
                if (!$bookData) {
                    return Inertia::render('Book/NotFound', ['bookId' => $id]);
                }
                
                // Save to database
                $book = Book::create([
                    'google_id' => $id,
                    'title' => $bookData['title'] ?? 'No title',
                    'author' => implode(', ', $bookData['authors'] ?? ['Unknown author']),
                    'description' => $bookData['description'] ?? '',
                    'publisher' => $bookData['publisher'] ?? '',
                    'published_date' => $bookData['publishedDate'] ?? null,
                    'page_count' => $bookData['pageCount'] ?? 0,
                    'language' => $bookData['language'] ?? 'es',
                    'image_url' => $bookData['imageLinks']['thumbnail'] ?? null,
                    'categories' => json_encode($bookData['categories'] ?? []),
                ]);
            }
            
            // Get user lists if authenticated
            $userLists = [];
            if (auth()->check()) {
                $userLists = UserBookList::where('user_id', auth()->id())
                    ->where('book_id', $book->id)
                    ->pluck('list_type')
                    ->toArray();
            }
            
            return Inertia::render('Book/Show', [
                'book' => $book,
                'userLists' => $userLists,
            ]);
            
        } catch (\Exception $e) {
            return Inertia::render('Book/NotFound', ['bookId' => $id]);
        }
    }

    public function addToList(Request $request, $id)
    {
        $request->validate([
            'list_type' => 'required|in:favorites,want_to_read,currently_reading,read,liked'
        ]);

        $book = Book::where('google_id', $id)->first();
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        // Check if already in list
        $exists = UserBookList::where('user_id', auth()->id())
            ->where('book_id', $book->id)
            ->where('list_type', $request->list_type)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Book already in this list'], 200);
        }

        UserBookList::create([
            'user_id' => auth()->id(),
            'book_id' => $book->id,
            'list_type' => $request->list_type
        ]);

        return response()->json(['message' => 'Book added to list successfully'], 201);
    }

    public function removeFromList(Request $request, $id)
    {
        $request->validate([
            'list_type' => 'required|in:favorites,want_to_read,currently_reading,read,liked'
        ]);

        $book = Book::where('google_id', $id)->first();
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        UserBookList::where('user_id', auth()->id())
            ->where('book_id', $book->id)
            ->where('list_type', $request->list_type)
            ->delete();

        return response()->json(['message' => 'Book removed from list'], 200);
    }

    private function getFeaturedBooks()
    {
        return collect([
            ['id' => 'dune', 'title' => 'Dune', 'author' => 'Frank Herbert', 'rating' => 4.7],
            ['id' => 'cien-anos', 'title' => 'Cien años de soledad', 'author' => 'Gabriel García Márquez', 'rating' => 4.9],
            ['id' => '1984', 'title' => '1984', 'author' => 'George Orwell', 'rating' => 4.6],
            ['id' => 'hobbit', 'title' => 'El Hobbit', 'author' => 'J.R.R. Tolkien', 'rating' => 4.8],
        ]);
    }

    private function getTrendingBooks()
    {
        return $this->getFeaturedBooks();
    }

    private function getRecentBooks()
    {
        return $this->getFeaturedBooks();
    }

    private function getBookFromGoogleAPI($id)
    {
        try {
            $response = Http::get("https://www.googleapis.com/books/v1/volumes/{$id}");
            
            if ($response->successful()) {
                return $response->json()['volumeInfo'] ?? null;
            }
            
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}


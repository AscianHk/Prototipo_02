<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\Book;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $type = $request->get('type', 'title');
        $page = (int) $request->get('page', 1);
        $perPage = 10;

        if (empty($query)) {
            return Inertia::render('SearchResults', [
                'query' => $query,
                'type' => $type,
                'books' => collect(),
                'users' => collect(),
                'currentPage' => $page,
                'totalPages' => 0
            ]);
        }

        if ($type === 'user') {
            // User search
            $users = User::where('username', 'like', "%{$query}%")
                ->paginate($perPage, ['*'], 'page', $page);

            return Inertia::render('SearchResults', [
                'query' => $query,
                'type' => $type,
                'books' => collect(),
                'users' => $users->items(),
                'currentPage' => $page,
                'totalPages' => $users->lastPage()
            ]);
        } else {
            // Book search
            $books = $this->searchBooks($query, $type, $page, $perPage);

            return Inertia::render('SearchResults', [
                'query' => $query,
                'type' => $type,
                'books' => $books['items'],
                'users' => collect(),
                'currentPage' => $page,
                'totalPages' => $books['totalPages']
            ]);
        }
    }

    private function searchBooks($query, $type, $page, $perPage)
    {
        try {
            $searchQuery = $this->buildGoogleBooksQuery($query, $type);
            $startIndex = ($page - 1) * $perPage;

            $response = Http::get('https://www.googleapis.com/books/v1/volumes', [
                'q' => $searchQuery,
                'startIndex' => $startIndex,
                'maxResults' => $perPage,
                'langRestrict' => 'es'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $totalItems = $data['totalItems'] ?? 0;
                $items = $data['items'] ?? [];

                return [
                    'items' => collect($items),
                    'totalPages' => min(ceil($totalItems / $perPage), 10)
                ];
            }

            return ['items' => collect(), 'totalPages' => 0];

        } catch (\Exception $e) {
            return ['items' => collect(), 'totalPages' => 0];
        }
    }

    private function buildGoogleBooksQuery($query, $type)
    {
        switch ($type) {
            case 'author':
                return "inauthor:{$query}";
            case 'genre':
                return "subject:{$query}";
            case 'title':
            default:
                return "intitle:{$query}";
        }
    }
}

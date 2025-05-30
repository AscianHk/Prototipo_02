<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserBookList;
use App\Models\Review;
use App\Models\UserFollow;
use Inertia\Inertia;

class UserController extends Controller
{
    public function profile()
    {
        $user = auth()->user();
        
        // Get user book lists
        $lists = [
            'favorites' => $this->getUserBooks($user->id, 'favorites'),
            'want_to_read' => $this->getUserBooks($user->id, 'want_to_read'),
            'currently_reading' => $this->getUserBooks($user->id, 'currently_reading'),
            'read' => $this->getUserBooks($user->id, 'read'),
            'liked' => $this->getUserBooks($user->id, 'liked'),
        ];

        // Get user reviews
        $reviews = Review::with('book')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        // Statistics
        $stats = [
            'followers' => UserFollow::where('followed_id', $user->id)->count(),
            'following' => UserFollow::where('follower_id', $user->id)->count(),
            'reviews' => $reviews->count(),
            'books_read' => $lists['read']->count(),
        ];

        return Inertia::render('User/Profile', [
            'user' => $user,
            'lists' => $lists,
            'reviews' => $reviews,
            'stats' => $stats,
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        
        // Check if current user follows this user
        $isFollowing = false;
        if (auth()->check()) {
            $isFollowing = UserFollow::where('follower_id', auth()->id())
                ->where('followed_id', $id)
                ->exists();
        }

        // Get public reviews
        $reviews = Review::with('book')
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Statistics
        $stats = [
            'followers' => UserFollow::where('followed_id', $id)->count(),
            'following' => UserFollow::where('follower_id', $id)->count(),
            'reviews' => Review::where('user_id', $id)->count(),
        ];

        return Inertia::render('User/Show', [
            'user' => $user,
            'reviews' => $reviews,
            'stats' => $stats,
            'isFollowing' => $isFollowing,
        ]);
    }

    public function follow($id)
    {
        if ($id == auth()->id()) {
            return response()->json(['error' => 'Cannot follow yourself'], 400);
        }

        $user = User::findOrFail($id);

        $follow = UserFollow::firstOrCreate([
            'follower_id' => auth()->id(),
            'followed_id' => $id
        ]);

        return response()->json([
            'message' => $follow->wasRecentlyCreated ? 'User followed' : 'Already following this user',
            'following' => true
        ]);
    }

    public function unfollow($id)
    {
        UserFollow::where('follower_id', auth()->id())
            ->where('followed_id', $id)
            ->delete();

        return response()->json([
            'message' => 'User unfollowed',
            'following' => false
        ]);
    }

    private function getUserBooks($userId, $listType)
    {
        return UserBookList::with('book')
            ->where('user_id', $userId)
            ->where('list_type', $listType)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->book->id,
                    'title' => $item->book->title,
                    'author' => $item->book->author,
                    'cover' => $item->book->image_url,
                    'googleId' => $item->book->google_id,
                ];
            });
    }
}

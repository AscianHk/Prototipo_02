<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'nombre_usuario' => $request->user()->nombre_usuario,
                    'email' => $request->user()->email,
                    'foto_perfil' => $request->user()->foto_perfil,
                    'biografia' => $request->user()->biografia,
                    'rol' => $request->user()->rol,
                    'avatar_url' => $request->user()->avatar_url,
                    'is_admin' => $request->user()->isAdmin(),
                ] : null,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'csrf_token' => csrf_token(),
        ]);
    }
}

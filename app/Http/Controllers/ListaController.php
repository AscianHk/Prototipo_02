<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreListaRequest;
use App\Http\Requests\UpdateListaRequest;
use App\Models\Lista;

class ListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $favoritos = $user->listas()->with('libro')->where('favorito', true)->get();
        $pendiente = $user->listas()->with('libro')->where('tipo_lista', 'pendiente')->get();
        $leyendo   = $user->listas()->with('libro')->where('tipo_lista', 'leyendo')->get();
        $terminado = $user->listas()->with('libro')->where('tipo_lista', 'terminado')->get();
        $me_gusta  = $user->listas()->with('libro')->where('tipo_lista', 'me_gusta')->get();

        return view('UserPanel.Listas', compact('favoritos', 'pendiente', 'leyendo', 'terminado', 'me_gusta'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lista $lista)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lista $lista)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListaRequest $request, Lista $lista)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lista $lista)
    {
        //
    }
}

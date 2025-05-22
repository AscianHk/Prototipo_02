<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreListaRequest;
use App\Http\Requests\UpdateListaRequest;
use Illuminate\Http\Request;
use App\Models\Lista;

class ListaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $user = auth()->user();
        // dd($user);

        $favoritos = $user->listas()->with('libro')->where('favorito', true)->get();
        $pendiente = $user->listas()->with('libro')->where('tipo_lista', 'pendiente')->get();
        $leyendo   = $user->listas()->with('libro')->where('tipo_lista', 'leyendo')->get();
        $terminado = $user->listas()->with('libro')->where('tipo_lista', 'terminado')->get();
        $me_gusta  = $user->listas()->with('libro')->where('tipo_lista', 'me_gusta')->get();

        // Debug temporal para ver si llegan datos:
        // @dd($favoritos, $pendiente, $leyendo, $terminado, $me_gusta);

        return view('UserPanel.listas', compact('favoritos', 'pendiente', 'leyendo', 'terminado', 'me_gusta'));
    }
    public function agregar(Request $request)
    {
        $request->validate([
            'libro_id' => 'required|exists:libros,id',
            'tipo_lista' => 'required|in:favorito,pendiente,leyendo,terminado,me_gusta',
        ]);

        $user = auth()->user();

        // Si es favorito, marca el booleano, si no, usa tipo_lista
        $data = [
            'user_id' => $user->id,
            'libro_id' => $request->libro_id,
            'favorito' => $request->tipo_lista === 'favorito',
            'tipo_lista' => $request->tipo_lista !== 'favorito' ? $request->tipo_lista : null,
        ];

        // Evita duplicados
        $existe = \App\Models\Lista::where('user_id', $user->id)
            ->where('libro_id', $request->libro_id)
            ->where(function($q) use ($request) {
                if ($request->tipo_lista === 'favorito') {
                    $q->where('favorito', true);
                } else {
                    $q->where('tipo_lista', $request->tipo_lista);
                }
            })->first();

        if (!$existe) {
            \App\Models\Lista::create($data);
        }

        return back()->with('success', 'Libro añadido a la lista correctamente.');
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
    public function eliminar($id)
    {
        $item = \App\Models\Lista::findOrFail($id);
        if ($item->user_id === auth()->id()) {
            $item->delete();
        }
        return back()->with('success', 'Libro eliminado de la lista.');
    }
}

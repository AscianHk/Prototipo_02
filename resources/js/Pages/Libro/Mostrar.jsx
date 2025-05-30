"use client"

import { useState } from "react"
import { Link, router } from "@inertiajs/react"
import { Heart, BookOpen, Calendar, User, MessageSquare, Plus, Check } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"

export default function MostrarLibro({ auth, libro, listasUsuario = [] }) {
  const [cargandoLista, setCargandoLista] = useState(false)

  const agregarALista = async (tipoLista) => {
    if (!auth.user) {
      router.visit("/login")
      return
    }

    setCargandoLista(true)

    try {
      const response = await fetch(`/libro/${libro.google_id}/agregar-lista`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ tipo_lista: tipoLista }),
      })

      if (response.ok) {
        // Recargar la página para actualizar las listas
        router.reload()
      }
    } catch (error) {
      console.error("Error al agregar a lista:", error)
    } finally {
      setCargandoLista(false)
    }
  }

  const quitarDeLista = async (tipoLista) => {
    setCargandoLista(true)

    try {
      const response = await fetch(`/libro/${libro.google_id}/quitar-lista`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify({ tipo_lista: tipoLista }),
      })

      if (response.ok) {
        router.reload()
      }
    } catch (error) {
      console.error("Error al quitar de lista:", error)
    } finally {
      setCargandoLista(false)
    }
  }

  const toggleLista = (tipoLista) => {
    if (listasUsuario.includes(tipoLista)) {
      quitarDeLista(tipoLista)
    } else {
      agregarALista(tipoLista)
    }
  }

  return (
    <AppLayout auth={auth} title={libro.titulo}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portada del libro */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={
                  libro.imagen_url || `/placeholder.svg?height=600&width=400&text=${encodeURIComponent(libro.titulo)}`
                }
                alt={libro.titulo}
                className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
              />

              {/* Botones de acción */}
              {auth.user && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => toggleLista("favoritos")}
                    disabled={cargandoLista}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      listasUsuario.includes("favoritos")
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${listasUsuario.includes("favoritos") ? "fill-current" : ""}`} />
                    {listasUsuario.includes("favoritos") ? "En Favoritos" : "Añadir a Favoritos"}
                  </button>

                  <button
                    onClick={() => toggleLista("leyendo")}
                    disabled={cargandoLista}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      listasUsuario.includes("leyendo")
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <BookOpen className="h-5 w-5" />
                    {listasUsuario.includes("leyendo") ? "Leyendo" : "Marcar como Leyendo"}
                  </button>

                  <button
                    onClick={() => toggleLista("pendiente")}
                    disabled={cargandoLista}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      listasUsuario.includes("pendiente")
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                    {listasUsuario.includes("pendiente") ? "En Lista de Pendientes" : "Añadir a Pendientes"}
                  </button>

                  <button
                    onClick={() => toggleLista("terminado")}
                    disabled={cargandoLista}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      listasUsuario.includes("terminado")
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    <Check className="h-5 w-5" />
                    {listasUsuario.includes("terminado") ? "Terminado" : "Marcar como Terminado"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Información del libro */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{libro.titulo}</h1>
                <p className="text-xl text-blue-300 mb-4">por {libro.autor}</p>

                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  {libro.editorial && (
                    <div className="flex items-center gap-1">
                      <span>Editorial:</span>
                      <span className="text-white">{libro.editorial}</span>
                    </div>
                  )}
                  {libro.fecha_publicacion && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{libro.fecha_publicacion}</span>
                    </div>
                  )}
                  {libro.numero_paginas > 0 && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{libro.numero_paginas} páginas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Descripción */}
              {libro.descripcion && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-3">Descripción</h2>
                  <p className="text-white/80 leading-relaxed">{libro.descripcion}</p>
                </div>
              )}

              {/* Categorías */}
              {libro.categorias && JSON.parse(libro.categorias).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(libro.categorias).map((categoria, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">
                        {categoria}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Acciones adicionales */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/libro/${libro.google_id}/resenas`}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Ver Reseñas
                </Link>

                {auth.user && (
                  <Link
                    href={`/diario/${auth.user.id}/${libro.google_id}`}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <User className="h-5 w-5" />
                    Mi Diario
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

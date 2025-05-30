"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Textarea } from "@/resources/js/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/resources/js/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/resources/js/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/resources/js/components/ui/avatar"
import { BookOpen, Star, ArrowLeft, Edit, Trash2, MessageSquare, Send } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

// Tipos para las reseñas
interface Resena {
  id: number
  usuario_id: number
  usuario: {
    id: number
    nombre_usuario: string
    foto_perfil?: string
  }
  texto: string
  puntuacion: number
  created_at: string
}

interface BookInfo {
  id: string
  title: string
}

export default function ResenaPage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [libro, setLibro] = useState<BookInfo | null>(null)
  const [resenas, setResenas] = useState<Resena[]>([])
  const [newReview, setNewReview] = useState({ texto: "", puntuacion: "" })
  const [submitting, setSubmitting] = useState(false)

  const bookId = params.id as string

  useEffect(() => {
    // Simulamos la carga del libro y sus reseñas
    setLoading(true)

    // Datos simulados del libro
    const mockLibros: { [key: string]: BookInfo } = {
      dune: { id: "dune", title: "Dune" },
      "1984": { id: "1984", title: "1984" },
      "cien-anos": { id: "cien-anos", title: "Cien años de soledad" },
      hobbit: { id: "hobbit", title: "El Hobbit" },
      abc123: { id: "abc123", title: "Cien años de soledad" },
      def456: { id: "def456", title: "El amor en los tiempos del cólera" },
    }

    // Reseñas simuladas
    const mockResenas: Resena[] = [
      {
        id: 1,
        usuario_id: 1,
        usuario: {
          id: 1,
          nombre_usuario: "maria_garcia",
          foto_perfil: "https://i.pravatar.cc/150?img=1",
        },
        texto:
          "Una obra maestra absoluta de la ciencia ficción. Herbert creó un universo complejo y fascinante que sigue siendo relevante décadas después de su publicación. La construcción del mundo es impresionante y los temas políticos y ecológicos son profundos.",
        puntuacion: 5,
        created_at: "2024-12-15T10:30:00Z",
      },
      {
        id: 2,
        usuario_id: 2,
        usuario: {
          id: 2,
          nombre_usuario: "juan_lector",
          foto_perfil: "https://i.pravatar.cc/150?img=2",
        },
        texto:
          "Excelente libro, aunque al principio puede resultar un poco denso. Una vez que te sumerges en el mundo de Arrakis, es imposible parar de leer. Los personajes están muy bien desarrollados y la trama es cautivadora.",
        puntuacion: 4,
        created_at: "2024-12-10T15:45:00Z",
      },
      {
        id: 3,
        usuario_id: 3,
        usuario: {
          id: 3,
          nombre_usuario: "ana_sci_fi",
          foto_perfil: "https://i.pravatar.cc/150?img=3",
        },
        texto:
          "Un clásico que todo amante de la ciencia ficción debe leer. La visión de Herbert sobre el futuro, la política y la religión es extraordinaria. Aunque es un libro largo, cada página vale la pena.",
        puntuacion: 5,
        created_at: "2024-12-05T09:20:00Z",
      },
    ]

    setTimeout(() => {
      const foundBook = mockLibros[bookId]
      if (foundBook) {
        setLibro(foundBook)
        setResenas(mockResenas)
      }
      setLoading(false)
    }, 500)
  }, [bookId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated || !user || !newReview.texto.trim() || !newReview.puntuacion) return

    setSubmitting(true)

    try {
      // Simulamos la creación de una nueva reseña
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const nuevaResena: Resena = {
        id: Date.now(),
        usuario_id: user.id,
        usuario: {
          id: user.id,
          nombre_usuario: user.username,
          foto_perfil: user.avatar,
        },
        texto: newReview.texto,
        puntuacion: Number.parseInt(newReview.puntuacion),
        created_at: new Date().toISOString(),
      }

      setResenas([nuevaResena, ...resenas])
      setNewReview({ texto: "", puntuacion: "" })
      alert("Reseña enviada exitosamente!")
    } catch (error) {
      console.error("Error al enviar reseña:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteReview = async (resenaId: number) => {
    if (!confirm("¿Seguro que quieres borrar esta reseña?")) return

    try {
      // Simulamos la eliminación
      await new Promise((resolve) => setTimeout(resolve, 500))
      setResenas(resenas.filter((r) => r.id !== resenaId))
      alert("Reseña eliminada exitosamente!")
    } catch (error) {
      console.error("Error al eliminar reseña:", error)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
          <MainNav />
          <main className="container py-8 flex justify-center items-center min-h-[60vh]">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </main>
        </div>
      </ThemeProvider>
    )
  }

  if (!libro) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
          <MainNav />
          <main className="container py-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Libro no encontrado</h1>
                <p className="text-white/80 mb-6">No se pueden mostrar las reseñas de un libro que no existe.</p>
                <Link href="/">
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al inicio
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </main>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <MainNav />
        <main className="container py-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Reseñas de "{libro.title}"
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Lista de reseñas */}
              <div className="space-y-6 mb-8">
                {resenas.length > 0 ? (
                  resenas.map((resena) => (
                    <div
                      key={resena.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <Link href={`/perfil/${resena.usuario.id}`}>
                          <Avatar className="h-12 w-12 border border-white/20 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform">
                            <AvatarImage
                              src={
                                resena.usuario.foto_perfil ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(resena.usuario.nombre_usuario) || "/placeholder.svg"}`
                              }
                              alt={resena.usuario.nombre_usuario}
                            />
                            <AvatarFallback className="bg-purple-700 text-white">
                              {resena.usuario.nombre_usuario.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/perfil/${resena.usuario.id}`}
                                className="font-semibold text-blue-300 hover:text-blue-200 hover:underline"
                              >
                                {resena.usuario.nombre_usuario}
                              </Link>
                              {renderStars(resena.puntuacion)}
                            </div>
                            <div className="text-xs text-white/60">Publicado el {formatDate(resena.created_at)}</div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 mb-3">
                            <p className="text-white/90 leading-relaxed">{resena.texto}</p>
                          </div>
                          {isAuthenticated && user && resena.usuario_id === user.id && (
                            <div className="flex gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30 p-2 h-auto"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteReview(resena.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 h-auto"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Borrar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">No hay reseñas para este libro todavía.</p>
                    <p className="text-white/40 text-sm mt-2">¡Sé el primero en escribir una reseña!</p>
                  </div>
                )}
              </div>

              {/* Formulario para nueva reseña */}
              {isAuthenticated ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Escribe tu reseña
                  </h2>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Comparte tu opinión sobre este libro..."
                        value={newReview.texto}
                        onChange={(e) => setNewReview({ ...newReview, texto: e.target.value })}
                        required
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="font-medium text-white/90">Puntuación:</label>
                      <Select
                        value={newReview.puntuacion}
                        onValueChange={(value) => setNewReview({ ...newReview, puntuacion: value })}
                      >
                        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 ⭐</SelectItem>
                          <SelectItem value="2">2 ⭐</SelectItem>
                          <SelectItem value="3">3 ⭐</SelectItem>
                          <SelectItem value="4">4 ⭐</SelectItem>
                          <SelectItem value="5">5 ⭐</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting || !newReview.texto.trim() || !newReview.puntuacion}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {submitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar reseña
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 text-center">
                  <p className="text-blue-300 mb-4">Inicia sesión para dejar una reseña</p>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Iniciar sesión
                    </Button>
                  </Link>
                </div>
              )}

              {/* Navegación */}
              <div className="mt-8 text-center">
                <Link href={`/libro/${bookId}`}>
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al libro
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}

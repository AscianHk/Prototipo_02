"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Card, CardContent } from "@/resources/js/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/resources/js/components/ui/avatar"
import { Star, Search, Users, UserPlus, UserMinus, MessageSquare } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"
import { useFollow } from "@/resources/js/Pages/hooks/use-follow"

// Tipos para el perfil de usuario
interface UserProfile {
  id: number
  nombre_usuario: string
  foto_perfil?: string
  biografia?: string
}

interface UserReview {
  id: number
  libro: {
    id: string
    title: string
  }
  texto: string
  puntuacion: number
  created_at: string
}

export default function UserProfilePage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState<UserProfile | null>(null)
  const [resenas, setResenas] = useState<UserReview[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const userId = Number.parseInt(params.id as string)
  const {
    isFollowing,
    followersCount,
    followingCount,
    isLoading: followLoading,
    toggleFollow,
  } = useFollow(userId, user?.id)

  useEffect(() => {
    // Simulamos la carga del perfil del usuario
    setLoading(true)

    // Datos simulados de usuarios
    const mockUsuarios: { [key: number]: UserProfile } = {
      1: {
        id: 1,
        nombre_usuario: "maria_garcia",
        foto_perfil: "https://i.pravatar.cc/150?img=1",
        biografia:
          "Amante de la literatura fantástica y la ciencia ficción. Siempre en busca de nuevos mundos que explorar a través de las páginas.",
      },
      2: {
        id: 2,
        nombre_usuario: "juan_lector",
        foto_perfil: "https://i.pravatar.cc/150?img=2",
        biografia:
          "Lector voraz de novelas históricas y biografías. Me encanta descubrir historias que me transporten a otras épocas.",
      },
      3: {
        id: 3,
        nombre_usuario: "ana_sci_fi",
        foto_perfil: "https://i.pravatar.cc/150?img=3",
        biografia:
          "Especialista en ciencia ficción y fantasía. Siempre buscando la próxima gran saga que me mantenga despierta toda la noche.",
      },
    }

    // Reseñas simuladas del usuario
    const mockResenas: { [key: number]: UserReview[] } = {
      1: [
        {
          id: 1,
          libro: { id: "dune", title: "Dune" },
          texto:
            "Una obra maestra absoluta de la ciencia ficción. Herbert creó un universo complejo y fascinante que sigue siendo relevante décadas después de su publicación.",
          puntuacion: 5,
          created_at: "2024-12-15T10:30:00Z",
        },
        {
          id: 2,
          libro: { id: "1984", title: "1984" },
          texto:
            "Un libro perturbador pero necesario. Orwell logró crear una distopía que se siente cada vez más real en nuestros tiempos.",
          puntuacion: 4,
          created_at: "2024-12-10T15:45:00Z",
        },
      ],
      2: [
        {
          id: 3,
          libro: { id: "dune", title: "Dune" },
          texto:
            "Excelente libro, aunque al principio puede resultar un poco denso. Una vez que te sumerges en el mundo de Arrakis, es imposible parar de leer.",
          puntuacion: 4,
          created_at: "2024-12-10T15:45:00Z",
        },
      ],
      3: [
        {
          id: 4,
          libro: { id: "dune", title: "Dune" },
          texto:
            "Un clásico que todo amante de la ciencia ficción debe leer. La visión de Herbert sobre el futuro, la política y la religión es extraordinaria.",
          puntuacion: 5,
          created_at: "2024-12-05T09:20:00Z",
        },
        {
          id: 5,
          libro: { id: "hobbit", title: "El Hobbit" },
          texto:
            "Una aventura encantadora que funciona tanto para niños como para adultos. Tolkien tenía un don especial para crear mundos mágicos.",
          puntuacion: 5,
          created_at: "2024-11-28T14:15:00Z",
        },
      ],
    }

    setTimeout(() => {
      const foundUser = mockUsuarios[userId]
      if (foundUser) {
        setUsuario(foundUser)
        setResenas(mockResenas[userId] || [])
      }
      setLoading(false)
    }, 500)
  }, [userId])

  const handleUserSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // En producción, esto redirigiría a la búsqueda de usuarios
      console.log(`Buscando usuario: ${searchQuery}`)
      alert(`Buscando usuario: "${searchQuery}"`)
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
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

  const isOwnProfile = isAuthenticated && user && user.id === userId

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

  if (!usuario) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
          <MainNav />
          <main className="container py-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Usuario no encontrado</h1>
                <p className="text-white/80 mb-6">El usuario que buscas no existe o ha sido eliminado.</p>
                <Link href="/">
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
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
          {/* Búsqueda de usuarios */}
          <form onSubmit={handleUserSearch} className="mb-8 flex gap-2 justify-center w-full max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Buscar usuario
            </Button>
          </form>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Header del perfil */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="flex-shrink-0">
                  <Avatar className="h-32 w-32 border-4 border-white/20">
                    <AvatarImage
                      src={
                        usuario.foto_perfil ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre_usuario) || "/placeholder.svg"}`
                      }
                      alt={`Perfil de ${usuario.nombre_usuario}`}
                    />
                    <AvatarFallback className="text-4xl bg-purple-700 text-white">
                      {usuario.nombre_usuario.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
                    {usuario.nombre_usuario}
                  </h2>
                  <div className="bg-white/5 rounded-lg p-4 mb-4 min-h-[80px]">
                    <p className="text-white/90">{usuario.biografia || "Sin biografía."}</p>
                  </div>

                  {/* Estadísticas */}
                  <div className="flex items-center justify-center md:justify-start gap-6 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                      <span className="text-white/80">
                        <strong>{resenas.length}</strong> reseñas
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-white/80">
                        <strong>{followersCount}</strong> seguidores
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-white/80">
                        <strong>{followingCount}</strong> siguiendo
                      </span>
                    </div>
                  </div>

                  {/* Botones de seguir */}
                  {!isOwnProfile && isAuthenticated && (
                    <div className="flex gap-2 justify-center md:justify-start">
                      {isFollowing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-600 text-white border-green-600 cursor-default"
                            disabled
                          >
                            <Users className="h-4 w-4 mr-2" />
                            Siguiendo
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-400 text-red-400 hover:bg-red-900/30"
                            onClick={toggleFollow}
                            disabled={followLoading}
                          >
                            <UserMinus className="h-4 w-4 mr-2" />
                            {followLoading ? "..." : "Dejar de seguir"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={toggleFollow}
                          disabled={followLoading}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {followLoading ? "..." : "Seguir usuario"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sección de reseñas */}
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Reseñas
                </h3>
                {resenas.length > 0 ? (
                  <div className="space-y-4">
                    {resenas.map((resena) => (
                      <div
                        key={resena.id}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            href={`/libro/${resena.libro.id}`}
                            className="font-semibold text-blue-300 hover:text-blue-200 hover:underline"
                          >
                            {resena.libro.title}
                          </Link>
                          {renderStars(resena.puntuacion)}
                        </div>
                        <div className="text-white/90 mb-2">{resena.texto}</div>
                        <div className="text-xs text-white/60">Publicado el {formatDate(resena.created_at)}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Este usuario no ha escrito ninguna reseña todavía.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}

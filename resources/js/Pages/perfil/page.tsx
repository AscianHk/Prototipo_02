"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/resources/js/components/ui/avatar"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/resources/js/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/resources/js/components/ui/card"
import { BookOpen, Edit, Settings, Star, Search, Users, UserPlus, UserMinus } from "lucide-react"
import { BookListDetailed } from "@/resources/js/components/book-list-detailed"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"
import { useFollow } from "@/resources/js/Pages/hooks/use-follow"

// Datos simulados de reseñas
const mockReviews = [
  {
    id: 1,
    bookTitle: "El Silmarillion",
    bookAuthor: "J.R.R. Tolkien",
    bookCover: "/images/books/silmarillion.png",
    rating: 5,
    text: "Una obra maestra que expande el universo de la Tierra Media. La creación de Arda y las historias de los primeros días son fascinantes. La caída de Melkor y las guerras de los Silmarils son épicas en todo sentido. Recomendado para fans de Tolkien que quieran profundizar en su mitología.",
    createdAt: "2025-04-12T10:30:00Z",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    bookCover: "/images/books/1984.png",
    rating: 4,
    text: "Una distopía que sigue siendo relevante hoy en día. La vigilancia constante, la manipulación de la verdad y el control del pensamiento son temas que Orwell desarrolla magistralmente. La historia de Winston Smith es desgarradora y el final es impactante. Una lectura obligada.",
    createdAt: "2025-03-03T15:45:00Z",
    likes: 37,
    comments: 12,
  },
  {
    id: 3,
    bookTitle: "Cien años de soledad",
    bookAuthor: "Gabriel García Márquez",
    bookCover: "/images/books/cien-anos.jpg",
    rating: 5,
    text: "El realismo mágico en su máxima expresión. La historia de la familia Buendía a lo largo de siete generaciones es fascinante. Macondo se siente como un lugar real a pesar de todos los elementos fantásticos. García Márquez crea un mundo completo con sus propias reglas y mitología.",
    createdAt: "2025-02-15T09:20:00Z",
    likes: 56,
    comments: 14,
  },
]

// Datos simulados de listas
const mockLists = {
  favoritos: [
    {
      id: 1,
      title: "El Silmarillion",
      author: "J.R.R. Tolkien",
      cover: "/images/books/silmarillion.png",
      googleId: "silmarillion-123",
    },
    {
      id: 2,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover: "/images/books/cien-anos.jpg",
      googleId: "cien-anos-456",
    },
    { id: 3, title: "El Hobbit", author: "J.R.R. Tolkien", cover: "/images/books/hobbit.jpg", googleId: "hobbit-789" },
  ],
  pendiente: [
    { id: 4, title: "Dune", author: "Frank Herbert", cover: "/images/books/dune.jpg", googleId: "dune-101" },
    {
      id: 5,
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      cover: "/images/books/nombre-viento.jpg",
      googleId: "viento-102",
    },
    {
      id: 6,
      title: "Neuromante",
      author: "William Gibson",
      cover: "/images/books/neuromante.jpg",
      googleId: "neuromante-103",
    },
    {
      id: 7,
      title: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      cover: "/images/books/sombra-viento.jpg",
      googleId: "sombra-104",
    },
    {
      id: 8,
      title: "El problema de los tres cuerpos",
      author: "Liu Cixin",
      cover: "/images/books/tres-cuerpos.jpg",
      googleId: "tres-cuerpos-105",
    },
    {
      id: 9,
      title: "Fundación",
      author: "Isaac Asimov",
      cover: "/images/books/fundacion.jpg",
      googleId: "fundacion-106",
    },
  ],
  leyendo: [
    {
      id: 10,
      title: "El visitante",
      author: "Stephen King",
      cover: "/images/books/visitante.jpg",
      googleId: "visitante-201",
    },
    {
      id: 11,
      title: "Reina Roja",
      author: "Juan Gómez-Jurado",
      cover: "/images/books/reina-roja.jpg",
      googleId: "reina-roja-202",
    },
    {
      id: 12,
      title: "La paciente silenciosa",
      author: "Alex Michaelides",
      cover: "/images/books/paciente.jpg",
      googleId: "paciente-203",
    },
  ],
  terminado: [
    { id: 13, title: "1984", author: "George Orwell", cover: "/images/books/1984.png", googleId: "1984-301" },
    {
      id: 14,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      cover: "/images/books/quijote.jpg",
      googleId: "quijote-302",
    },
    {
      id: 15,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      cover: "/images/books/principito.jpg",
      googleId: "principito-303",
    },
    { id: 16, title: "Rayuela", author: "Julio Cortázar", cover: "/images/books/rayuela.jpg", googleId: "rayuela-304" },
    { id: 17, title: "Pedro Páramo", author: "Juan Rulfo", cover: "/images/books/paramo.jpg", googleId: "paramo-305" },
    {
      id: 18,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      cover: "/images/books/fahrenheit.jpg",
      googleId: "fahrenheit-306",
    },
  ],
  megusta: [
    {
      id: 19,
      title: "El Silmarillion",
      author: "J.R.R. Tolkien",
      cover: "/images/books/silmarillion.png",
      googleId: "silmarillion-401",
    },
    {
      id: 20,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover: "/images/books/cien-anos.jpg",
      googleId: "cien-anos-402",
    },
    { id: 21, title: "El Hobbit", author: "J.R.R. Tolkien", cover: "/images/books/hobbit.jpg", googleId: "hobbit-403" },
    {
      id: 22,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      cover: "/images/books/fahrenheit.jpg",
      googleId: "fahrenheit-404",
    },
  ],
}

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [lists, setLists] = useState(mockLists)
  const { user, isAuthenticated } = useAuth()

  // Simular que estamos viendo nuestro propio perfil
  const isOwnProfile = true
  const profileUser = user || {
    id: 1,
    name: "María García",
    username: "maria_garcia",
    avatar: "/images/profile.png",
    bio: "Amante de la literatura fantástica y la ciencia ficción. Siempre en busca de nuevos mundos que explorar a través de las páginas. Estudiante de literatura comparada y escritora aficionada.",
  }

  const { isFollowing, followersCount, followingCount, isLoading, toggleFollow } = useFollow(profileUser.id, user?.id)

  const handleUserSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(`Buscando usuario: ${searchQuery}`)
      alert(`Buscando usuario: "${searchQuery}"`)
    }
  }

  const handleRemoveBook = (listType: string, bookId: number) => {
    setLists((prev) => ({
      ...prev,
      [listType]: prev[listType as keyof typeof prev].filter((book) => book.id !== bookId),
    }))
    console.log(`Libro ${bookId} eliminado de la lista ${listType}`)
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

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <MainNav />
        <main className="container py-6">
          {/* Búsqueda de usuarios */}
          <form onSubmit={handleUserSearch} className="mb-8 flex gap-2 justify-center w-full max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Buscar usuario
            </Button>
          </form>

          {/* Perfil Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-shrink-0">
              <Avatar className="h-32 w-32 border-4 border-secondary">
                <AvatarImage
                  src={profileUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileUser.name)}`}
                  alt={`@${profileUser.username}`}
                />
                <AvatarFallback className="text-4xl bg-purple-700 text-white">
                  {profileUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{profileUser.name}</h1>
                  <p className="text-muted-foreground">@{profileUser.username}</p>
                </div>
                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-blue-400 text-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                        Editar perfil
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Configuración</span>
                      </Button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      {isFollowing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 bg-green-600 text-white border-green-600 cursor-default"
                            disabled
                          >
                            <Users className="h-4 w-4" />
                            Siguiendo
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
                            onClick={toggleFollow}
                            disabled={isLoading}
                          >
                            <UserMinus className="h-4 w-4" />
                            {isLoading ? "..." : "Dejar de seguir"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="gap-1 bg-blue-600 hover:bg-blue-700"
                          onClick={toggleFollow}
                          disabled={isLoading}
                        >
                          <UserPlus className="h-4 w-4" />
                          {isLoading ? "..." : "Seguir usuario"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  <span>
                    <strong>127</strong> libros leídos
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-purple-400" />
                  <span>
                    <strong>{mockReviews.length}</strong> reseñas
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>{followersCount}</strong> seguidores
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <strong>{followingCount}</strong> siguiendo
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 min-h-[60px]">
                <p className="text-muted-foreground">{profileUser.bio || "Sin biografía."}</p>
              </div>
            </div>
          </div>

          {/* Tabs para Reseñas y Listas */}
          <Tabs defaultValue="reseñas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="reseñas">Reseñas</TabsTrigger>
              <TabsTrigger value="listas">Mis Listas</TabsTrigger>
            </TabsList>

            {/* Contenido de Reseñas */}
            <TabsContent value="reseñas" className="space-y-6">
              {mockReviews.length > 0 ? (
                mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="flex flex-row items-start gap-4 p-4">
                      <div className="w-16 h-24 overflow-hidden rounded-md flex-shrink-0">
                        <img
                          src={review.bookCover || "/placeholder.svg"}
                          alt={review.bookTitle}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold hover:underline cursor-pointer">{review.bookTitle}</h3>
                            <p className="text-sm text-muted-foreground">{review.bookAuthor}</p>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-purple-500 text-purple-500" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Publicado el {formatDate(review.createdAt)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 py-2">
                      <p className="text-sm">{review.text}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {isOwnProfile
                        ? "No has escrito ninguna reseña todavía."
                        : "Este usuario no ha escrito ninguna reseña todavía."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Contenido de Listas */}
            <TabsContent value="listas" className="space-y-4">
              <BookListDetailed
                books={lists.favoritos}
                listType="favoritos"
                onRemoveBook={(bookId) => handleRemoveBook("favoritos", bookId)}
              />
              <BookListDetailed
                books={lists.pendiente}
                listType="pendiente"
                onRemoveBook={(bookId) => handleRemoveBook("pendiente", bookId)}
              />
              <BookListDetailed
                books={lists.leyendo}
                listType="leyendo"
                onRemoveBook={(bookId) => handleRemoveBook("leyendo", bookId)}
              />
              <BookListDetailed
                books={lists.terminado}
                listType="terminado"
                onRemoveBook={(bookId) => handleRemoveBook("terminado", bookId)}
              />
              <BookListDetailed
                books={lists.megusta}
                listType="megusta"
                onRemoveBook={(bookId) => handleRemoveBook("megusta", bookId)}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  )
}

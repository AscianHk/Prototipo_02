"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/resources/js/components/ui/select"
import { Card, CardContent } from "@/resources/js/components/ui/card"
import { BookOpen, Star, ArrowLeft, Eye, Plus } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

// Tipo para la información del libro
interface BookDetail {
  id: string
  title: string
  author: string
  publisher: string
  published_date: string
  language: string
  page_count: number
  categories: string[]
  google_id: string
  description: string
  imagen_url: string
  average_rating: number
}

export default function LibroPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [libro, setLibro] = useState<BookDetail | null>(null)
  const [selectedList, setSelectedList] = useState("favorito")
  const [addingToList, setAddingToList] = useState(false)

  const bookId = params.id as string

  useEffect(() => {
    // Simulamos la carga del libro desde la API
    setLoading(true)

    // Datos simulados expandidos - en producción esto vendría de la API de Google Books
    const mockLibros: { [key: string]: BookDetail } = {
      // IDs de ejemplo que puedes usar directamente
      dune: {
        id: "dune",
        title: "Dune",
        author: "Frank Herbert",
        publisher: "Chilton Books",
        published_date: "1965",
        language: "Español",
        page_count: 688,
        categories: ["Ciencia ficción", "Aventura", "Épica espacial"],
        google_id: "B1hSG45JrjAC",
        description:
          "Dune es una novela de ciencia ficción de 1965 del autor estadounidense Frank Herbert, originalmente publicada como dos novelas serializadas separadas en Analog magazine. Está ambientada en el futuro lejano en medio de un imperio galáctico feudal donde las casas nobles, en alianza con las corporaciones comerciales, controlan planetas feudales. La historia sigue las aventuras de Paul Atreides, cuya familia acepta el control del planeta desértico Arrakis, la única fuente de la 'especia' melange, la sustancia más importante del universo. Cuando la familia es traicionada, la historia explora temas de política, religión, ecología, tecnología y emociones humanas, mientras Paul lidera una rebelión para restaurar a su familia al poder.",
        imagen_url: "https://covers.openlibrary.org/b/id/8552671-L.jpg",
        average_rating: 4.7,
      },
      "1984": {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        publisher: "Secker & Warburg",
        published_date: "1949",
        language: "Español",
        page_count: 328,
        categories: ["Distopía", "Ciencia ficción", "Política"],
        google_id: "kotPYEqb7kMC",
        description:
          "1984 es una novela política de ficción distópica, escrita por George Orwell entre 1947 y 1948 y publicada el 8 de junio de 1949. La novela popularizó los conceptos del omnipresente y vigilante Gran Hermano o Hermano Mayor, de la notoria habitación 101, de la ubicua policía del Pensamiento y de la neolengua, adaptación del inglés en la que se reduce y se transforma el léxico con fines represivos, basándose en el principio de que lo que no forma parte de la lengua, no puede ser pensado.",
        imagen_url: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        average_rating: 4.6,
      },
      "cien-anos": {
        id: "cien-anos",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        publisher: "Editorial Sudamericana",
        published_date: "1967",
        language: "Español",
        page_count: 471,
        categories: ["Realismo mágico", "Literatura latinoamericana", "Novela familiar"],
        google_id: "cien-anos-123",
        description:
          "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español. La novela narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
        imagen_url: "/images/books/cien-anos.jpg",
        average_rating: 4.9,
      },
      hobbit: {
        id: "hobbit",
        title: "El Hobbit",
        author: "J.R.R. Tolkien",
        publisher: "George Allen & Unwin",
        published_date: "1937",
        language: "Español",
        page_count: 310,
        categories: ["Fantasía", "Aventura", "Literatura infantil"],
        google_id: "hobbit-456",
        description:
          "El hobbit es una novela fantástica del filólogo y escritor británico J. R. R. Tolkien. Fue escrita para niños, pero ha sido leída y disfrutada por adultos también. Narra las aventuras de Bilbo Bolsón, un hobbit que se ve envuelto en una búsqueda épica para recuperar el reino enano de Erebor del temible dragón Smaug.",
        imagen_url: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        average_rating: 4.8,
      },
      // IDs que vienen de la búsqueda
      abc123: {
        id: "abc123",
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        publisher: "Editorial Sudamericana",
        published_date: "1967",
        language: "Español",
        page_count: 471,
        categories: ["Realismo mágico", "Literatura latinoamericana"],
        google_id: "abc123",
        description:
          "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que explora temas de soledad, amor y la repetición cíclica de la historia.",
        imagen_url: "/images/books/cien-anos.jpg",
        average_rating: 4.9,
      },
      def456: {
        id: "def456",
        title: "El amor en los tiempos del cólera",
        author: "Gabriel García Márquez",
        publisher: "Editorial Sudamericana",
        published_date: "1985",
        language: "Español",
        page_count: 432,
        categories: ["Realismo mágico", "Romance", "Literatura latinoamericana"],
        google_id: "def456",
        description:
          "La historia de un amor que espera más de medio siglo para realizarse. Florentino Ariza y Fermina Daza se enamoran en su juventud, pero ella se casa con otro hombre. Florentino espera pacientemente durante 51 años, 9 meses y 4 días.",
        imagen_url: "https://covers.openlibrary.org/b/id/8414098-L.jpg",
        average_rating: 4.5,
      },
    }

    // Simulamos un delay de carga
    setTimeout(() => {
      const foundBook = mockLibros[bookId]
      if (foundBook) {
        setLibro(foundBook)
      }
      setLoading(false)
    }, 500)
  }, [bookId])

  const handleAddToList = async () => {
    if (!isAuthenticated || !libro) return

    setAddingToList(true)

    // Simulamos la llamada a la API para añadir a lista
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`Añadiendo "${libro.title}" a la lista: ${selectedList}`)
      alert(`"${libro.title}" añadido a ${selectedList} exitosamente!`)
    } catch (error) {
      console.error("Error al añadir a la lista:", error)
    } finally {
      setAddingToList(false)
    }
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStar

    return (
      <div className="flex items-center gap-1">
        {/* Estrellas completas */}
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={`full-${i}`} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
        ))}
        {/* Media estrella */}
        {halfStar === 1 && (
          <div className="relative">
            <Star className="h-6 w-6 text-gray-300 fill-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        {/* Estrellas vacías */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} className="h-6 w-6 text-gray-300 fill-gray-300" />
        ))}
      </div>
    )
  }

  const getListDisplayName = (listType: string) => {
    const names: { [key: string]: string } = {
      favorito: "Favoritos",
      pendiente: "Pendiente",
      leyendo: "Leyendo",
      terminado: "Terminado",
      me_gusta: "Me gusta",
    }
    return names[listType] || listType
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
                <p className="text-white/80 mb-6">El libro que buscas no existe o ha sido eliminado.</p>

                {/* Libros de ejemplo disponibles */}
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">Libros de ejemplo disponibles:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <Link href="/libro/dune" className="text-blue-300 hover:text-blue-200 hover:underline">
                      • Dune - Frank Herbert
                    </Link>
                    <Link href="/libro/1984" className="text-blue-300 hover:text-blue-200 hover:underline">
                      • 1984 - George Orwell
                    </Link>
                    <Link href="/libro/cien-anos" className="text-blue-300 hover:text-blue-200 hover:underline">
                      • Cien años de soledad
                    </Link>
                    <Link href="/libro/hobbit" className="text-blue-300 hover:text-blue-200 hover:underline">
                      • El Hobbit - Tolkien
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Ir al inicio
                    </Button>
                  </Link>
                  <Link href="/libro/dune">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Ver Dune (ejemplo)
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

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <MainNav />
        <main className="container py-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Título */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-6 text-center">
                {libro.title}
              </h1>

              {/* Contenido principal */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Imagen y puntuación */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {libro.imagen_url ? (
                    <div className="w-48 h-72 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={libro.imagen_url || "/placeholder.svg"}
                        alt="Portada"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-72 bg-gray-800/50 flex items-center justify-center rounded-lg text-gray-400">
                      <BookOpen className="h-16 w-16" />
                    </div>
                  )}

                  {/* Sistema de estrellas */}
                  <div className="mt-4 flex flex-col items-center">
                    {renderStars(libro.average_rating)}
                    <div className="text-sm text-white/80 mt-2">
                      Puntuación media: {libro.average_rating ? libro.average_rating.toFixed(1) : "Sin puntuación"}
                    </div>
                  </div>
                </div>

                {/* Información del libro */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-blue-300">Autor(es):</span>
                      <p className="text-white/90">{libro.author}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-300">Editorial:</span>
                      <p className="text-white/90">{libro.publisher}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-300">Año de publicación:</span>
                      <p className="text-white/90">{libro.published_date}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-300">Idioma:</span>
                      <p className="text-white/90">{libro.language}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-300">Páginas:</span>
                      <p className="text-white/90">{libro.page_count}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-300">ID Google Books:</span>
                      <p className="text-white/90 text-sm">{libro.google_id}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-blue-300">Género:</span>
                    <p className="text-white/90">{libro.categories.join(", ")}</p>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-blue-300 mb-4">Descripción</h2>
                <p className="text-white/90 leading-relaxed">{libro.description}</p>
              </div>

              {/* Acciones */}
              <div className="mt-8 space-y-4">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Volver al inicio
                    </Button>
                  </Link>

                  {isAuthenticated && (
                    <Link href={`/libro/${libro.id}/resenas`}>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver reseñas
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Selector para añadir a lista */}
                {isAuthenticated && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <h3 className="font-semibold text-blue-300 mb-4 text-center">Añadir a mi lista</h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <div className="flex items-center gap-2">
                        <label htmlFor="tipo_lista" className="font-medium text-white/90">
                          Añadir a:
                        </label>
                        <Select value={selectedList} onValueChange={setSelectedList}>
                          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="favorito">Favoritos</SelectItem>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="leyendo">Leyendo</SelectItem>
                            <SelectItem value="terminado">Terminado</SelectItem>
                            <SelectItem value="me_gusta">Me gusta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleAddToList}
                        disabled={addingToList}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      >
                        {addingToList ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Añadiendo...
                          </div>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Añadir a {getListDisplayName(selectedList)}
                          </>
                        )}
                      </Button>
                    </div>
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

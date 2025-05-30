"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/resources/js/components/ui/avatar"
import { BookOpen, Search, User } from "lucide-react"

// Tipos para los resultados
interface BookInfo {
  title?: string
  authors?: string[]
  publishedDate?: string
  description?: string
  imageLinks?: {
    thumbnail?: string
  }
}

interface BookItem {
  id: string
  volumeInfo: BookInfo
}

interface UserItem {
  id: number
  nombre_usuario: string
  foto_perfil?: string
}

export default function ResultadosPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q") || ""
  const tipo = searchParams.get("tipo") || "titulo"
  const pageParam = searchParams.get("page") || "1"
  const page = Number.parseInt(pageParam)

  const [loading, setLoading] = useState(true)
  const [libros, setLibros] = useState<BookItem[]>([])
  const [usuarios, setUsuarios] = useState<UserItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(page)

  const perPage = 5
  const maxPages = 10

  useEffect(() => {
    if (!q) {
      setLoading(false)
      return
    }

    setLoading(true)

    // Simulamos la búsqueda basada en el tipo
    if (tipo === "usuario") {
      // Simulamos búsqueda de usuarios
      const mockUsuarios: UserItem[] = [
        { id: 1, nombre_usuario: "maria_garcia", foto_perfil: "https://i.pravatar.cc/150?img=1" },
        { id: 2, nombre_usuario: "juan_perez", foto_perfil: "https://i.pravatar.cc/150?img=2" },
        { id: 3, nombre_usuario: "ana_rodriguez", foto_perfil: "https://i.pravatar.cc/150?img=3" },
      ].filter((user) => user.nombre_usuario.includes(q.toLowerCase()))

      setUsuarios(mockUsuarios)
      setLibros([])
      setTotalItems(0)
    } else {
      // Simulamos búsqueda de libros
      const mockLibros: BookItem[] = [
        {
          id: "abc123",
          volumeInfo: {
            title: "Cien años de soledad",
            authors: ["Gabriel García Márquez"],
            publishedDate: "1967",
            description:
              "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que explora temas de soledad, amor y la repetición cíclica de la historia.",
            imageLinks: {
              thumbnail: "/images/books/cien-anos.jpg",
            },
          },
        },
        {
          id: "def456",
          volumeInfo: {
            title: "El amor en los tiempos del cólera",
            authors: ["Gabriel García Márquez"],
            publishedDate: "1985",
            description:
              "La historia de un amor que espera más de medio siglo para realizarse. Florentino Ariza y Fermina Daza se enamoran en su juventud, pero ella se casa con otro hombre. Florentino espera pacientemente durante 51 años, 9 meses y 4 días.",
            imageLinks: {
              thumbnail: "https://covers.openlibrary.org/b/id/8414098-M.jpg",
            },
          },
        },
        {
          id: "ghi789",
          volumeInfo: {
            title: "Crónica de una muerte anunciada",
            authors: ["Gabriel García Márquez"],
            publishedDate: "1981",
            description:
              "Una novela que narra el asesinato de Santiago Nasar por los hermanos Vicario. Todo el pueblo sabe que van a matarlo, pero nadie hace nada para evitarlo. La historia explora la responsabilidad colectiva y el honor.",
            imageLinks: {
              thumbnail: "https://covers.openlibrary.org/b/id/6741344-M.jpg",
            },
          },
        },
        {
          id: "jkl012",
          volumeInfo: {
            title: "El coronel no tiene quien le escriba",
            authors: ["Gabriel García Márquez"],
            publishedDate: "1961",
            description:
              "La historia de un viejo coronel retirado que espera la pensión prometida por sus servicios durante la guerra civil. Una novela sobre la dignidad frente a la pobreza y la espera interminable.",
            imageLinks: {},
          },
        },
        {
          id: "mno345",
          volumeInfo: {
            title: "Del amor y otros demonios",
            authors: ["Gabriel García Márquez"],
            publishedDate: "1994",
            description:
              "La historia de Sierva María, una niña de 12 años, hija de nobles, que es mordida por un perro rabioso. Cuando empieza a mostrar síntomas extraños, la Iglesia decide que está poseída y la interna en un convento.",
            imageLinks: {
              thumbnail: "https://covers.openlibrary.org/b/id/7081826-M.jpg",
            },
          },
        },
      ]

      // Filtramos según el tipo de búsqueda
      let filteredLibros = mockLibros
      if (tipo === "autor") {
        filteredLibros = mockLibros.filter((libro) =>
          libro.volumeInfo.authors?.some((author) => author.toLowerCase().includes(q.toLowerCase())),
        )
      } else if (tipo === "genero") {
        // Simulamos filtro por género (no tenemos esta info en los mocks)
        filteredLibros = mockLibros.filter(() => Math.random() > 0.5)
      } else {
        // Por defecto, búsqueda por título
        filteredLibros = mockLibros.filter((libro) => libro.volumeInfo.title?.toLowerCase().includes(q.toLowerCase()))
      }

      // Simulamos paginación
      const startIndex = (currentPage - 1) * perPage
      const paginatedLibros = filteredLibros.slice(startIndex, startIndex + perPage)

      setLibros(paginatedLibros)
      setUsuarios([])
      setTotalItems(Math.min(filteredLibros.length, perPage * maxPages))
    }

    setLoading(false)
  }, [q, tipo, currentPage])

  const totalPages = Math.ceil(totalItems / perPage)

  // Función para navegar a una página específica
  const navigateToPage = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("page", pageNumber.toString())
    router.push(`/resultados?${newParams.toString()}`)
    setCurrentPage(pageNumber)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <MainNav />
        <main className="container py-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Resultado de la búsqueda
              </h1>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Resultados de libros */}
                {libros.length > 0 ? (
                  <div className="space-y-6">
                    {libros.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-lg shadow p-4 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {item.volumeInfo.imageLinks?.thumbnail ? (
                          <Link href={`/libro/${item.id}`} className="flex-shrink-0">
                            <div className="w-24 h-32 overflow-hidden rounded shadow-md transition-transform hover:scale-105">
                              <img
                                src={item.volumeInfo.imageLinks.thumbnail || "/placeholder.svg"}
                                alt="Portada"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                        ) : (
                          <div className="w-24 h-32 bg-gray-800/50 flex items-center justify-center rounded text-gray-400 flex-shrink-0">
                            <BookOpen className="h-8 w-8" />
                          </div>
                        )}
                        <div>
                          <Link href={`/libro/${item.id}`}>
                            <h2 className="text-xl font-semibold text-blue-300 hover:text-blue-200 hover:underline transition-colors">
                              {item.volumeInfo.title || "Sin título"}
                            </h2>
                          </Link>
                          <p className="text-white/80">
                            <span className="font-semibold">Autor(es):</span>{" "}
                            {item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Desconocido"}
                          </p>
                          {item.volumeInfo.publishedDate && (
                            <p className="text-white/60">
                              <span className="font-semibold">Año:</span> {item.volumeInfo.publishedDate}
                            </p>
                          )}
                          {item.volumeInfo.description && (
                            <p className="mt-2 text-white/80 text-sm line-clamp-3">
                              {item.volumeInfo.description.length > 200
                                ? `${item.volumeInfo.description.substring(0, 200)}...`
                                : item.volumeInfo.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Paginación simplificada */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-6 gap-2">
                        {currentPage > 1 && (
                          <Button
                            variant="outline"
                            className="border-blue-400 text-blue-300 hover:bg-blue-900/30"
                            onClick={() => navigateToPage(currentPage - 1)}
                          >
                            Anterior
                          </Button>
                        )}

                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Mostrar páginas alrededor de la actual
                            let pageNum
                            if (totalPages <= 5) {
                              pageNum = i + 1
                            } else if (currentPage <= 3) {
                              pageNum = i + 1
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i
                            } else {
                              pageNum = currentPage - 2 + i
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={pageNum === currentPage ? "outline" : "ghost"}
                                className={
                                  pageNum === currentPage
                                    ? "bg-blue-900/50 border-blue-400 text-blue-300 hover:bg-blue-900/70 hover:text-blue-200"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                }
                                onClick={() => navigateToPage(pageNum)}
                              >
                                {pageNum}
                              </Button>
                            )
                          })}
                        </div>

                        {currentPage < totalPages && (
                          <Button
                            variant="outline"
                            className="border-blue-400 text-blue-300 hover:bg-blue-900/30"
                            onClick={() => navigateToPage(currentPage + 1)}
                          >
                            Siguiente
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  usuarios.length === 0 && (
                    <div className="text-center text-red-400 font-semibold py-8">No se encontraron resultados.</div>
                  )
                )}

                {/* Resultados de usuarios */}
                {usuarios.length > 0 && (
                  <div className="mb-8 mt-8">
                    <h2 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Usuarios encontrados
                    </h2>
                    <ul className="space-y-3">
                      {usuarios.map((usuario) => (
                        <li
                          key={usuario.id}
                          className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <Avatar className="h-10 w-10 border border-white/20">
                            <AvatarImage
                              src={
                                usuario.foto_perfil ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre_usuario) || "/placeholder.svg"}`
                              }
                              alt={usuario.nombre_usuario}
                            />
                            <AvatarFallback className="bg-purple-700 text-white">
                              {usuario.nombre_usuario.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <Link
                            href={`/perfil/${usuario.id}`}
                            className="text-blue-300 hover:text-blue-200 hover:underline font-semibold"
                          >
                            {usuario.nombre_usuario}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <Link href="/">
                    <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                      <Search className="h-4 w-4 mr-2" />
                      Volver a buscar
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

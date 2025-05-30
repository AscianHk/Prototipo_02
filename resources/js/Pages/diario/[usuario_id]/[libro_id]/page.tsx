"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Textarea } from "@/resources/js/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/resources/js/components/ui/card"
import { BookOpen, ArrowLeft, Save, Calendar, FileText } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

// Tipos para las entradas del diario
interface DiaryEntry {
  id: number
  capitulo: number
  texto: string
  created_at: string
}

interface BookInfo {
  id: string
  title: string
  author: string
}

export default function DiarioPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [libro, setLibro] = useState<BookInfo | null>(null)
  const [entradas, setEntradas] = useState<DiaryEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    capitulo: 1,
    texto: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const usuario_id = Number.parseInt(params.usuario_id as string)
  const libro_id = params.libro_id as string

  // Verificar si el usuario puede acceder a este diario
  const canAccess = isAuthenticated && user && user.id === usuario_id

  useEffect(() => {
    setLoading(true)

    // Datos simulados de libros
    const mockLibros: { [key: string]: BookInfo } = {
      dune: { id: "dune", title: "Dune", author: "Frank Herbert" },
      "1984": { id: "1984", title: "1984", author: "George Orwell" },
      "cien-anos": { id: "cien-anos", title: "Cien años de soledad", author: "Gabriel García Márquez" },
      hobbit: { id: "hobbit", title: "El Hobbit", author: "J.R.R. Tolkien" },
      abc123: { id: "abc123", title: "Cien años de soledad", author: "Gabriel García Márquez" },
      def456: { id: "def456", title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez" },
    }

    // Entradas simuladas del diario (por usuario y libro)
    const mockEntradas: { [key: string]: DiaryEntry[] } = {
      "1_dune": [
        {
          id: 1,
          capitulo: 1,
          texto:
            "Comenzé a leer Dune hoy. La introducción al mundo de Arrakis es fascinante. Paul Atreides parece ser un protagonista muy interesante y ya puedo ver que tiene habilidades especiales. El concepto de la especia melange y su importancia en el universo es intrigante.\n\nLa descripción del planeta desértico me recuerda a Lawrence de Arabia, pero en el espacio. Herbert ha creado un mundo muy detallado.",
          created_at: "2024-12-01T10:30:00Z",
        },
        {
          id: 2,
          capitulo: 5,
          texto:
            "La traición a la Casa Atreides fue brutal. No esperaba que pasara tan rápido en la historia. El Duque Leto ha muerto y Paul y Jessica están huyendo por el desierto. \n\nLa forma en que Herbert describe las habilidades Bene Gesserit de Jessica es increíble. El entrenamiento mental y físico que han recibido los hace casi sobrehumanos.",
          created_at: "2024-12-03T15:45:00Z",
        },
        {
          id: 3,
          capitulo: 12,
          texto:
            "Paul está empezando a mostrar sus verdaderos poderes. Las visiones del futuro son aterradoras y fascinantes a la vez. La idea de que pueda ver múltiples futuros posibles pero no pueda cambiar el destino es muy profunda.\n\nLos Fremen son un pueblo increíble. Su adaptación al desierto y su cultura guerrera los hace formidables. Stilgar parece ser un líder sabio.",
          created_at: "2024-12-05T20:15:00Z",
        },
      ],
      "1_1984": [
        {
          id: 4,
          capitulo: 1,
          texto:
            "Empecé 1984 de Orwell. La descripción del mundo totalitario es escalofriante. Winston Smith trabajando en el Ministerio de la Verdad, reescribiendo la historia, es una metáfora poderosa sobre la manipulación de la información.\n\nLa idea del Gran Hermano observando siempre es perturbadora. Me hace pensar en la vigilancia moderna.",
          created_at: "2024-11-15T09:20:00Z",
        },
      ],
    }

    setTimeout(() => {
      const foundBook = mockLibros[libro_id]
      if (foundBook) {
        setLibro(foundBook)
        const diaryKey = `${usuario_id}_${libro_id}`
        const userEntries = mockEntradas[diaryKey] || []
        setEntradas(userEntries)
        setNewEntry({
          capitulo: userEntries.length + 1,
          texto: "",
        })
      }
      setLoading(false)
    }, 500)
  }, [usuario_id, libro_id])

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canAccess || !newEntry.texto.trim()) return

    setSubmitting(true)

    try {
      // Simulamos la creación de una nueva entrada
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const nuevaEntrada: DiaryEntry = {
        id: Date.now(),
        capitulo: newEntry.capitulo,
        texto: newEntry.texto,
        created_at: new Date().toISOString(),
      }

      setEntradas([...entradas, nuevaEntrada])
      setNewEntry({
        capitulo: newEntry.capitulo + 1,
        texto: "",
      })
      alert("Entrada guardada exitosamente!")
    } catch (error) {
      console.error("Error al guardar entrada:", error)
    } finally {
      setSubmitting(false)
    }
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
                <p className="text-white/80 mb-6">No se puede acceder al diario de un libro que no existe.</p>
                <Link href="/perfil">
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al perfil
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </main>
        </div>
      </ThemeProvider>
    )
  }

  if (!canAccess) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
          <MainNav />
          <main className="container py-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Acceso denegado</h1>
                <p className="text-white/80 mb-6">No tienes permisos para acceder a este diario.</p>
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
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-full">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-3xl bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                  Diario de Aventuras
                </CardTitle>
              </div>
              <div className="text-center">
                <h2 className="text-xl text-blue-300 font-semibold">{libro.title}</h2>
                <p className="text-white/70">por {libro.author}</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Entradas existentes */}
              <div className="space-y-6 mb-8">
                {entradas.length > 0 ? (
                  entradas.map((entrada) => (
                    <div
                      key={entrada.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-green-300 flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Capítulo: {entrada.capitulo}
                        </h2>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Calendar className="h-4 w-4" />
                          Creado el {formatDate(entrada.created_at)}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-white/90 leading-relaxed whitespace-pre-line">{entrada.texto}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Aún no tienes entradas en este diario.</p>
                    <p className="text-white/40 text-sm mt-2">¡Comienza a escribir tu aventura de lectura!</p>
                  </div>
                )}
              </div>

              {/* Formulario para nueva entrada */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Nueva entrada
                </h2>
                <form onSubmit={handleSubmitEntry} className="space-y-4">
                  <div>
                    <label htmlFor="capitulo" className="block text-lg font-bold text-blue-300 mb-2">
                      Capítulo:
                    </label>
                    <Input
                      type="number"
                      min="1"
                      id="capitulo"
                      value={newEntry.capitulo}
                      onChange={(e) => setNewEntry({ ...newEntry, capitulo: Number.parseInt(e.target.value) || 1 })}
                      required
                      className="w-24 bg-white/10 border-white/20 text-white focus:border-green-400 focus:ring-green-400/20"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Escribe aquí tu entrada del diario..."
                      value={newEntry.texto}
                      onChange={(e) => setNewEntry({ ...newEntry, texto: e.target.value })}
                      required
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-green-400 focus:ring-green-400/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting || !newEntry.texto.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Guardando entrada...
                      </div>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar entrada
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Navegación */}
              <div className="mt-8 text-center">
                <Link href="/perfil">
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al perfil
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

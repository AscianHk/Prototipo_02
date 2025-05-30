import { Link } from "@inertiajs/react"
import { Search, User, BookOpen } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"

export default function Resultados({ auth, consulta, tipo, libros, usuarios, paginaActual, totalPaginas }) {
  const renderLibro = (item) => {
    const volumeInfo = item.volumeInfo || {}
    const titulo = volumeInfo.title || "Sin título"
    const autores = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Autor desconocido"
    const descripcion = volumeInfo.description || "Sin descripción disponible"
    const imagen =
      volumeInfo.imageLinks?.thumbnail || `/placeholder.svg?height=200&width=150&text=${encodeURIComponent(titulo)}`

    return (
      <Link
        key={item.id}
        href={`/libro/${item.id}`}
        className="flex gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
      >
        <img src={imagen || "/placeholder.svg"} alt={titulo} className="w-20 h-28 object-cover rounded" />
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1 line-clamp-2">{titulo}</h3>
          <p className="text-blue-300 text-sm mb-2">{autores}</p>
          <p className="text-white/70 text-sm line-clamp-3">{descripcion}</p>
        </div>
      </Link>
    )
  }

  const renderUsuario = (usuario) => (
    <Link
      key={usuario.id}
      href={`/perfil/${usuario.id}`}
      className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
    >
      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
        <User className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{usuario.nombre_usuario}</h3>
        <p className="text-white/70 text-sm">{usuario.email}</p>
      </div>
    </Link>
  )

  const renderPaginacion = () => {
    if (totalPaginas <= 1) return null

    const paginas = []
    const inicio = Math.max(1, paginaActual - 2)
    const fin = Math.min(totalPaginas, paginaActual + 2)

    for (let i = inicio; i <= fin; i++) {
      paginas.push(
        <Link
          key={i}
          href={`/resultados?q=${consulta}&tipo=${tipo}&page=${i}`}
          className={`px-3 py-2 rounded ${
            i === paginaActual ? "bg-blue-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {i}
        </Link>,
      )
    }

    return (
      <div className="flex justify-center gap-2 mt-8">
        {paginaActual > 1 && (
          <Link
            href={`/resultados?q=${consulta}&tipo=${tipo}&page=${paginaActual - 1}`}
            className="px-3 py-2 rounded bg-white/10 text-white hover:bg-white/20"
          >
            Anterior
          </Link>
        )}
        {paginas}
        {paginaActual < totalPaginas && (
          <Link
            href={`/resultados?q=${consulta}&tipo=${tipo}&page=${paginaActual + 1}`}
            className="px-3 py-2 rounded bg-white/10 text-white hover:bg-white/20"
          >
            Siguiente
          </Link>
        )}
      </div>
    )
  }

  return (
    <AppLayout auth={auth} title={`Resultados de búsqueda: ${consulta}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Resultados de búsqueda</h1>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80">
              Búsqueda: <span className="font-semibold text-white">"{consulta}"</span>
            </p>
            <p className="text-white/60 text-sm">
              Tipo:{" "}
              {tipo === "titulo" ? "Título" : tipo === "autor" ? "Autor" : tipo === "genero" ? "Género" : "Usuario"}
            </p>
          </div>
        </div>

        {!consulta ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Realiza una búsqueda</h2>
            <p className="text-white/70">Usa la barra de búsqueda para encontrar libros, autores o usuarios</p>
          </div>
        ) : (
          <>
            {tipo === "usuario" ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Usuarios encontrados ({usuarios.length})</h2>
                {usuarios.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/70">No se encontraron usuarios</p>
                  </div>
                ) : (
                  usuarios.map(renderUsuario)
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Libros encontrados ({libros.length})</h2>
                {libros.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/70">No se encontraron libros</p>
                  </div>
                ) : (
                  libros.map(renderLibro)
                )}
              </div>
            )}

            {renderPaginacion()}
          </>
        )}
      </div>
    </AppLayout>
  )
}

import { Link } from "@inertiajs/react"
import { BookOpen, ChevronRight, Star } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"

export default function Home({ auth, featuredBooks, trendingBooks, recentBooks }) {
  const BookCarousel = ({ books, title }) => (
    <section className="py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
            Ver todos <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/libro/${book.id}`}
              className="min-w-[180px] md:min-w-[200px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg transition-all hover:scale-105 hover:bg-white/20"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                <img
                  src={`/placeholder.svg?height=300&width=200&text=${encodeURIComponent(book.title)}`}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-1 text-white">{book.title}</h3>
                <p className="text-xs text-white/70">{book.author}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                  <span className="text-xs ml-1 text-white/80">{book.rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <AppLayout auth={auth} title="Crítico de Bolsillo - Descubre tu próxima gran lectura">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        <div className="relative h-[500px] w-full overflow-hidden">
          <img
            src="/placeholder.svg?height=500&width=1200&text=Libros+destacados"
            alt="Libros destacados"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start z-20 p-6 md:p-12 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-blue-400">Crítico de Bolsillo</h2>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {auth.user ? `¡Bienvenido de vuelta, ${auth.user.nombre_usuario}!` : "Descubre tu próxima gran lectura"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl">
            {auth.user
              ? "Explora nuevos libros, comparte tus reseñas y conecta con otros lectores."
              : "Conecta con otros lectores, comparte tus opiniones y descubre nuevos libros que amarás."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {auth.user ? (
              <>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold text-white transition-colors"
                >
                  Explorar libros
                </Link>
                <Link
                  href="/perfil"
                  className="inline-flex items-center justify-center rounded-full border border-purple-400 text-purple-400 hover:bg-purple-50/10 px-6 py-3 font-semibold transition-colors"
                >
                  Mis listas
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold text-white transition-colors"
                >
                  Unirse ahora
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full border border-purple-400 text-purple-400 hover:bg-purple-50/10 px-6 py-3 font-semibold transition-colors"
                >
                  Explorar libros
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Book Carousels */}
      <BookCarousel books={trendingBooks} title="Tendencias esta semana" />
      <BookCarousel books={featuredBooks} title="Populares en Ficción" />
      <BookCarousel books={recentBooks} title="Recién añadidos" />

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 px-4 md:px-6 mt-16">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-white">Crítico de Bolsillo</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Empleos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Comunidad</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Foros
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Clubes de lectura
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Reseñas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Guías
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Desarrolladores
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Licencias
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-white/20">
          <p className="text-center text-white/70">© 2025 Crítico de Bolsillo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </AppLayout>
  )
}


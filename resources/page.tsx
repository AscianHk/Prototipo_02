"use client"

import { useState, useEffect } from "react"
import { BookCarousel } from "@/resources/js/components/book-carousel"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { BookOpen, ChevronRight } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, user } = useAuth()

  // Ensure theme is only applied after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <MainNav />
        <main>
          {/* Hero Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
            <div className="relative h-[500px] w-full overflow-hidden">
              <img
                src="/placeholder.svg?height=500&width=1200"
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
                {isAuthenticated ? `¡Bienvenido de vuelta, ${user?.name}!` : "Descubre tu próxima gran lectura"}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl">
                {isAuthenticated
                  ? "Explora nuevos libros, comparte tus reseñas y conecta con otros lectores."
                  : "Conecta con otros lectores, comparte tus opiniones y descubre nuevos libros que amarás."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Button size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700">
                      Explorar libros
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-semibold border-purple-400 text-purple-400 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900 dark:hover:text-purple-300"
                    >
                      Mis listas
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700">
                      Unirse ahora
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-semibold border-purple-400 text-purple-400 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900 dark:hover:text-purple-300"
                    >
                      Explorar libros
                    </Button>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Featured Books */}
          <section className="py-8 px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Tendencias esta semana</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <BookCarousel
              books={[
                { id: 1, title: "El Silmarillion", author: "J.R.R. Tolkien", rating: 4.7 },
                { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez", rating: 4.9 },
                { id: 3, title: "1984", author: "George Orwell", rating: 4.6 },
                { id: 4, title: "Don Quijote de la Mancha", author: "Miguel de Cervantes", rating: 4.8 },
                { id: 5, title: "El Principito", author: "Antoine de Saint-Exupéry", rating: 4.5 },
                { id: 6, title: "Rayuela", author: "Julio Cortázar", rating: 4.4 },
                { id: 7, title: "Pedro Páramo", author: "Juan Rulfo", rating: 4.7 },
                { id: 8, title: "La sombra del viento", author: "Carlos Ruiz Zafón", rating: 4.8 },
              ]}
            />
          </section>

          {/* Popular in Fiction */}
          <section className="py-8 px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Populares en Ficción</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <BookCarousel
              books={[
                { id: 9, title: "Dune", author: "Frank Herbert", rating: 4.7 },
                { id: 10, title: "El nombre del viento", author: "Patrick Rothfuss", rating: 4.9 },
                { id: 11, title: "Juego de Tronos", author: "George R.R. Martin", rating: 4.8 },
                { id: 12, title: "El Hobbit", author: "J.R.R. Tolkien", rating: 4.6 },
                { id: 13, title: "Neuromante", author: "William Gibson", rating: 4.5 },
                { id: 14, title: "Fahrenheit 451", author: "Ray Bradbury", rating: 4.7 },
                { id: 15, title: "La carretera", author: "Cormac McCarthy", rating: 4.6 },
                { id: 16, title: "Fundación", author: "Isaac Asimov", rating: 4.8 },
              ]}
            />
          </section>

          {/* Recently Added */}
          <section className="py-8 px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recién añadidos</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <BookCarousel
              books={[
                { id: 17, title: "La paciente silenciosa", author: "Alex Michaelides", rating: 4.5 },
                { id: 18, title: "El visitante", author: "Stephen King", rating: 4.3 },
                { id: 19, title: "Reina Roja", author: "Juan Gómez-Jurado", rating: 4.7 },
                { id: 20, title: "Los siete maridos de Evelyn Hugo", author: "Taylor Jenkins Reid", rating: 4.8 },
                { id: 21, title: "El problema de los tres cuerpos", author: "Liu Cixin", rating: 4.6 },
                { id: 22, title: "Patria", author: "Fernando Aramburu", rating: 4.7 },
                { id: 23, title: "Sapiens", author: "Yuval Noah Harari", rating: 4.8 },
                { id: 24, title: "Invisible", author: "Eloy Moreno", rating: 4.5 },
              ]}
            />
          </section>

          {/* Non-Fiction */}
          <section className="py-8 px-4 md:px-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">No Ficción</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <BookCarousel
              books={[
                { id: 25, title: "21 lecciones para el siglo XXI", author: "Yuval Noah Harari", rating: 4.6 },
                { id: 26, title: "Pensar rápido, pensar despacio", author: "Daniel Kahneman", rating: 4.7 },
                { id: 27, title: "El poder de los hábitos", author: "Charles Duhigg", rating: 4.5 },
                {
                  id: 28,
                  title: "Cómo ganar amigos e influir sobre las personas",
                  author: "Dale Carnegie",
                  rating: 4.4,
                },
                { id: 29, title: "Homo Deus", author: "Yuval Noah Harari", rating: 4.7 },
                { id: 30, title: "Factfulness", author: "Hans Rosling", rating: 4.6 },
                { id: 31, title: "Biografía de Steve Jobs", author: "Walter Isaacson", rating: 4.8 },
                { id: 32, title: "Armas, gérmenes y acero", author: "Jared Diamond", rating: 4.7 },
              ]}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-12 px-4 md:px-6">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Crítico de Bolsillo</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Empleos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Comunidad</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Foros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Clubes de lectura
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Reseñas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Guías
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Desarrolladores
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Licencias
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto mt-8 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              © 2025 Crítico de Bolsillo. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

"use client"

import { useState } from "react"
import { Head, Link, router } from "@inertiajs/react"
import { BookOpen, Search, Bell, User, LogOut, Menu, Shield, Home, Users } from "lucide-react"

export default function AppLayout({ children, title = "Crítico de Bolsillo", auth }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("titulo")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.get("/resultados", {
        q: searchQuery,
        tipo: searchType,
      })
    }
  }

  const handleLogout = () => {
    router.post("/logout")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <Head title={title} />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/10">
        <div className="container mx-auto flex h-16 items-center px-4">
          {/* Mobile menu button */}
          <button className="md:hidden mr-4" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="h-5 w-5 text-white" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mr-6">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span className="text-lg font-semibold hidden sm:block text-white">Crítico de Bolsillo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 mr-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-blue-300 transition-colors">
              Inicio
            </Link>
            <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Explorar
            </Link>
            {auth.user && (
              <>
                <Link href="/perfil" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Mi perfil
                </Link>
                <Link href="#" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Comunidad
                </Link>
                {auth.user.is_admin && (
                  <Link href="/admin" className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                    Panel Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Search */}
          <div className="flex items-center gap-4 ml-auto">
            <form onSubmit={handleSearch} className="relative flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60" />
                <input
                  type="search"
                  placeholder="Buscar libros, autores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-white/10 border border-white/20 pl-8 pr-4 py-2 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 md:w-[200px] lg:w-[280px]"
                />
              </div>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="rounded-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
              >
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="genero">Género</option>
                <option value="usuario">Usuario</option>
              </select>
              <button
                type="submit"
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Buscar
              </button>
            </form>

            {/* User menu */}
            {auth.user ? (
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Bell className="h-5 w-5 text-white" />
                </button>
                <Link href="/perfil" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                  <User className="h-5 w-5 text-white" />
                </Link>
                {auth.user.is_admin && (
                  <Link href="/admin" className="p-2 rounded-full hover:bg-red-900/30 transition-colors">
                    <Shield className="h-5 w-5 text-red-400" />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-white/20 bg-black/20 backdrop-blur">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="flex items-center gap-2 py-2 text-white hover:text-blue-300">
                <Home className="h-4 w-4" />
                Inicio
              </Link>
              <Link href="#" className="flex items-center gap-2 py-2 text-white/70 hover:text-white">
                <Search className="h-4 w-4" />
                Explorar
              </Link>
              {auth.user && (
                <>
                  <Link href="/perfil" className="flex items-center gap-2 py-2 text-white/70 hover:text-white">
                    <User className="h-4 w-4" />
                    Mi perfil
                  </Link>
                  <Link href="#" className="flex items-center gap-2 py-2 text-white/70 hover:text-white">
                    <Users className="h-4 w-4" />
                    Comunidad
                  </Link>
                  {auth.user.is_admin && (
                    <Link href="/admin" className="flex items-center gap-2 py-2 text-red-400 hover:text-red-300">
                      <Shield className="h-4 w-4" />
                      Panel Admin
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="text-white">{children}</main>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Bell, BookOpen, Home, Lamp, LogOut, Menu, Search, User, Shield } from "lucide-react"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/resources/js/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/resources/js/components/ui/select"
import { cn } from "@/lib/utils"
import { useMobile } from "@/resources/js/Pages/hooks/use-mobile"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

export function MainNav() {
  const { theme, setTheme } = useTheme()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("titulo")

  // Ensure theme is only applied after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // En producción, esto redirigiría a /buscar-libro?q=${searchQuery}&tipo=${searchType}
      console.log(`Buscando: ${searchQuery} por ${searchType}`)
      // Simular búsqueda
      alert(`Buscando "${searchQuery}" por ${searchType}`)
    }
  }

  const handleLogout = () => {
    logout()
    // En producción, esto haría una petición POST a /logout con CSRF token
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-6 mt-6">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="h-5 w-5" />
                <span>Crítico de Bolsillo</span>
              </Link>
              <div className="grid gap-4">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Home className="h-4 w-4" />
                  <span>Inicio</span>
                </Link>
                <Link href="/explorar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Search className="h-4 w-4" />
                  <span>Explorar</span>
                </Link>
                {isAuthenticated && (
                  <>
                    <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                      <Bell className="h-4 w-4" />
                      <span>Notificaciones</span>
                    </Link>
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <User className="h-4 w-4" />
                      <span>Mi perfil</span>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="flex items-center gap-2 text-red-400 hover:text-red-300">
                        <Shield className="h-4 w-4" />
                        <span>Panel Admin</span>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className={cn("h-5 w-5", isMobile ? "text-blue-400" : "text-primary")} />
            {!isMobile && <span className="text-lg font-semibold">Crítico de Bolsillo</span>}
          </Link>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6 mr-6">
            <Link href="/" className="text-sm font-medium text-foreground">
              Inicio
            </Link>
            <Link href="/explorar" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Explorar
            </Link>
            {isAuthenticated && (
              <>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Mis libros
                </Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Comunidad
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="text-sm font-medium text-red-400 hover:text-red-300">
                    Panel Admin
                  </Link>
                )}
              </>
            )}
          </nav>
        )}

        <div className="flex items-center gap-4 ml-auto">
          <form onSubmit={handleSearch} className="relative flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar libros, autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-muted pl-8 md:w-[200px] lg:w-[280px]"
              />
            </div>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[100px] rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="titulo">Título</SelectItem>
                <SelectItem value="autor">Autor</SelectItem>
                <SelectItem value="genero">Género</SelectItem>
                <SelectItem value="usuario">Usuario</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" size="sm" className="rounded-full">
              Buscar
            </Button>
          </form>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Lamp className="h-4 w-4" />
            <span className="sr-only">Cambiar tema</span>
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {!isMobile && (
                <>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notificaciones</span>
                  </Button>
                  <Link href="/perfil">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Mi perfil</span>
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300">
                        <Shield className="h-5 w-5" />
                        <span className="sr-only">Panel Admin</span>
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar sesión">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/resources/js/components/ui/card"
import { Label } from "@/resources/js/components/ui/label"
import { BookOpen, Eye, EyeOff, Sparkles, Users, Star } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"
import { ThemeProvider } from "@/resources/js/components/theme-provider"

export default function RegisterPage() {
  const [nombre_usuario, setNombreUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    nombre_usuario?: string
    email?: string
    password?: string
  }>({})
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setErrors({})

    // Validate form
    const newErrors: {
      nombre_usuario?: string
      email?: string
      password?: string
    } = {}

    if (!nombre_usuario) {
      newErrors.nombre_usuario = "El nombre es obligatorio"
    }

    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (password !== password_confirmation) {
      newErrors.password = "Las contraseñas no coinciden"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      // En producción, esto sería una llamada a la API con los nombres de campos correctos
      await register(nombre_usuario, email, password)
      router.push("/")
    } catch (error: any) {
      // Manejar errores de la API
      if (error.errors) {
        setErrors(error.errors)
      } else {
        console.error("Error al registrarse:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating elements decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-16 text-purple-300/20 transform rotate-12">
            <Users className="h-8 w-8" />
          </div>
          <div className="absolute top-32 right-24 text-blue-300/20 transform -rotate-12">
            <Star className="h-6 w-6" />
          </div>
          <div className="absolute bottom-40 left-24 text-purple-400/20 transform rotate-45">
            <BookOpen className="h-10 w-10" />
          </div>
          <div className="absolute bottom-24 right-16 text-blue-400/20 transform -rotate-45">
            <Sparkles className="h-8 w-8" />
          </div>
          <div className="absolute top-1/2 right-8 text-purple-300/15 transform rotate-12">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  Crítico de Bolsillo
                </h1>
                <p className="text-xs text-purple-200/80">Tu red social de libros</p>
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Registro</CardTitle>
            <CardDescription className="text-purple-200/80">
              Únete a nuestra comunidad de lectores apasionados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nombre_usuario" className="text-white">
                  Nombre
                </Label>
                <Input
                  id="nombre_usuario"
                  name="nombre_usuario"
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre_usuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  required
                  autoFocus
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 ${
                    errors.nombre_usuario ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                />
                {errors.nombre_usuario && <p className="text-red-400 text-sm mt-1">{errors.nombre_usuario}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 pr-10 ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-confirm" className="text-white">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password-confirm"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Registrando...
                  </div>
                ) : (
                  "Registrarse"
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-purple-300 hover:text-purple-200 hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}

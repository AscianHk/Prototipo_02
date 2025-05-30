"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/resources/js/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/resources/js/components/ui/card"
import { Label } from "@/resources/js/components/ui/label"
import { ArrowLeft, Save, UserCog } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

// Tipos para el usuario a editar
interface EditUser {
  id: number
  nombre_usuario: string
  email: string
  rol: "usuario" | "admin"
}

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState<EditUser | null>(null)
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    email: "",
    password: "",
    rol: "usuario" as "usuario" | "admin",
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    nombre_usuario?: string
    email?: string
    password?: string
  }>({})

  const userId = Number.parseInt(params.id as string)

  useEffect(() => {
    // Verificar si el usuario es admin
    if (!isAuthenticated || !isAdmin) {
      router.push("/")
      return
    }

    // Cargar datos del usuario a editar
    setLoading(true)
    const mockUsuarios: { [key: number]: EditUser } = {
      1: {
        id: 1,
        nombre_usuario: "maria_garcia",
        email: "maria@example.com",
        rol: "admin",
      },
      2: {
        id: 2,
        nombre_usuario: "juan_lector",
        email: "juan@example.com",
        rol: "usuario",
      },
      3: {
        id: 3,
        nombre_usuario: "ana_sci_fi",
        email: "ana@example.com",
        rol: "usuario",
      },
      4: {
        id: 4,
        nombre_usuario: "carlos_historia",
        email: "carlos@example.com",
        rol: "usuario",
      },
      5: {
        id: 5,
        nombre_usuario: "lucia_romance",
        email: "lucia@example.com",
        rol: "usuario",
      },
    }

    setTimeout(() => {
      const foundUser = mockUsuarios[userId]
      if (foundUser) {
        setUsuario(foundUser)
        setFormData({
          nombre_usuario: foundUser.nombre_usuario,
          email: foundUser.email,
          password: "",
          rol: foundUser.rol,
        })
      }
      setLoading(false)
    }, 500)
  }, [userId, isAuthenticated, isAdmin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!usuario) return

    // Reset errors
    setErrors({})

    // Validate form
    const newErrors: {
      nombre_usuario?: string
      email?: string
      password?: string
    } = {}

    if (!formData.nombre_usuario.trim()) {
      newErrors.nombre_usuario = "El nombre de usuario es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)

    try {
      // Simular actualización del usuario
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Actualizando usuario:", {
        id: usuario.id,
        ...formData,
      })

      alert("Usuario actualizado exitosamente!")
      router.push("/admin")
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
    } finally {
      setSubmitting(false)
    }
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

  if (!isAuthenticated || !isAdmin) {
    return null // El useEffect ya redirige
  }

  if (!usuario) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
          <MainNav />
          <main className="container py-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <UserCog className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Usuario no encontrado</h1>
                <p className="text-white/80 mb-6">El usuario que intentas editar no existe.</p>
                <Link href="/admin">
                  <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-900/30">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al panel
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
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full">
                  <UserCog className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Editar Usuario
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nombre_usuario" className="text-white">
                    Nombre de usuario
                  </Label>
                  <Input
                    id="nombre_usuario"
                    type="text"
                    value={formData.nombre_usuario}
                    onChange={(e) => setFormData({ ...formData, nombre_usuario: e.target.value })}
                    required
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-yellow-400/20 ${
                      errors.nombre_usuario ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {errors.nombre_usuario && <p className="text-red-400 text-sm mt-1">{errors.nombre_usuario}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-yellow-400/20 ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">
                    Nueva contraseña (opcional)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-400 focus:ring-yellow-400/20 ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="rol" className="text-white">
                    Rol
                  </Label>
                  <Select
                    value={formData.rol}
                    onValueChange={(value: "usuario" | "admin") => setFormData({ ...formData, rol: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usuario">Usuario</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Actualizando usuario...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Actualizar usuario
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/admin" className="text-blue-300 hover:text-blue-200 hover:underline">
                  Volver al panel de administración
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}

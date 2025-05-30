"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/resources/js/components/main-nav"
import { ThemeProvider } from "@/resources/js/components/theme-provider"
import { Button } from "@/resources/js/components/ui/button"
import { Input } from "@/resources/js/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/resources/js/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/resources/js/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/resources/js/components/ui/table"
import { Shield, UserPlus, Edit, Users } from "lucide-react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

// Tipos para usuarios
interface AdminUser {
  id: number
  nombre_usuario: string
  email: string
  rol: "usuario" | "admin"
  created_at: string
}

export default function AdminPanelPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [usuarios, setUsuarios] = useState<AdminUser[]>([])
  const [newUser, setNewUser] = useState({
    nombre_usuario: "",
    email: "",
    password: "",
    rol: "usuario" as "usuario" | "admin",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Verificar si el usuario es admin
    if (!isAuthenticated || !isAdmin) {
      router.push("/")
      return
    }

    // Cargar usuarios simulados
    setLoading(true)
    const mockUsuarios: AdminUser[] = [
      {
        id: 1,
        nombre_usuario: "maria_garcia",
        email: "maria@example.com",
        rol: "admin",
        created_at: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        nombre_usuario: "juan_lector",
        email: "juan@example.com",
        rol: "usuario",
        created_at: "2024-02-20T14:15:00Z",
      },
      {
        id: 3,
        nombre_usuario: "ana_sci_fi",
        email: "ana@example.com",
        rol: "usuario",
        created_at: "2024-03-10T09:45:00Z",
      },
      {
        id: 4,
        nombre_usuario: "carlos_historia",
        email: "carlos@example.com",
        rol: "usuario",
        created_at: "2024-04-05T16:20:00Z",
      },
      {
        id: 5,
        nombre_usuario: "lucia_romance",
        email: "lucia@example.com",
        rol: "usuario",
        created_at: "2024-05-12T11:30:00Z",
      },
    ]

    setTimeout(() => {
      setUsuarios(mockUsuarios)
      setLoading(false)
    }, 500)
  }, [isAuthenticated, isAdmin, router])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.nombre_usuario.trim() || !newUser.email.trim() || !newUser.password.trim()) return

    setSubmitting(true)

    try {
      // Simular creación de usuario
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const nuevoUsuario: AdminUser = {
        id: Date.now(),
        nombre_usuario: newUser.nombre_usuario,
        email: newUser.email,
        rol: newUser.rol,
        created_at: new Date().toISOString(),
      }

      setUsuarios([...usuarios, nuevoUsuario])
      setNewUser({
        nombre_usuario: "",
        email: "",
        password: "",
        rol: "usuario",
      })
      alert("Usuario creado exitosamente!")
    } catch (error) {
      console.error("Error al crear usuario:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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

  if (!isAuthenticated || !isAdmin) {
    return null // El useEffect ya redirige
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <MainNav />
        <main className="container py-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-3xl bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
                  Panel de Administración
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Crear nuevo perfil */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-red-300 mb-4 flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Crear nuevo perfil
                </h2>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={newUser.nombre_usuario}
                        onChange={(e) => setNewUser({ ...newUser, nombre_usuario: e.target.value })}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-red-400 focus:ring-red-400/20"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-red-400 focus:ring-red-400/20"
                      />
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-red-400 focus:ring-red-400/20"
                      />
                      <Select
                        value={newUser.rol}
                        onValueChange={(value: "usuario" | "admin") => setNewUser({ ...newUser, rol: value })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usuario">Usuario</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="md:col-span-2">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        >
                          {submitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Creando perfil...
                            </div>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Crear perfil
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Modificar perfiles existentes */}
              <div>
                <h2 className="text-xl font-semibold text-red-300 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Modificar perfiles
                </h2>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/20 hover:bg-white/5">
                            <TableHead className="text-white/90">ID</TableHead>
                            <TableHead className="text-white/90">Usuario</TableHead>
                            <TableHead className="text-white/90">Email</TableHead>
                            <TableHead className="text-white/90">Rol</TableHead>
                            <TableHead className="text-white/90">Fecha registro</TableHead>
                            <TableHead className="text-white/90">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {usuarios.map((usuario) => (
                            <TableRow key={usuario.id} className="border-white/10 hover:bg-white/5">
                              <TableCell className="text-white/80">{usuario.id}</TableCell>
                              <TableCell className="text-white/80">{usuario.nombre_usuario}</TableCell>
                              <TableCell className="text-white/80">{usuario.email}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    usuario.rol === "admin"
                                      ? "bg-red-600/20 text-red-300 border border-red-500/30"
                                      : "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                                  }`}
                                >
                                  {usuario.rol === "admin" ? "Administrador" : "Usuario"}
                                </span>
                              </TableCell>
                              <TableCell className="text-white/80">{formatDate(usuario.created_at)}</TableCell>
                              <TableCell>
                                <Link href={`/admin/editar/${usuario.id}`}>
                                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                                    <Edit className="h-4 w-4 mr-1" />
                                    Editar
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  )
}

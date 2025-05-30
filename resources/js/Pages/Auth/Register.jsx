"use client"

import { useState } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import { BookOpen, Eye, EyeOff, Sparkles, Users, Star } from "lucide-react"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data, setData, post, processing, errors } = useForm({
    nombre_usuario: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post("/register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      <Head title="Registro" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating decorations */}
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
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg relative z-10">
        <div className="text-center p-6 space-y-4">
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
          <h2 className="text-2xl text-white font-bold">Registro</h2>
          <p className="text-purple-200/80">Únete a nuestra comunidad de lectores apasionados</p>
        </div>

        <div className="p-6">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="nombre_usuario" className="text-white">
                Nombre
              </label>
              <input
                id="nombre_usuario"
                name="nombre_usuario"
                type="text"
                placeholder="Tu nombre"
                value={data.nombre_usuario}
                onChange={(e) => setData("nombre_usuario", e.target.value)}
                required
                autoFocus
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-white">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password_confirmation" className="text-white">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 rounded px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              ¿Ya tienes cuenta?
              <Link href="/login" className="text-purple-300 hover:text-purple-200 hover:underline font-medium ml-1">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

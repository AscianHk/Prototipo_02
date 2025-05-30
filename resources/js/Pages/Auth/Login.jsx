"use client"

import { useState } from "react"
import { Head, Link, useForm } from "@inertiajs/react"
import { BookOpen, Eye, EyeOff, Sparkles } from "lucide-react"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4 relative overflow-hidden">
      <Head title="Iniciar Sesión" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-blue-300/20 transform rotate-12">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="absolute top-40 right-32 text-purple-300/20 transform -rotate-12">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute bottom-32 left-32 text-blue-400/20 transform rotate-45">
          <BookOpen className="h-10 w-10" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-400/20 transform -rotate-45">
          <Sparkles className="h-8 w-8" />
        </div>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-lg relative z-10">
        <div className="text-center p-6 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Crítico de Bolsillo
              </h1>
              <p className="text-xs text-blue-200/80">Tu red social de libros</p>
            </div>
          </div>
          <h2 className="text-2xl text-white font-bold">Iniciar Sesión</h2>
          <p className="text-blue-200/80">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        <div className="p-6">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-6">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                autoFocus
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 rounded px-3 py-2"
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
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 rounded px-3 py-2 pr-10"
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

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              ¿No tienes cuenta?
              <Link href="/register" className="text-blue-300 hover:text-blue-200 hover:underline font-medium ml-1">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

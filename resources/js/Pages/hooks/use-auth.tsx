"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface User {
  id: number
  name: string
  email: string
  username: string
  avatar?: string
  bio?: string
  rol: "usuario" | "admin"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simular verificación de autenticación al cargar
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simular login - en producción esto sería una llamada a la API
    const mockUser = {
      id: 1,
      name: "María García",
      email: email,
      username: "maria_garcia",
      avatar: "/images/profile.png",
      bio: "Amante de la literatura fantástica y la ciencia ficción. Siempre en busca de nuevos mundos que explorar a través de las páginas. Estudiante de literatura comparada y escritora aficionada.",
      rol: "admin" as const, // María García es admin
    }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string) => {
    // Simular registro - en producción esto sería una llamada a la API
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      username: name.toLowerCase().replace(/\s+/g, "_"),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
      bio: "",
      rol: "usuario" as const, // Los nuevos usuarios son usuarios normales
    }
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const isAdmin = user?.rol === "admin"

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

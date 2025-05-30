"use client"

import { Card, CardContent } from "@/resources/js/components/ui/card"
import { Button } from "@/resources/js/components/ui/button"
import { ChevronDown, X, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/resources/js/Pages/hooks/use-auth"

interface BookItem {
  id: number
  title: string
  author: string
  cover: string
  googleId?: string
}

interface BookListDetailedProps {
  books: BookItem[]
  listType: string
  onRemoveBook?: (bookId: number) => void
}

export function BookListDetailed({ books, listType, onRemoveBook }: BookListDetailedProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()

  const handleRemoveBook = (bookId: number) => {
    if (onRemoveBook) {
      onRemoveBook(bookId)
    }
    console.log(`Eliminando libro ${bookId} de la lista ${listType}`)
  }

  const handleDiaryAccess = (bookId: number) => {
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para acceder al diario")
      return
    }

    // Navigate to the diary page with user ID and book ID
    const bookIdString = books.find((book) => book.id === bookId)?.googleId || bookId.toString()
    window.location.href = `/diario/${user.id}/${bookIdString}`
  }

  const getListTitle = (type: string) => {
    switch (type) {
      case "favoritos":
        return "Favoritos"
      case "pendiente":
        return "Pendiente"
      case "leyendo":
        return "Leyendo"
      case "terminado":
        return "Terminado"
      case "megusta":
        return "Me gusta"
      default:
        return type
    }
  }

  return (
    <Card className="mb-4">
      <Button
        variant="ghost"
        className="w-full justify-between p-4 h-auto font-semibold text-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-blue-800 dark:text-blue-300">{getListTitle(listType)}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <CardContent className="p-4 pt-2">
          {books.length > 0 ? (
            <ul className="space-y-3">
              {books.map((book) => (
                <li key={book.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                  <Link href={`/libro/${book.googleId || book.id}`} className="flex items-center gap-2 group flex-grow">
                    <div className="w-10 h-14 overflow-hidden rounded shadow flex-shrink-0">
                      <img
                        src={book.cover || "/placeholder.svg?height=60&width=40&text=Sin+imagen"}
                        alt="Portada"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-blue-900 dark:text-blue-300 group-hover:underline font-medium">
                      {book.title}
                    </span>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDiaryAccess(book.id)}
                      className="bg-green-600 text-white hover:bg-green-700 px-3 py-1 h-auto text-xs"
                      title="Diario de aventuras"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Diario
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBook(book.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                      title="Eliminar"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              {listType === "favoritos" && "No tienes libros favoritos."}
              {listType === "pendiente" && "No tienes libros pendientes."}
              {listType === "leyendo" && "No tienes libros en lectura."}
              {listType === "terminado" && "No tienes libros terminados."}
              {listType === "megusta" && 'No tienes libros marcados como "me gusta".'}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  )
}

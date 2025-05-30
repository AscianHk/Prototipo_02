"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/resources/js/components/ui/button"
import { Card, CardContent } from "@/resources/js/components/ui/card"
import { cn } from "@/lib/utils"

interface Book {
  id: number
  title: string
  author: string
  rating: number
}

interface BookCarouselProps {
  books: Book[]
}

export function BookCarousel({ books }: BookCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const container = carouselRef.current
    const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth
    container.scrollBy({ left: scrollAmount, behavior: "smooth" })

    // Update scroll position for button visibility
    setScrollPosition(
      direction === "left"
        ? Math.max(0, scrollPosition - container.offsetWidth)
        : Math.min(container.scrollWidth - container.offsetWidth, scrollPosition + container.offsetWidth),
    )
  }

  const handleScrollUpdate = () => {
    if (!carouselRef.current) return
    setScrollPosition(carouselRef.current.scrollLeft)
  }

  return (
    <div className="relative group">
      <div ref={carouselRef} className="flex overflow-x-auto scrollbar-hide gap-4 pb-4" onScroll={handleScrollUpdate}>
        {books.map((book) => (
          <Card key={book.id} className="min-w-[180px] md:min-w-[200px] transition-all hover:scale-105">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] overflow-hidden rounded-t-md">
                <img
                  src={`/placeholder.svg?height=300&width=200&text=${encodeURIComponent(book.title)}`}
                  alt={book.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                  <span className="text-xs ml-1">{book.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 shadow-md transition-opacity",
          "group-hover:opacity-100",
          scrollPosition <= 10 && "hidden",
        )}
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Scroll left</span>
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 shadow-md transition-opacity",
          "group-hover:opacity-100",
          carouselRef.current &&
            scrollPosition >= carouselRef.current.scrollWidth - carouselRef.current.offsetWidth - 10 &&
            "hidden",
        )}
        onClick={() => handleScroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Scroll right</span>
      </Button>
    </div>
  )
}

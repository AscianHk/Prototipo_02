import { Card, CardContent } from "@/resources/js/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Book {
  id: number
  title: string
  author: string
  cover: string
}

interface BookListProps {
  books: Book[]
}

export function BookList({ books }: BookListProps) {
  return (
    <>
      {books.map((book) => (
        <Link href="#" key={book.id}>
          <Card className="overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
            <div className="aspect-[2/3] relative">
              <Image
                src={book.cover || `/placeholder.svg?height=300&width=200&text=${encodeURIComponent(book.title)}`}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}

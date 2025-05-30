import { Card, CardContent, CardFooter, CardHeader } from "@/resources/js/components/ui/card"
import { Button } from "@/resources/js/components/ui/button"
import { Heart, MessageCircle, Share2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BookReviewProps {
  bookTitle: string
  bookAuthor: string
  bookCover: string
  rating: number
  date: string
  content: string
  likes: number
  comments: number
}

export function BookReview({
  bookTitle,
  bookAuthor,
  bookCover,
  rating,
  date,
  content,
  likes,
  comments,
}: BookReviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Link href="#" className="flex-shrink-0">
          <div className="w-16 h-24 overflow-hidden rounded-md">
            <Image
              src={bookCover || "/placeholder.svg"}
              alt={bookTitle}
              width={64}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <Link href="#" className="text-lg font-bold hover:underline">
                {bookTitle}
              </Link>
              <p className="text-sm text-muted-foreground">{bookAuthor}</p>
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "fill-purple-500 text-purple-500" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{date}</div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:text-blue-300"
          >
            <Heart className="h-4 w-4" />
            {likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs text-purple-500 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900 dark:hover:text-purple-300"
          >
            <MessageCircle className="h-4 w-4" />
            {comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          <Share2 className="h-4 w-4" />
          Compartir
        </Button>
      </CardFooter>
    </Card>
  )
}

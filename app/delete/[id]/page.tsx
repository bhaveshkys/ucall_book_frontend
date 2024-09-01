'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useState, useEffect } from 'react'

const fetchBookById = async (id: number) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/books/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch book')
    }
    return response.json()
  } catch (error) {
    console.error('Error fetching book:', error)
    throw error
  }
}

export default function DeleteBook({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bookId = parseInt(params.id)

  useEffect(() => {
    async function loadBook() {
      try {
        const fetchedBook = await fetchBookById(bookId)
        setBook(fetchedBook)
      } catch (error) {
        setError('Error fetching book data')
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [bookId])

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete book')
      }

      router.push('/')
    } catch (error) {
      setError('Error deleting book')
      console.error('Error deleting book:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Delete Book</h1>
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book
              "{book.title}" by {book.author}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.push('/')}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

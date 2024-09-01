'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import BookForm from '@/app/components/BookForm'

export default function EditBook({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [book, setBook] = useState<any>(null) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null) 
  const bookId = parseInt(params.id)

  useEffect(() => {
    // Fetch the book data from the API
    async function fetchBook() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch book')
        }
        const data = await response.json()
        setBook(data) // Set the book data
      } catch (error) {
        setError('Error fetching book data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [bookId])

  const handleSubmit = async (data: { title: string; author: string; description: string }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update book')
      }

      router.push('/')
    } catch (error) {
      setError('Error updating book')
      console.error('Error updating book:', error)
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
      <h1 className="text-3xl font-bold">Edit Book</h1>
      <BookForm initialData={book} onSubmit={handleSubmit} />
    </div>
  )
}

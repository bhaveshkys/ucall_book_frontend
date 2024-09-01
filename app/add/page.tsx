'use client'

import { useRouter } from 'next/navigation'
import BookForm from '../components/BookForm'

export default function AddBook() {
  const router = useRouter()

  const handleSubmit = async (data: { title: string; author: string; description: string }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to add book')
      }

      router.push('/')
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Book</h1>
      <BookForm onSubmit={handleSubmit} />
    </div>
  )
}

'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

/* const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
] */

export default function Home() {
  const [books, setBooks] = useState([]) 
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('http://127.0.0.1:8000/books')
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setBooks(data) 
        } else {
          console.error('Failed to fetch books')
        }
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks() 
  }, [])
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Book List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/edit/${book.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/delete/${book.id}`}>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
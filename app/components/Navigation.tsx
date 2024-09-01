import Link from 'next/link'
import { Book } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Book size={24} />
          <span className="text-xl font-bold">Book App</span>
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/add" className="hover:text-gray-300">Add Book</Link></li>
        </ul>
      </div>
    </nav>
  )
}
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/app/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Management App',
  description: 'Manage your book collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-100 py-4 text-center">
            <p className="text-sm text-gray-600">© 2023 Book Management App</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
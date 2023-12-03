import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soporte PSA',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className=' w-full flex justify-around text-black font-bold'>
        <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-300 shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
                <a href={'/'} className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">PSA</a>
                <a href={'/soporte'} className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Soporte</a>
                <a href={'/proyecto'} className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Proyectos</a>
            </div>
        </nav>
        </header>
        <div className='h-full'>
            {children}
        </div>
        <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
            © 2023 Copyright: PSA
            </div>
        </footer>
      </body>
    </html>
  )
}
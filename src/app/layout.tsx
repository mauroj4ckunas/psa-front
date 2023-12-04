import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PSA',
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
          <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-neutral-300 shadow-md sm:items-baseline w-full">
              <div className="w-full flex justify-around items-center">
                  <Link href={'/'} className="text-2xl px-4 py-2 rounded-md hover:bg-cyan-950 hover:text-white">PSA</Link>
                  <Link href={'/soporte'} className="text-2xl px-4 py-2 rounded-md hover:bg-cyan-950 hover:text-white">Soporte</Link>
                  <Link href={'/proyecto'} className="text-2xl px-4 py-2 rounded-md hover:bg-cyan-950 hover:text-white">Proyectos</Link>
              </div>
          </nav>
        </header>
        <div className='bg-gradient-to-t from-indigo-500 h-screen'>
            <div className='flex flex-col bg-white my-5 h-screen'>
                {children}
            </div>
        </div>

        <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left" style={{position: 'fixed', left: 0, right: 0, bottom: 0}}>
            <div className="text-center text-neutral-700 dark:text-neutral-200">
            © 2023 Copyright: PSA
            </div>
        </footer>
      </body>
    </html>
  )
}
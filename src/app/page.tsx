import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
        <header className=' w-full h-[20%] flex flex-grow justify-between text-black font-bold'>
          <Link href={'/'}>PSA</Link>
          <Link href={'/soporte'}>Soporte</Link>
          <div>Proyecto</div>
        </header>
    </main>
  )
}
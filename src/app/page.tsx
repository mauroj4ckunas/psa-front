import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <script src="../path/to/flowbite/dist/datepicker.js"></script>
        <header className=' w-full h-[20%] flex flex-grow justify-between text-black font-bold'>
          <Link href={'/'}>PSA</Link>
          <Link href={'/soporte'}>Soporte</Link>
          <Link href={'/proyecto'}>Proyecto</Link>
        </header>
    </main>
  )
}
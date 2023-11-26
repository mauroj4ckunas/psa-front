import Link from 'next/link';
import React from 'react'

function Soporte() {
  return <>
    <main className='flex min-h-screen flex-col items-center p-16'>
        <header className=' w-full h-[20%] flex flex-grow justify-between text-black font-bold'>
          <Link href={'/'}>PSA</Link>
          <Link href={'/soporte'}>Soporte</Link>
          <div>Proyecto</div>
        </header>
        <section className=' h-full w-full flex flex-col'>
            
        </section>
    </main>
  </>
}

export default Soporte;
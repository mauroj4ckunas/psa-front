import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex flex-row bg-gradient-to-t from-indigo-500'>
        <div className='basis-1/3 h-screen tracking-wider text-center underline text-sky-400/75 decoration-indigo-500 place-content-center' >
            <h1 className='text-5xl font-extrabold'>Sistema de gestión</h1>
            <h1 className='text-5xl font-extrabold'>PSA</h1>
        </div>
        <div className='flex bg-gray-500 basis-2/3 h-screen rounded-l-full overflow-hidden shadow-inner ring-4 ring-blue-500/50 '>
            <img className="object-cover" src="https://images.pixexid.com/slack-comes-to-life-as-an-effective-coordinator-expertly-managing-multiple-chan-s2mc22j7.jpeg" alt="OfficeLife"/>        
        </div>
    </main>
  )
}

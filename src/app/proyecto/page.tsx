'use client'
import React from 'react';
import { Button } from 'primereact/button';
import ListaProyectos from './components/ListaProyectos';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Proyecto() {
  const router = useRouter();
  return (
    <>
      <main className="min-h-full h-full items-center px-5 pt-5 pb-5">
        <header className="w-full flex flex-grow justify-between text-black font-bold mb-4">
          <div className='text-4xl'>
            Listado de Proyectos
          </div>
          <Link  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" href={'/proyecto/alta'}>+ Nuevo</Link>
        </header>
        <section className="h-full w-full flex flex-col">
          <ListaProyectos />
        </section>
      </main>
    </>
  );
};

export default Proyecto;

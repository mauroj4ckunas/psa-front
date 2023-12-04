import Link from 'next/link';
import React from 'react'
import TablaProductos from './components/TablaProductos';
import { producto } from '../models/producto';
import { allProductos } from './services/productos/allProductos';
import { badRequest } from '../models/badRequest';


async function getAllProductos(): Promise<producto[] | badRequest> {
  return allProductos();
}

async function Soporte() {
  
  const listaDeProductos = await getAllProductos();

  return <>
    <main className='min-h-full h-full items-center px-5 py-5 bg-gray-300 m-5 rounded-xl divide-y-2'>
        <header className="w-full flex flex-grow justify-between text-black font-bold mb-4">
              <div className='text-4xl'>
                Listado de Productos
              </div>
        </header>
        <section className=' h-full w-full flex flex-col'>
            {
              'error' in listaDeProductos ? 
              <TablaProductos listaDeProductos={[]}/> :
              <TablaProductos listaDeProductos={listaDeProductos}/>
            }
        </section>
    </main>
  </>
}

export default Soporte;
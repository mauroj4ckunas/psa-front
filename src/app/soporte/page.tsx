import Link from 'next/link';
import React from 'react'
import TablaTickets from './[producto_id]/components/TablaTickets';
import TablaProductos from './components/TablaProductos';
import { producto } from './models/producto';
import { allProductos } from './services/productos/allProductos';
import { badRequest } from '../models/badRequest';


async function getAllProductos(): Promise<producto[] | badRequest> {
  return allProductos();
}

async function Soporte() {
  
  const listaDeProductos = await getAllProductos();

  return <>
    <main className='flex min-h-screen flex-col items-center p-16'>
        <header className=' w-full mb-10 flex justify-between text-black font-bold'>
          <Link href={'/'}>PSA</Link>
          <Link href={'/soporte'}>Soporte</Link>
          <div>Proyecto</div>
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
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
    <main className='flex min-h-screen flex-col items-center p-16'>
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
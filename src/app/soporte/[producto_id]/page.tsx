import React from 'react'
import { allTickets } from './services/allTickets';
import { ticket } from '../models/ticket';
import { badRequest } from '@/app/models/badRequest';
import Link from 'next/link';
import TablaTickets from './components/TablaTickets';

async function getAllTickets(producto_id: number): Promise<ticket[] | badRequest> {
    return allTickets(producto_id);
  }

async function Producto({ params }: { params: { producto_id: string } }) {

    const listaDeTickets = await getAllTickets(Number(params.producto_id));

    return <>
    <main className='flex min-h-screen flex-col items-center p-16'>
        <header className=' w-full mb-10 flex justify-between text-black font-bold'>
          <Link href={'/'}>PSA</Link>
          <Link href={'/soporte'}>Soporte</Link>
          <div>Proyecto</div>
        </header>
        <section className=' h-full w-full flex flex-col'>
            {
              'error' in listaDeTickets ? 
              <div>
                No hay tickets para este producto
              </div> :
              <TablaTickets listaDeTickets={listaDeTickets} />
            }
        </section>
    </main>
  </>
}

export default Producto;
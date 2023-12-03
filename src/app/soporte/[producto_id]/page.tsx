import React from 'react'
import { getTicketProducto } from './services/getTicketProducto';
import TablaTickets from './components/TablaTickets';

async function Producto({ params }: { params: { producto_id: string } }) {

  const listaDeTickets = await getTicketProducto(Number(params.producto_id));
  
  return <>
  <main className='flex min-h-screen flex-col items-center p-16'>
      <section className=' h-full w-full flex flex-col'>
          {
            'error' in listaDeTickets ? 
            <TablaTickets listaDeTickets={[]} productoId={Number(params.producto_id)}/> :
            <TablaTickets listaDeTickets={listaDeTickets} productoId={Number(params.producto_id)}/>
          }
      </section>
    </main>
  </>
}

export default Producto;
import React from 'react'
import { getTicketProducto } from './services/getTicketProducto';
import TablaTickets from './components/TablaTickets';

async function Producto({ params }: { params: { producto_id: string } }) {

  const listaDeTickets = await getTicketProducto(Number(params.producto_id));
  
  return <>
  <main className='min-h-full h-full items-center px-5 py-5 bg-gray-300 m-5 rounded-xl divide-y-2'>
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
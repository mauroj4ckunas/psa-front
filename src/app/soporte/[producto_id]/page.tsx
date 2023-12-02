import React from 'react'
import Link from 'next/link';
import { getVersiones } from './services/getVersiones';
import TablaVersiones from './components/TablaVersiones';

async function Producto({ params }: { params: { producto_id: string } }) {

  const listaVersiones = await getVersiones(Number(params.producto_id));

  return <>
  <main className='flex min-h-screen flex-col items-center p-16'>
      <section className=' h-full w-full flex flex-col'>
          {
            'error' in listaVersiones ? 
            <div>
              No hay tickets para este producto
            </div> :
            <TablaVersiones listaDeVersiones={listaVersiones} productoId={Number(params.producto_id)}/>
          }
      </section>
    </main>
  </>
}

export default Producto;
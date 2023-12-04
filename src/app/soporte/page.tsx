'use client'
import React, { useEffect, useState } from 'react'
import TablaProductos from './components/TablaProductos';
import { producto } from '../models/producto';
import { allProductos } from './services/productos/allProductos';
import { badRequest } from '../models/badRequest';


async function getAllProductos(): Promise<producto[] | badRequest> {
  return allProductos();
}

function Soporte() {
  
  const [listaDeProductos, setListaDeProductos] = useState<producto[] | badRequest>({
    error: '',
    message: '',
  });

  useEffect(() => {
    getAllProductos().then(data => !('error' in data) && setListaDeProductos(data));
  }, []);

  return <>
    <main className='min-h-full h-full items-center px-5 py-5 bg-gray-200 m-5 rounded-xl divide-y-2'>
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
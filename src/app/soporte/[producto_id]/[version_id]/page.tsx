import React from 'react'
import { allTickets } from './services/allTickets'
import TablaTickets from './components/TablaTickets';
import { ticket } from '@/app/models/ticket';
import { badRequest } from '@/app/models/badRequest';

async function Version({ params }: { params: { version_id: string } }) {

    const listaDeTickets: ticket[] | badRequest = await allTickets(Number(params.version_id));

    return <>
    <main className='flex min-h-screen flex-col items-center p-16'>
        <section className=' h-full w-full flex flex-col'>
            {
                'error' in listaDeTickets ? 
                <div>
                No hay tickets para este producto
                </div> :
                <TablaTickets listaDeTickets={listaDeTickets}/>
            }
        </section>
    </main>
    </>
}

export default Version;
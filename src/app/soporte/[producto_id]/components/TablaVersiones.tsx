'use client'
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Toast } from 'primereact/toast';
import { FaEye } from 'react-icons/fa';
import { version } from '@/app/models/version';
import { formatearFecha } from '@/app/utils/formatearFecha';
import Link from 'next/link';

interface Props {
    listaDeVersiones: version[],
    productoId: number,
}

function TablaVersiones({ listaDeVersiones, productoId }: Props) {

  const toast = useRef<Toast>(null);

  const verTickets = (versionId: number) => {
      return <div className='w-3/4 flex justify-around items-center'>
        <Link href={`/soporte/${productoId}/${versionId}`} className=' bg-slate-500 text-white rounded-md p-3 text-xl hover:bg-slate-300 hover:text-slate-500 cursor-pointer'><FaEye /></Link>
      </div>;
  };

  console.log(listaDeVersiones)

  return <>
    <DataTable value={listaDeVersiones} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="productoVersionId" header="Id"></Column>
        <Column field="version" header="Version"></Column>
        <Column body={(row) => formatearFecha(row.createdAt)} header="Fecha de Creación"></Column>
        <Column header="" body={(row) => verTickets(row.productoVersionId)}></Column>
    </DataTable>
    <Toast ref={toast} />
  </>
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

export default TablaVersiones;
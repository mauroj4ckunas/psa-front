'use client'
import React, {  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { producto } from '../../models/producto';
import { FaEye } from "react-icons/fa";
import { ConfirmDialog } from 'primereact/confirmdialog';
import Link from 'next/link';

interface Props {
  listaDeProductos: producto[],
}

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function TablaProductos({ listaDeProductos }: Props) {

  const accionesProducto = (producto: producto) => {
      return <div className='flex justify-center items-center'>
        <Link href={`/soporte/${producto.productoId}`} className=' bg-slate-500 text-white rounded-md p-3 text-xl hover:bg-slate-300 hover:text-slate-500 cursor-pointer'><FaEye /></Link>
      </div>;
  };

  return <>
      <DataTable value={listaDeProductos} emptyMessage={<div>No hay productos actualmente</div>} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  tableStyle={{ minWidth: '50rem' }}>
        <Column field="productoId" header="ID"></Column>
        <Column field="nombre" header="Nombre del Producto"></Column>
        <Column header="" body={(row) => accionesProducto(row)}></Column>
      </DataTable>
      <ConfirmDialog draggable={false}/>
    </>
}

export default TablaProductos;
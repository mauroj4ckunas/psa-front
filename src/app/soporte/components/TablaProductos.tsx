'use client'
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { producto } from '../models/producto';
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import PanelCrearProducto from './PanelCrearProducto';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';

interface Props {
  listaDeProductos: producto[],
}

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function TablaProductos({ listaDeProductos }: Props) {

  const router = useRouter();
  const toast = useRef<Toast>(null);
  const eliminar = (producto: producto) => {
    const url = `${url_base}/productos/${producto.producto_id}`
    fetch(url)
        .then(response => {
            if (response.ok) {
              toast.current?.show({ severity: 'info', summary: 'Eliminación exitosa', detail: 'El producto fue eliminado.', life: 3000 });
              router.refresh();
            }
        })
  }

  const confirmarEliminar = (producto: producto) => {
    confirmDialog({
        message: 'En caso de proseguir, el producto se eliminará indefinidamente',
        header: 'Confirme borrado de producto',
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: ' mx-2 px-4 py-2 rounded-md bg-red-500 font-semibold hover:bg-red-300',
        rejectClassName: ' mx-2 px-4 py-2 rounded-md bg-white-500 font-semibold',
        accept: () => eliminar(producto),
    });
  };

  const accionesProducto = (producto: producto) => {
      return <div className='w-3/4 flex justify-around items-center'>
        <div className=' bg-red-500 text-white rounded-md p-3 text-xl hover:bg-red-300 hover:text-slate-200 cursor-pointer' onClick={() => confirmarEliminar(producto)}><FaRegTrashAlt /></div>
        <div className=' bg-slate-500 text-white rounded-md p-3 text-xl hover:bg-slate-300 hover:text-slate-500 cursor-pointer'><FaEye /></div>
      </div>;
  };

  const [panel, setPanel] = useState<boolean>(false);

  const agregarProducto = (
    <div className='w-full flex justify-end items-center' onClick={() => setPanel(true)}>
      <button className='font-bold px-4 py-2 bg-blue-300 rounded-md hover:bg-blue-500'>Agregar Producto</button>
    </div>
  );

  return <>
      <DataTable value={listaDeProductos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  header={agregarProducto} tableStyle={{ minWidth: '50rem' }}>
        <Column field="producto_id" header="Producto ID"></Column>
        <Column field="proyecto_id" header="Proyecto ID"></Column>
        <Column field="version" header="Versión"></Column>
        <Column header="" body={(row) => accionesProducto(row)}></Column>
      </DataTable>
      <PanelCrearProducto visible={panel} onHide={() => setPanel(false)} />
      <ConfirmDialog draggable={false}/>
      <Toast ref={toast} />
    </>
}

export default TablaProductos;
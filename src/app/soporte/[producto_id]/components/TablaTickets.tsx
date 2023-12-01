'use client'
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ticket } from '../../models/ticket';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { FaEye, FaRegTrashAlt } from 'react-icons/fa';
import DetalleTicket from './DetalleTicket';
import PanelCrearTicket from './PanelCrearTicket';

interface Props {
  listaDeTickets: ticket[]
}


const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

function TablaTickets({ listaDeTickets }: Props) {

  const [crearTicket, setCrearTicket] = useState<boolean>(false);
  const [panel, setPanel] = useState<boolean>(false);
  const [verTicket, setVerTicket] = useState<ticket | null>(null);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const eliminar = (ticket: ticket) => {
    const url = `${url_base}/tickets/${ticket.ticket_id}`
    fetch(url)
        .then(response => {
            if (response.ok) {
              toast.current?.show({ severity: 'info', summary: 'Eliminación exitosa', detail: 'El ticket fue eliminado.', life: 3000 });
              router.refresh();
            }
        })
  }

  const confirmarEliminar = (ticket: ticket) => {
    confirmDialog({
        message: 'En caso de proseguir, el ticket se eliminará indefinidamente',
        header: 'Confirme borrado de ticket',
        icon: 'pi pi-exclamation-triangle',
        acceptClassName: ' mx-2 px-4 py-2 rounded-md bg-red-500 font-semibold hover:bg-red-300',
        rejectClassName: ' mx-2 px-4 py-2 rounded-md bg-white-500 font-semibold',
        accept: () => eliminar(ticket),
    });
  };

  const accionesTicket = (ticket: ticket) => {
      return <div className='w-3/4 flex justify-around items-center'>
        <div className=' bg-red-500 text-white rounded-md p-3 text-xl hover:bg-red-300 hover:text-slate-200 cursor-pointer' onClick={() => confirmarEliminar(ticket)}><FaRegTrashAlt /></div>
        <div className=' bg-slate-500 text-white rounded-md p-3 text-xl hover:bg-slate-300 hover:text-slate-500 cursor-pointer' onClick={() => {setPanel(true); setVerTicket(ticket)}}><FaEye /></div>
      </div>;
  };

  const onHide = () => {
    setPanel(false);
    setVerTicket(null);
  }

  const agregarTicket = (
    <div className='w-full flex justify-end items-center'>
      <button className='font-bold px-4 py-2 bg-blue-300 rounded-md hover:bg-blue-500' onClick={() => setCrearTicket(true)}>Agregar Ticket</button>
    </div>
  );
  
  return <>
    <DataTable value={listaDeTickets} header={agregarTicket} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="ticket_id" header="Id"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="prioridad" header="Prioridad"></Column>
        <Column field="descripcion" header="Descripcion"></Column>
        <Column header="" body={(row) => accionesTicket(row)}></Column>
    </DataTable>
    <PanelCrearTicket visible={crearTicket} onHide={() => setCrearTicket(false)} producto_id={6}/>
    <ConfirmDialog draggable={false}/>
    {verTicket && <DetalleTicket visible={panel} onHide={onHide} ticket={verTicket}/>}
    <Toast ref={toast} />
  </>
}

export default TablaTickets;
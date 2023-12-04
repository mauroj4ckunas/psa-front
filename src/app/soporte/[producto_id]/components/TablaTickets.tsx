'use client'
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Toast } from 'primereact/toast';
import { FaEye, FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { formatearFecha } from '@/app/utils/formatearFecha';
import { ticket } from '@/app/models/ticket';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import PanelDetalleTicket from './PanelDetalleTicket';
import PanelCrearTicket from './PanelCrearTicket';
import PanelEditarTicket from './PanelEditarTicket';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { getVersiones } from '../services/getVersiones';
import { version } from '@/app/models/version';

interface Props {
    listaDeTickets: ticket[],
    productoId: number,
}

function fetchVersiones(productoId: number) {
    return getVersiones(productoId)
}
const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

function TablaTickets({ listaDeTickets, productoId }: Props) {

    const toast = useRef<Toast>(null);
    const [nombreDeVersiones, setNombreDeVersiones] = useState<string[]>([]);
    const [todosLosTickets, setTodosLosTickets] = useState<ticket[]>(listaDeTickets);
    const [busquedaId, setBusquedaId] = useState<string>('');

    const ticketsFiltrados = busquedaId
        ? todosLosTickets.filter(ticket => ticket.ticketId.toString().includes(busquedaId))
        : todosLosTickets;

    useEffect(() => {
        fetchVersiones(productoId).then(data => {
            if (!('error' in data)) {
                const versiones: version[] = data;
                setNombreDeVersiones(versiones.map(v => v.version));
            }
        })
    }, [])

    const [panelDetalles, setPanelDetalles] = useState<boolean>(false);
    const [verTicket, setVerTicket] = useState<ticket | null>(null);

    const [panelCrear, setPanelCrear] = useState<boolean>(false);

    const [panelEditar, setPanelEditar] = useState<boolean>(false);
    const [ticketAEditar, setTicketAEditar] = useState<ticket | null>(null);

    const aceptarEliminarTicket = (ticketAEliminar: ticket) => {
        const url = `${url_base}/tickets/${ticketAEliminar.ticketId}`
        fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    toast.current?.show({ severity: 'info', summary: 'Ticket Eliminado', detail: `El ticket ${ticketAEliminar.nombre} fue eliminado`, life: 3000 });
                    setTodosLosTickets(todosLosTickets.filter(t => t.ticketId !== ticketAEliminar.ticketId))
                }
            })
    }

    const eliminarTicket = (ticketAEliminar: ticket) => {
        confirmDialog({
            message: '¿Seguro que quiere eliminar el ticket?',
            header: 'Confirmación',
            icon: '',
            acceptClassName: ' mx-3 px-4 py-2 rounded-md bg-red-300 hover:bg-red-500 font-bold',
            rejectClassName: ' mx-3 px-4 py-2 font-bold',
            accept: () => aceptarEliminarTicket(ticketAEliminar),
        });
    };

    const accionesTickets = (ticket: ticket) => {
        return <div className='w-3/4 flex justify-around items-center'>
            <div className=' bg-red-500 text-white rounded-md p-3 text-xl hover:bg-red-300 hover:text-black cursor-pointer' onClick={() => eliminarTicket(ticket)}><FaTrashAlt /></div>
            <div className=' bg-slate-500 text-white rounded-md p-3 text-xl hover:bg-slate-300 hover:text-slate-500 cursor-pointer' onClick={() => {setPanelDetalles(true); setVerTicket(ticket)}}><FaEye /></div>
            <div className=' bg-green-500 text-white rounded-md p-3 text-xl hover:bg-green-300 hover:text-black cursor-pointer' onClick={() => {setPanelEditar(true); setTicketAEditar(ticket)}}><FaPencilAlt /></div>
        </div>;
    };

    const agregarTicket = (nuevoTicket: ticket | null) => {
        if (nuevoTicket) {
            setTodosLosTickets(ticketsViejos => [nuevoTicket, ...ticketsViejos]);
            toast.current?.show({ severity: 'success', summary: 'Crear ticket', detail: `El ticket ${nuevoTicket.nombre} se creó correctamente`, life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Crear ticket', detail: `Hubo un error en la creación del ticket`, life: 3000 });
        }
        setPanelCrear(false);
    }

    const editarTicket = (ticketEditado: ticket | null) => {
        if (ticketEditado) {
            setTodosLosTickets(ticketsViejos => {
                return ticketsViejos.map(t => {
                    if (t.ticketId === ticketEditado.ticketId) {
                        return { ...ticketEditado };
                    }
                    return t;
                });
            })
            toast.current?.show({ severity: 'success', summary: 'Editar ticket', detail: `El ticket ${ticketEditado.nombre} se editó correctamente`, life: 3000 });
        } else {
            toast.current?.show({ severity: 'error', summary: 'Editar ticket', detail: `Hubo un error en la edición del ticket`, life: 3000 });
        }
        setTicketAEditar(null);
        setPanelEditar(false);
    }

    const headerTablaTicket = (
        <div className='w-full flex items-center justify-end'>
            <input 
                type="text" 
                placeholder="Buscar por ID..." 
                value={busquedaId}
                onChange={(e) => setBusquedaId(e.target.value)}
                className="p-2 border border-gray-300 rounded mx-4"
            />
            <button className=' px-5 py-3 rounded-md bg-blue-400 font-semibold shadow-md hover:bg-blue-700 text-black'
                    onClick={() => setPanelCrear(true)}
            >
                Crear Ticket
            </button>
        </div>
    )

    const onHideDetalle = () => {
        setPanelDetalles(false);
        setVerTicket(null)
    }

  return <>
    <DataTable value={ticketsFiltrados} header={headerTablaTicket} emptyMessage={"Sin Tickets actualmente"} 
               paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
    >
        <Column field="ticketId" header="Id"></Column>
        <Column field="nombre" header="Nombre del ticket"></Column>
        <Column field="versionNombre" header="Versión del Producto"></Column>
        <Column field="estado" header="Estado del Ticket"></Column>
        <Column field="prioridad" header="Prioridad del Ticket"></Column>
        <Column body={(row) => formatearFecha(row.createdAt)} header="Fecha de Creación"></Column>
        <Column header="" body={(row) => accionesTickets(row)}></Column>
    </DataTable>
    <ConfirmDialog />
    <Toast ref={toast} />
    {verTicket && <PanelDetalleTicket visible={panelDetalles} onHide={onHideDetalle} ticket={verTicket} />}
    <PanelCrearTicket visible={panelCrear} productoId={productoId} cerrar={() => setPanelCrear(false)} agregar={agregarTicket}/>
    {ticketAEditar && <PanelEditarTicket visible={panelEditar} productoId={productoId} cerrar={() => {setPanelEditar(false); setTicketAEditar(null)}} editar={editarTicket} ticket={ticketAEditar}/>}
  </>
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

export default TablaTickets;
import React from 'react'
import { ticket } from '../../../../models/ticket'
import { Dialog } from 'primereact/dialog'

interface Props {
    visible: boolean,
    onHide: () => void,
    ticket: ticket,
}

function DetalleTicket({ visible, onHide, ticket }: Props) {
  return <>
    <Dialog visible={visible} onHide={onHide} draggable={false} closeOnEscape>
    <form className="p-4 space-y-4 w-50">
        <div className="flex">
            <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700">Ticket ID</label>
                <input type="text" value={ticket.ticket_id} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700">Producto ID</label>
                <input type="text" value={ticket.producto_id} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
        </div>
        <div className="flex">
            <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" value={ticket.nombre} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea value={ticket.descripcion ?? ''} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
        </div>
        <div className="flex">
            <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                <textarea value={ticket.prioridad ?? ''} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700">Severidad</label>
                <textarea value={ticket.severidad ?? ''} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
        </div>
        <div className="flex">
            <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <input type="text" value={ticket.categoria} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
            <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <input type="text" value={ticket.estado} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none" />
            </div>
        </div>
        <div className="pt-4 flex justify-end">
            <button type="button" onClick={onHide} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cerrar</button>
        </div>
    </form>

    </Dialog>
  </>
}

export default DetalleTicket;
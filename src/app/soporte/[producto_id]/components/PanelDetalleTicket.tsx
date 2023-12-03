import { ticket } from '@/app/models/ticket'
import { Dialog } from 'primereact/dialog'
import React from 'react'

interface Props {
    visible: boolean,
    onHide: () => void,
    ticket: ticket,
}

function PanelDetalleTicket({ visible, onHide, ticket }: Props) {
  return <Dialog visible={visible} onHide={onHide} draggable={false} closeOnEscape={true}>
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow">
        <div className="space-y-3">
          <div>
            <strong>ID del Ticket:</strong> {ticket.ticketId}
          </div>
          {ticket.versionNombre && (
            <div>
              <strong>Versión:</strong> {ticket.versionNombre}
            </div>
          )}
          {ticket.nombre && (
            <div>
              <strong>Nombre:</strong> {ticket.nombre}
            </div>
          )}
          {ticket.descripcion && (
            <div>
              <strong>Descripción:</strong> {ticket.descripcion}
            </div>
          )}
        </div>
        <div className="space-y-3">
          {ticket.prioridad && (
            <div>
              <strong>Prioridad:</strong> {ticket.prioridad}
            </div>
          )}
          {ticket.severidad && (
            <div>
              <strong>Severidad:</strong> {ticket.severidad}
            </div>
          )}
          {ticket.categoria && (
            <div>
              <strong>Categoría:</strong> {ticket.categoria}
            </div>
          )}
          {ticket.estado && (
            <div>
              <strong>Estado:</strong> {ticket.estado}
            </div>
          )}
          {ticket.createdAt && (
            <div>
              <strong>Creado:</strong> {ticket.createdAt}
            </div>
          )}
        </div>
      </div>
  </Dialog>
}

export default PanelDetalleTicket
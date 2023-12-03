import { ticket } from '@/app/models/ticket'
import { formatearFecha } from '@/app/utils/formatearFecha'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import { allClientes } from '../../services/clientes/allClientes'
import { allColaboradores } from '../../services/colaboradores/allColaboradores'
import { cliente } from '@/app/models/cliente'
import { colaborador } from '@/app/models/colaborador'

interface Props {
    visible: boolean,
    onHide: () => void,
    ticket: ticket,
}

function fetchClientes() {
  return allClientes()
}

function fetchColaboradores() {
  return allColaboradores()
}

function PanelDetalleTicket({ visible, onHide, ticket }: Props) {

  const [cliente, setCliente] = useState<cliente>();
  const [colaborador, setColaborador] = useState<colaborador>();

  useEffect(() => {
    fetchClientes().then(data => {
      const clienteArr: cliente[] = data;
      clienteArr.forEach(c => (c.clientId === ticket.clienteId) && setCliente(c));
    })
    fetchColaboradores().then(data => {
      const clienteArr: colaborador[] = data;
      clienteArr.forEach(c => (c.colaboradorId === ticket.colaboradorId) && setColaborador(c));
    })
  },[]);

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
          {ticket.clienteId && (
            <div>
              <strong>Cliente:</strong> {cliente?.razonSocial}
            </div>
          )}
          {ticket.colaboradorId && (
            <div>
              <strong>Colaborador:</strong> {colaborador?.nombre}
            </div>
          )}
          {ticket.createdAt && (
            <div>
              <strong>Creado:</strong> {formatearFecha(ticket.createdAt)}
            </div>
          )}
        </div>
      </div>
  </Dialog>
}

export default PanelDetalleTicket
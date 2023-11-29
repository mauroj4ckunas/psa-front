import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ticket } from '../models/ticket';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';


const tickets: ticket[] = [
  {
      ticket_id: 1,
      cliente_id: 100,
      colaborador_id: 200,
      producto_id: 300,
      tarea_id: 400,
      nombre: "Problema con el servidor",
      descripcion: "El servidor no responde desde las 10 AM",
      prioridad: "Alta",
      severidad: "Crítica",
      categoria: "Infraestructura",
      estado: "Abierto",
      createdAt: null,
      updatedAt: null
  },
  {
      ticket_id: 2,
      cliente_id: 101,
      colaborador_id: 201,
      producto_id: 301,
      tarea_id: 401,
      nombre: "Error en la aplicación móvil",
      descripcion: "La app se cierra inesperadamente en algunos dispositivos",
      prioridad: "Media",
      severidad: "Moderada",
      categoria: "Software",
      estado: "En revisión",
      createdAt: null,
      updatedAt: null
  }
  // Puedes agregar más tickets aquí
];

function TablaTickets() {
  return <>
    <DataTable value={tickets} tableStyle={{ minWidth: '50rem' }}>
        <Column field="ticket_id" header="Id"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="prioridad" header="Prioridad"></Column>
        <Column field="proyecto" header="Proyecto"></Column>
    </DataTable>
  </>
}

export default TablaTickets;
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Link from 'next/link';
import { producto } from '../models/producto';
import DetallesProducto from './DetalleProducto';

function generarProductoAleatorio(): producto {
  const producto: producto = {
    producto_id: Math.floor(Math.random() * 1000), // Genera un ID aleatorio
    proyecto_id: Math.floor(Math.random() * 100), // Genera un ID de proyecto aleatorio
    version: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`, // Genera una versión aleatoria
    ticket_ids: Array.from({ length: Math.floor(Math.random() * 5) }, () => Math.floor(Math.random() * 100)), // Genera IDs de tickets aleatorios
    client_ids: Array.from({ length: Math.floor(Math.random() * 3) }, () => Math.floor(Math.random() * 50)), // Genera IDs de clientes aleatorios
    createdAt: new Date(), // Fecha actual como ejemplo (puede ser null si se desea)
    updatedAt: null, // Puede ser null si se desea
  };
  return producto;
}

function DetallesButton({ id }: { id: number }) {
  return (
    <Link href={`/producto/${id}`}>
      <a>Ver más</a>
    </Link>
  );
}

function DetallesCell(props: any) {
  const { rowData } = props;
  return <DetallesButton id={rowData.producto_id} />;
}


function TablaProductos() {

  const listaDeProductos: producto[] = [];

  for (let i = 0; i < 10; i++) {
    const nuevoProducto = generarProductoAleatorio();
    listaDeProductos.push(nuevoProducto);
  }

  return <>
    <DataTable value={listaDeProductos} tableStyle={{ minWidth: '50rem' }}>
      <Column field="producto_id" header="Producto ID"></Column>
      <Column field="proyecto_id" header="Proyecto ID"></Column>
      <Column field="version" header="Versión"></Column>
      <Column field="ticket_ids" header="Tickets"></Column>
      <Column field="client_ids" header="Clientes"></Column>
    </DataTable>
  </>
}

export default TablaProductos;
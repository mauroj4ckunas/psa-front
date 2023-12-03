'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Spinner } from '@/app/util/spinner';

async function fetchProyectos() {
    try {
        const res = await fetch("http://localhost:8080/proyecto");
        if (!res.ok) {
            throw new Error('Error al obtener proyectos');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error de solicitud:', error);
        return [];
    }
}

function ListaProyectos() {
    const router = useRouter();
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const obtenerProyectos = async () => {
        try {
          const proyectosData = await fetchProyectos();
          setProyectos(proyectosData);
        } finally {
          setLoading(false);
        }
      };
  
      obtenerProyectos();
    }, []); // ejecutar solo una vez al montar el componente
  
    const verDetalleProyecto = async (id) => {
      router.push('/proyecto/detalle?id=' + id);
    };
  
    const eliminarProyecto = (id) => {
      alert(id);
    };
  
    const accionesProyecto = (proyecto) => {
      return (

        <div className='w-3/4 flex justify-around items-center'>
          <div className='p-3 text-xl hover:text-cyan-500 cursor-pointer' onClick={async () => await verDetalleProyecto(proyecto.id)}><FaRegEdit /></div>
          <div className='p-3 text-xl hover:text-red-500 cursor-pointer' onClick={() => eliminarProyecto(proyecto.id)}><FaRegTrashAlt /></div>
        </div>
      );
    };
  
    return (
      <>
        {loading ? (
          <Spinner />
        ) : proyectos.length > 0 ? (
          <DataTable value={proyectos} tableStyle={{ minWidth: '50rem' }}>
            <Column field="nombre" className="font-bold" header="Nombre" body={(row) => (
              <div
                className="cursor-pointer hover:underline hover:text-blue-500"
                onClick={() => verDetalleProyecto(row.id)}
              >
                {row.nombre}
              </div>
            )}></Column>
            <Column field="descripcion" header="Descripción" body={(row) => row.descripcion.length > 50 ? `${row.descripcion.substring(0, 50)}...` : row.descripcion}></Column>
            <Column field="fechaInicio" header="Fecha Inicio"></Column>
            <Column field="fechaFin" header="Fecha Fin"></Column>
            <Column field="estado" header="Estado"></Column>
            <Column header="Líder" body={(row) => row.liderAsignado != null ? `${row.liderAsignado.nombre} ${row.liderAsignado.apellido}` : "-"}></Column>
            <Column header="Acciones" body={(row) => accionesProyecto(row)}></Column>
          </DataTable>
        ) : (
          <p>No hay proyectos disponibles.</p>
        )}
      </>
    );
  }
  
  export default ListaProyectos;
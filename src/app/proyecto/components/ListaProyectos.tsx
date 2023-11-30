'use client'
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'


async function ListaProyectos() {
    const router = useRouter()

    let proyectos = []

    await fetch("http://localhost:8080/proyecto")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            proyectos = data
        })

    const modificarProyecto = async (id) => {
        router.push('/proyecto/modificar?id=' + id);
    }

    const eliminarProyecto = (id) => {
        alert(id)
    }

    const accionesProyecto = (proyecto) => {
        return <div className='w-3/4 flex justify-around items-center'>
            <div className='p-3 text-xl hover:text-cyan-500 cursor-pointer' onClick={async () => await modificarProyecto(proyecto.id)}><FaRegEdit /></div>
            <div className='p-3 text-xl hover:text-red-500 cursor-pointer' onClick={() => eliminarProyecto(proyecto.id)}><FaRegTrashAlt /></div>
        </div>;
    };
    return <>
        <DataTable value={proyectos} tableStyle={{ minWidth: '50rem' }}>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="descripcion" header="Descripción"></Column>
            <Column field="fechaInicio" header="Fecha Inicio"></Column>
            <Column field="fechaFin" header="Fecha Fin"></Column>
            <Column field="estado.descripcion" header="Estado"></Column>
            <Column field="liderAsignadoId" header="Líder"></Column>
            <Column header="Acciones" body={(row) => accionesProyecto(row)}></Column>
        </DataTable>
    </>
}

export default ListaProyectos;
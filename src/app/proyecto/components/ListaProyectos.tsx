'use client'
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { proyecto } from '../models/proyecto';
import { Edit } from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material/Delete';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { Button } from 'primereact/button';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";


function ListaProyectos() {

    const proyectos: proyecto[] = [
        {
            id: 1,
            nombre: 'SCX',
            descripcion: 'Sistema Clientes X28',
            fechaInicio: new Date('2023-01-01').toISOString(),
            fechaFin: new Date('2024-01-01').toISOString(),
            estadoIdm: 1,
            liderId: 1
        },
        {
            id: 2,
            nombre: 'Boarding',
            descripcion: 'Sistema Boarding',
            fechaInicio: new Date('2023-02-02').toISOString(),
            fechaFin: new Date('2024-02-02').toISOString(),
            estadoIdm: 1,
            liderId: 2
        },
    ];

    const modificarProyecto = (id) => {
        alert(id)
    }
    
    const eliminarProyecto = (id) => {
        alert(id)
    }

    const accionesProyecto = (proyecto) => {
        return <div className='w-3/4 flex justify-around items-center'>
            <div className='p-3 text-xl hover:text-cyan-500 cursor-pointer'><FaRegEdit /></div>
            <div className='p-3 text-xl hover:text-red-500 cursor-pointer' onClick={() => eliminarProyecto(proyecto.id)}><FaRegTrashAlt /></div>
        </div>;
    };
    return <>
        <DataTable value={proyectos} tableStyle={{ minWidth: '50rem' }}>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="descripcion" header="Descripción"></Column>
            <Column field="fechaInicio" header="Fecha Inicio"></Column>
            <Column field="fechaFin" header="Fecha Fin"></Column>
            <Column field="estadoIdm" header="Estado"></Column>
            <Column field="liderId" header="Líder"></Column>
            <Column header="Acciones" body={(row) => accionesProyecto(row)}></Column>

        </DataTable>
    </>
}



// const actionBodyTemplate = async (rowData) => {
//     'use server';

//     return (
//         <React.Fragment>
//             <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => modificarProyecto(rowData)} />
//             <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => eliminarProyecto(rowData)} />
//         </React.Fragment>
//     );
// };

export default ListaProyectos;
'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Spinner } from '@/app/util/spinner';
import ConfirmarBajaModal from './confirmarBajaModal';
import SuccessToast from './successToast';
import ErrorToast from './errorToast';

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

const eliminarProyectoConfirmed = async (proyectoId, setShowModal, setProyectos, setShowSuccessToast, setShowErrorToast) => {
    try {
        const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if (!res.ok) {
            setShowErrorToast(true);
            setShowSuccessToast(false);
            throw new Error('Error al eliminar el proyecto');
        }

        setShowErrorToast(false);
        setShowSuccessToast(true);

        const proyectos = await fetchProyectos();
        setProyectos(proyectos);

    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
    } finally {
        setShowModal(false);
    }
};

function ListaProyectos() {
    const router = useRouter();
    const [proyectos, setProyectos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [proyectoToDelete, setProyectoToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

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

    const modificarProyecto = async (id) => {
        router.push('/proyecto/modificar?id=' + id);
    };

    const eliminarProyecto = (proyecto) => {
        setProyectoToDelete(proyecto.id);
        setShowModal(true);
    };

    const accionesProyecto = (proyecto) => {
        return (

            <div className='w-3/4 flex justify-around items-center'>
                <div className='p-3 text-xl hover:text-cyan-500 cursor-pointer' onClick={async () => await modificarProyecto(proyecto.id)}><FaRegEdit /></div>
                <div data-modal-target="popup-modal" data-modal-toggle="popup-modal" className='p-3 text-xl hover:text-red-500 cursor-pointer' onClick={() => eliminarProyecto(proyecto)}><FaRegTrashAlt /></div>
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : proyectos.length > 0 ? (
                <>
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

                    <SuccessToast showToast={showSuccessToast} hideToast={() => setShowSuccessToast(false)}></SuccessToast>
                    <ErrorToast showToast={showErrorToast} hideToast={() => setShowErrorToast(false)}></ErrorToast>

                    <ConfirmarBajaModal
                        showModal={showModal}
                        hideModal={() => setShowModal(false)}
                        onConfirm={() => eliminarProyectoConfirmed(proyectoToDelete, setShowModal, setProyectos, setShowSuccessToast, setShowErrorToast)}
                    />
                </>
            ) : (
                <p>No hay proyectos disponibles.</p>
            )}
        </>
    );
}

export default ListaProyectos;
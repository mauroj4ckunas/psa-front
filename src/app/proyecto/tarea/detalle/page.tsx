'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/util/spinner';
import { Button } from 'primereact/button';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmarBajaModal from '../../components/confirmarBajaModal';
import SuccessToast from '../../components/successToast';
import ErrorToast from '../../components/errorToast';

async function fetchTarea(proyectoId, tareaId) {
    const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}/tarea/${tareaId}`);
    if (!res.ok) {
        throw new Error('Error al obtener tarea');
    }
    const data = await res.json();
    console.log(data)

    return data;
}

const eliminarTareaConfirmed = async (proyectoId, tareaId, setShowModal, setShowSuccessToast, setShowErrorToast, volver) => {
    try {
        const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}/tarea/${tareaId}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });

        if (!res.ok) {
            setShowErrorToast(true);
            setShowSuccessToast(false);
            throw new Error('Error al eliminar la tarea');
        }

        setShowErrorToast(false);
        setShowSuccessToast(true);

        volver()

    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
    } finally {
        setShowModal(false);
    }
};

function DetalleTarea() {
    const router = useRouter();
    const [tarea, setTarea] = useState({});
    const [loading, setLoading] = useState(true); // Agregamos estado para controlar la carga
    const [showModal, setShowModal] = useState(false);
    const [tareaToDelete, setTareaToDelete] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const searchParams = useSearchParams();
    const proyectoId = searchParams.get('proyectoId');
    const tareaId = searchParams.get('tareaId');

    useEffect(() => {
        const obtenerTarea = async () => {
            try {
                const proyectoData = await fetchTarea(proyectoId, tareaId);
                setTarea(proyectoData);
            } catch (error) {
                console.error('Error al obtener tarea:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        if (proyectoId && tareaId) {
            obtenerTarea();
        }
    }, []);

    const volver = () => {
        router.push('/proyecto/detalle?id=' + proyectoId);
    };

    const modificarTarea = async () => {
        router.push(`/proyecto/tarea/modificar?proyectoId=${proyectoId}&tareaId=${tareaId}`);
    };

    const eliminarTarea = () => {
        setTareaToDelete(tareaId);
        setShowModal(true);
    };

    return (
        <>
            {loading ? (
                // Muestra el spinner mientras se cargan los datos
                <Spinner />
            ) : (
                // Muestra los datos cuando la carga ha terminado
                <>
                    <p className='mt-4 ms-4'>#{tareaId}</p>
                    <div className='flex justify-between items-center'>
                        <div className='text-2xl p-4'>
                            <h1>{tarea.descripcion}</h1>
                        </div>
                        <div>
                            <Button onClick={async () => await modificarTarea()} className="me-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                <FaRegEdit className="me-2" /> Editar
                            </Button>
                            <Button onClick={async () => await eliminarTarea()} className="me-4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                <FaRegTrashAlt className="me-2" /> Eliminar
                            </Button>
                        </div>
                    </div>

                    <hr />
                    <div className='m-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="font-bold block mb-2">Estado</label>
                            <p>{tarea.estado}</p>
                        </div>
                        <div>
                            <label className="font-bold block mb-2">Colaborador</label>
                            {tarea.colaboradorAsignado ? tarea.colaboradorAsignado.nombre + " " + tarea.colaboradorAsignado.apellido : "-"}
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Fecha Inicio</label>
                            {tarea.fechaInicio ? tarea.fechaInicio : "-"}
                        </div>
                        <div>
                            <label className="font-bold block mb-2">Fecha Fin</label>
                            {tarea.fechaFin ? tarea.fechaFin : "-"}
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Tickets asociados</label>
                            <p>MODIFICAR ACA #ID - DESCRIPCION TICKET</p>
                            <p>{tarea.ticketIds.length > 0 ? tarea.ticketIds.join(', ') : "-"}</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Volver</button>
                    </div>

                    <SuccessToast showToast={showSuccessToast} hideToast={() => setShowSuccessToast(false)}></SuccessToast>
                    <ErrorToast showToast={showErrorToast} hideToast={() => setShowErrorToast(false)}></ErrorToast>

                    <ConfirmarBajaModal
                        showModal={showModal}
                        hideModal={() => setShowModal(false)}
                        onConfirm={() => eliminarTareaConfirmed(proyectoId, tareaToDelete, setShowModal, setShowSuccessToast, setShowErrorToast, volver)}
                        message="¿Estás seguro que deseas borrar esta Tarea?"
                    />
                </>
            )}
        </>
    );
}
export default DetalleTarea;
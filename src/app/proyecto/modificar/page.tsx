'use client'
import { useSearchParams } from 'next/navigation'
import KanbanColumn from '../detalle/KanbanColumn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/util/spinner';

async function fetchProyecto(proyectoId) {
    const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}`);
    if (!res.ok) {
        throw new Error('Error al obtener proyecto');
    }
    const data = await res.json();
    return data;
}

async function fetchProyectoEstados() {
    const res = await fetch(`http://localhost:8080/proyecto/estados`);
    if (!res.ok) {
        throw new Error('Error al obtener estados de Proyecto');
    }
    const data = await res.json();
    return data;
}

async function fetchColaboradores() {
    const res = await fetch(`http://localhost:8080/colaborador`);
    if (!res.ok) {
        throw new Error('Error al obtener Colaboradores');
    }
    const data = await res.json();
    return data;
}

async function saveProyecto(proyecto) {
    var response;
    await fetch(`http://localhost:8080/proyecto/${proyecto.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(proyecto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar Proyecto');
        }
        response.json()
        alert("ok")
    } )
    .then(json => response = json )
    return response;
}

function ModificarProyecto() {
    const router = useRouter();
    const [proyecto, setProyecto] = useState({});
    const [proyectoEstados, setproyectoEstados] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);
    const [loading, setLoading] = useState(true); // Agregamos estado para controlar la carga
    const searchParams = useSearchParams();
    const proyectoId = searchParams.get('id');

    const handleNombreChange = (e) => {
        setProyecto({
            ...proyecto,
            nombre: e.target.value
        });
    };
    const handleDescripcionChange = (e) => {
        setProyecto({
            ...proyecto,
            descripcion: e.target.value
        });
    };
    const handleEstadoChange = (e) => {
        setProyecto({
            ...proyecto,
            estadoIdm: e.target.value
        });
    };
    const handleLiderChange = (e) => {
        const selectedLider = colaboradores.find(colaborador => colaborador.legajo == e.target.value);
        setProyecto({
            ...proyecto,
            liderId: selectedLider ? selectedLider.legajo : null,
            liderAsignado: selectedLider ? selectedLider : null,
        });
    };
    const handleFechaInicioChange = (e) => {
        setProyecto({
            ...proyecto,
            fechaInicio: e.target.value
        });
    };
    const handleFechaFinChange = (e) => {
        setProyecto({
            ...proyecto,
            fechaFin: e.target.value
        });
    };

    useEffect(() => {

        const obtenerProyecto = async () => {
            setLoading(true);
            try {
                const proyectoData = await fetchProyecto(proyectoId);
                setProyecto(proyectoData);
            } catch (error) {
                console.error('Error al obtener proyecto:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        const obtenerProyectoEstados = async () => {
            setLoading(true);
            try {
                const proyectoEstados = await fetchProyectoEstados();
                setproyectoEstados(proyectoEstados);
            } catch (error) {
                console.error('Error al obtener estados de Proyecto:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        const obtenerColaboradores = async () => {
            setLoading(true);
            try {
                const colaboradores = await fetchColaboradores();
                setColaboradores(colaboradores);
            } catch (error) {
                console.error('Error al obtener Colaboradores:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        if (proyectoId) {
            obtenerProyecto();
        }

        obtenerColaboradores();
        obtenerProyectoEstados();

    }, [proyectoId]);

    const volver = () => {
        // Navegar a la página de la lista de proyectos
        router.push('/proyecto');
    };

    const save = async () => {
        setLoading(true);
        try {
            await saveProyecto(proyecto);
        } catch (error) {
            console.error('Error al actualizar Proyecto:', error);
        } finally {
            setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
        }
    };


    return (
        <>
            {loading ? (
                // Muestra el spinner mientras se cargan los datos
                <Spinner />
            ) : (
                // Muestra los datos cuando la carga ha terminado
                <>
                    <div className='text-4xl p-4'>
                        <input type="text" onChange={handleNombreChange} className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" value={proyecto.nombre} />
                    </div>
                    <hr />
                    <div className='grid grid-cols-2 gap-20 p-4 mb-6'>
                        <div className='grid grid-cols-3'>
                            <div className='font-bold'>Descripcion</div>
                            <textarea onChange={handleDescripcionChange} className="col-span-2 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" rows="6" value={proyecto.descripcion}></textarea>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className='font-bold'>Estado</div>
                            <div className='col-span-2 md:w-2/3'>
                                <select
                                    onChange={handleEstadoChange}
                                    className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    value={proyecto.estadoIdm ? proyecto.estadoIdm : 0}
                                // onChange={(e) => setProyecto({ ...proyecto, estado: e.target.value })}
                                >
                                    <option value="0">Sin especificar</option>
                                    {proyectoEstados.map((estado) => (
                                        <option key={estado.idm} value={estado.idm}>
                                            {estado.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='font-bold'>Líder de Proyecto</div>
                            <div className='col-span-2 md:w-2/3'>
                                <select
                                    onChange={handleLiderChange}
                                    className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    value={proyecto.liderAsignado != null ? proyecto.liderAsignado.legajo : 0}
                                // onChange={(e) => setProyecto({ ...proyecto, estado: e.target.value })}
                                >
                                    <option value="0">Sin especificar</option>
                                    {colaboradores.map((colaborador) => (
                                        <option key={colaborador.legajo} value={colaborador.legajo}>
                                            {colaborador.nombre + " " + colaborador.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='font-bold'>Fecha Inicio</div>
                            <div className="col-span-2 md:w-2/3">
                                <input onChange={handleFechaInicioChange} type="date" className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" value={proyecto.fechaInicio} />
                            </div>
                            <div className='font-bold'>Fecha Fin</div>
                            <div className="col-span-2 md:w-2/3">
                                <input onChange={handleFechaFinChange} type="date" className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" value={proyecto.fechaFin} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='grid grid-cols-4 gap-4 p-4 mb-6'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <KanbanColumn key={index} estado={index + 1} tareas={proyecto.tareas} />
                        ))}
                    </div>
                    <div className='text-right'>
                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded-lg me-2" onClick={save}>Aceptar</button>
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Volver</button>
                    </div>
                </>
            )}
        </>
    );
}
export default ModificarProyecto;
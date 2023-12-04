'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/util/spinner';
import ErrorToast from '../../components/errorToast';
import SuccessToast from "../../components/successToast"


async function fetchTareaEstados() {
    const res = await fetch(`http://localhost:8080/tarea/estados`);
    if (!res.ok) {
        throw new Error('Error al obtener estados de Tarea');
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

async function saveTarea(proyectoId, tarea) {
    var response = {
        httpOk: true,
        body: {}
    };
    await fetch(`http://localhost:8080/proyecto/${proyectoId}/tarea`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            descripcion: tarea.descripcion ? tarea.descripcion : null,
            fechaInicio: tarea.fechaInicio,
            fechaFin: tarea.fechaFin,
            estadoIdm: tarea.estadoIdm ? tarea.estadoIdm : null,
            colaboradorAsignadoId: tarea.colaboradorAsignado ? tarea.colaboradorAsignado.legajo : null,
            ticketIds: tarea.ticketIds // SI PERMITIMOS ASOCIAR EN EL ALTA
        })
    })
        .then(res => {
            if (!res.ok) {
                response.httpOk = false;
            }
            return res.json()
        })
        .then(json => {
            if (json && !json.httpOk) response.body = json;
            else response.body = json.id;
        })
    return response;
}


function AltaTarea() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [tarea, setTarea] = useState({
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estadoIdm: 0,
        colaboradorAsignadoId: null,
        ticketIds: [] // SI PERMITIMOS ASOCIAR EN EL ALTA 
    });
    const [tareaEstados, setTareaEstados] = useState([]);
    const [colaboradores, setColaboradores] = useState([]);
    const [loading, setLoading] = useState(true); // Agregamos estado para controlar la carga
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const searchParams = useSearchParams();
    const proyectoId = searchParams.get('proyectoId');

    const handleDescripcionChange = (e) => {
        setTarea({
            ...tarea,
            descripcion: e.target.value
        });
    };
    const handleEstadoChange = (e) => {
        setTarea({
            ...tarea,
            estadoIdm: e.target.value
        });
    };
    const handleColaboradorChange = (e) => {
        const selectColaborador = colaboradores.find(colaborador => colaborador.legajo == e.target.value);
        setTarea({
            ...tarea,
            colaboradorAsignadoId: selectColaborador ? selectColaborador.legajo : null,
            colaboradorAsignado: selectColaborador ? selectColaborador : null,
        });
    };
    const handleFechaInicioChange = (e) => {
        setTarea({
            ...tarea,
            fechaInicio: e.target.value
        });
    };
    const handleFechaFinChange = (e) => {
        setTarea({
            ...tarea,
            fechaFin: e.target.value
        });
    };
    const handleTicketIdsChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
        setTarea({
            ...tarea,
            ticketIds: selectedValues
        });
      };

    useEffect(() => {

        const obtenerTareaEstados = async () => {
            try {
                setLoading(true);
                const tareaEstados = await fetchTareaEstados();
                setTareaEstados(tareaEstados);
            } catch (error) {
                console.error('Error al obtener estados de Tarea:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        const obtenerColaboradores = async () => {
            try {
                setLoading(true);
                const colaboradores = await fetchColaboradores();
                setColaboradores(colaboradores);
            } catch (error) {
                console.error('Error al obtener Colaboradores:', error);
            } finally {
                setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
            }
        };

        obtenerColaboradores();
        obtenerTareaEstados();


    }, []);

    const volver = () => {
        // Navegar a la página de la lista de proyectos
        router.push('/proyecto/detalle?id=' + proyectoId);
    };

    const save = async () => {
        setLoading(true);
        setErrors({});
        await saveTarea(proyectoId, tarea)
            .then((res) => {
                if (res && !res.httpOk) {
                    setErrors(res.body);
                    setShowSuccessToast(false);
                    setShowErrorToast(true);
                }
                else {
                    setShowSuccessToast(true);
                    setShowErrorToast(false);
                    setTimeout(() => {
                        router.push('/proyecto/detalle?id=' + proyectoId); // NAVEGAR A DETALLE DE TAREA ¿?¿?
                      }, 1500);
                }
            })
        setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
    };


    return (
        <>
            {loading ? (
                // Muestra el spinner mientras se cargan los datos
                <Spinner />
            ) : (
                // Muestra los datos cuando la carga ha terminado
                <>
                    <h4 className="text-3xl font-bold ms-4">Nueva Tarea</h4>
                    {/* ID DE TAREA EN MODIFICACION */}
                    <div className='text-2xl p-4'>
                        <input placeholder='Ingrese Descripción de la Tarea' type="text" onChange={handleDescripcionChange} className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" value={tarea.descripcion} />
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.descripcion}</p>
                    </div>
                    <hr />
                    <div className='m-4 grid grid-cols-2 gap-4'>
                        <div>
                            <label className="font-bold block mb-2">Estado</label>
                            <select
                                onChange={handleEstadoChange}
                                className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                value={tarea.estadoIdm ? tarea.estadoIdm : undefined}
                            >
                                <option value="0">Sin especificar</option>
                                {tareaEstados.map((estado) => (
                                    <option key={estado.idm} value={estado.idm}>
                                        {estado.descripcion}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.estado}</p>
                        </div>
                        <div>
                            <label className="font-bold block mb-2">Colaborador</label>
                            <select
                                onChange={handleColaboradorChange}
                                className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                value={tarea.colaboradorAsignado != null ? tarea.colaboradorAsignado.legajo : 0}
                            >
                                <option value="0">Sin especificar</option>
                                {colaboradores.map((colaborador) => (
                                    <option key={colaborador.legajo} value={colaborador.legajo}>
                                        {colaborador.nombre + " " + colaborador.apellido}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.colaboradorAsignadoId}</p>
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Fecha Inicio</label>
                            <input
                                onChange={handleFechaInicioChange}
                                type="date"
                                className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                value={tarea.fechaInicio}
                            />
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fechaInicio}</p>
                        </div>
                        <div>
                            <label className="font-bold block mb-2">Fecha Fin</label>
                            <input
                                onChange={handleFechaFinChange}
                                type="date"
                                className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                value={tarea.fechaFin}
                            />
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fechaFin}</p>
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Tickets asociados</label>
                            <select multiple
                                className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                value={tarea.ticketIds}
                                onChange={handleTicketIdsChange}
                            >
                                <option value="1">#1 DESCRIPCION TICKET 1</option>
                                <option value="2">#2 DESCRIPCION TICKET 2</option>
                                <option value="3">#3 DESCRIPCION TICKET 3</option>
                                <option value="4">#4 DESCRIPCION TICKET 4</option>
                            </select>
                        </div>
                    </div>

                    <div className='text-right'>
                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded-lg me-2" onClick={save}>Aceptar</button>
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Cancelar</button>
                    </div>
                    <SuccessToast showToast={showSuccessToast} hideToast={() => setShowSuccessToast(false)}></SuccessToast>
                    <ErrorToast showToast={showErrorToast} hideToast={() => setShowErrorToast(false)}></ErrorToast>
                </>
            )}
        </>
    );
}
export default AltaTarea;
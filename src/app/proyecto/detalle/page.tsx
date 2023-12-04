'use client'
import { useSearchParams } from 'next/navigation'
import KanbanColumn from './KanbanColumn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/util/spinner';
import { Button } from 'primereact/button';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmarBajaModal from '../components/confirmarBajaModal';
import SuccessToast from '../components/successToast';
import ErrorToast from '../components/errorToast';

async function fetchProyecto(proyectoId) {
  const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}`);
  if (!res.ok) {
    throw new Error('Error al obtener proyecto');
  }
  const data = await res.json();
  return data;
}

const eliminarProyectoConfirmed = async (proyectoId, setShowModal, setShowSuccessToast, setShowErrorToast, volver) => {
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

    volver()

  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
  } finally {
    setShowModal(false);
  }
};

function DetalleProyecto() {
  const router = useRouter();
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true); // Agregamos estado para controlar la carga
  const [showModal, setShowModal] = useState(false);
  const [proyectoToDelete, setProyectoToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get('id');

  useEffect(() => {
    const obtenerProyecto = async () => {
      try {
        const proyectoData = await fetchProyecto(proyectoId);

        setProyecto(proyectoData);
      } catch (error) {
        console.error('Error al obtener proyecto:', error);
      } finally {
        setLoading(false); // Indicamos que la carga ha terminado, independientemente del resultado
      }
    };

    if (proyectoId) {
      obtenerProyecto();
    }
  }, [proyectoId]);

  
  const eliminarProyecto = (proyecto) => {
    setProyectoToDelete(proyecto.id);
    setShowModal(true);
  };
  
  const volver = () => {
    // Navegar a la página de la lista de proyectos
    router.push('/proyecto');
  };

  const modificarProyecto = async (id) => {
    router.push('/proyecto/modificar?id=' + id);
  };

  const agregarTarea = async (proyectoId) => {
    router.push('tarea/alta?proyectoId=' + proyectoId)
  }

  return (
    <>
      {loading ? (
        // Muestra el spinner mientras se cargan los datos
        <Spinner />
      ) : (
        // Muestra los datos cuando la carga ha terminado
        <>
          <div className='flex justify-between items-center'>
            <div className='text-4xl p-4'>
              {proyecto.nombre}
            </div>
            <div>
              <Button onClick={async () => await modificarProyecto(proyecto.id)} className="me-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <FaRegEdit className="me-2" /> Editar
              </Button>
              <Button onClick={async () => await eliminarProyecto(proyecto)} className="me-4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                <FaRegTrashAlt className="me-2" /> Eliminar
              </Button>
            </div>

          </div>

          <hr />
          <div className='grid grid-cols-2 gap-20 p-4 mb-6'>
            <div className='grid grid-cols-3'>
              <div className='font-bold'>Descripcion</div>
              <textarea disabled className='col-span-2' rows="6" value={proyecto.descripcion}></textarea>
            </div>
            <div className='grid grid-cols-3'>
              <div className='font-bold'>Estado</div>
              <div className='col-span-2'>{proyecto.estado}</div>
              <div className='font-bold'>Líder de Proyecto</div>
              <div className='col-span-2'>{proyecto.liderAsignado != null ? proyecto.liderAsignado.nombre + " " + proyecto.liderAsignado.apellido : "-"}</div>
              <div className='font-bold'>Fecha Inicio</div>
              <div className='col-span-2'>{proyecto.fechaInicio}</div>
              <div className='font-bold'>Fecha Fin</div>
              <div className='col-span-2'>{proyecto.fechaFin}</div>
            </div>
          </div>
          <hr />
          <div className='mt-4 text-right'>
            <Button onClick={async () => await agregarTarea(proyecto.id)} className="me-4 mb-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              + Nueva Tarea
            </Button>
          </div>
          {proyecto.tareas && proyecto.tareas.length > 0 ? (
            <div className='grid grid-cols-4 gap-4 p-4 mb-6'>
              {Array.from({ length: 4 }).map((_, index) => (
                <KanbanColumn key={index} estado={index + 1} tareas={proyecto.tareas} proyectoId={proyecto.id} />
              ))}
            </div>
          ) : (
            <div className=" text-center p-4 mb-4 text-m text-yellow-800 rounded-lg bg-yellow-50" role="alert">
              Aún no existen tareas para este proyecto
            </div>
          )}
          <div className='text-right'>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Volver</button>
          </div>

          <SuccessToast showToast={showSuccessToast} hideToast={() => setShowSuccessToast(false)}></SuccessToast>
          <ErrorToast showToast={showErrorToast} hideToast={() => setShowErrorToast(false)}></ErrorToast>

          <ConfirmarBajaModal
            showModal={showModal}
            hideModal={() => setShowModal(false)}
            onConfirm={() => eliminarProyectoConfirmed(proyectoToDelete, setShowModal, setShowSuccessToast, setShowErrorToast, volver)}
            message="¿Estás seguro que deseas borrar este Proyecto? Se eliminarán también todas las Tareas asociadas al mismo."
          />
        </>
      )}
    </>
  );
}
export default DetalleProyecto;
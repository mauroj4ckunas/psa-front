'use client'
import { useSearchParams } from 'next/navigation'
import KanbanColumn from './KanbanColumn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/app/util/spinner';
import { Button } from 'primereact/button';
import { FaRegEdit } from "react-icons/fa";

async function fetchProyecto(proyectoId) {
  const res = await fetch(`http://localhost:8080/proyecto/${proyectoId}`);
  if (!res.ok) {
    throw new Error('Error al obtener proyecto');
  }
  const data = await res.json();
  return data;
}

function DetalleProyecto() {
  const router = useRouter();
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true); // Agregamos estado para controlar la carga
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

  const volver = () => {
    // Navegar a la página de la lista de proyectos
    router.push('/proyecto');
  };

  const modificarProyecto = async (id) => {
    router.push('/proyecto/modificar?id=' + id);
  };


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
    <Button onClick={async () => await modificarProyecto(proyecto.id)} className="me-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    <FaRegEdit className="me-2" /> Editar
    </Button>
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
              <div className='col-span-2'>{proyecto.liderAsignado != null ? proyecto.liderAsignado.nombre + " " + proyecto.liderAsignado.apellido : null}</div>
              <div className='font-bold'>Fecha Inicio</div>
              <div className='col-span-2'>{proyecto.fechaInicio}</div>
              <div className='font-bold'>Fecha Fin</div>
              <div className='col-span-2'>{proyecto.fechaFin}</div>
            </div>
          </div>
          <hr />
          <div className='grid grid-cols-4 gap-4 p-4 mb-6'>
            {Array.from({ length: 4 }).map((_, index) => (
              <KanbanColumn key={index} estado={index + 1} tareas={proyecto.tareas} />
            ))}
          </div>
          <div className='text-right'>
            <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Volver</button>
          </div>
        </>
      )}
    </>
  );
}
export default DetalleProyecto;
'use client'
import { useSearchParams } from 'next/navigation'
import KanbanColumn from './KanbanColumn';
import { useRouter } from 'next/navigation';

async function DetalleProyecto() {
  const router = useRouter();

  const volver = () => {
    // Navegar a la página de la lista de proyectos
    router.push('/proyecto');
  };
  const searchParams = useSearchParams()

  var proyectoId = searchParams.get('id');
  var proyecto = {};
  await fetch("http://localhost:8080/proyecto/" + proyectoId)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)
      proyecto = data;
    })


  return (
    <>
      <div className='text-4xl p-4'>
        {proyecto.nombre}
      </div>
      <hr />
      <div className='grid grid-cols-2 gap-20 p-4 mb-6'>
        <div className='grid grid-cols-3'>
          <div className='font-bold'>Descripcion</div>
          <textarea disabled className='col-span-2' rows="6">{proyecto.descripcion}</textarea>
        </div>
        <div className='grid grid-cols-3'>
          <div className='font-bold'>Estado</div>
          <div className='col-span-2'>{proyecto.estado}</div>
          <div className='font-bold'>Líder de Proyecto</div>
          <div className='col-span-2'>{proyecto.liderAsignado.nombre + " " + proyecto.liderAsignado.apellido}</div>
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
        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={volver}>Volver</button>
      </div>
    </>
  );

}

export default DetalleProyecto;
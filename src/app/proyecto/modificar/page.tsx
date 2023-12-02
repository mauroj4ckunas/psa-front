'use client'
import { useSearchParams } from 'next/navigation'
import KanbanColumn from './KanbanColumn'; 

async function ModificarProyecto() {

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
    </>
  );

}

export default ModificarProyecto;
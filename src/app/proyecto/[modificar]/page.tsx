'use client'
import { useSearchParams } from 'next/navigation'

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
      <h1>{proyecto.nombre}</h1>
      <h1>{proyecto.descripcion}</h1>
      <h1>{proyecto.estado.descripcion}</h1>
      {/* Mostrar otros detalles del proyecto según tu estructura de datos */}
    </>
  );

}

export default ModificarProyecto;
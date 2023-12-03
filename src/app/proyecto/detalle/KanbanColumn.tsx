import React from 'react';

function KanbanColumn({ estado, tareas }) {
    // Verificar si tareas está definido
    if (!tareas) {
        return null; // O cualquier otro manejo que desees, como un mensaje indicando que no hay tareas
    }

    const tareasEnColumna = tareas.filter((tarea) => tarea.estadoIdm === estado);
    return (
        <div className={`flex flex-col p-4 border rounded ${getBorderColor(estado)}`}>
          <div className='font-bold mb-2 text-center'>
            {estado === 1 && 'Nueva'}
            {estado === 2 && 'En Curso'}
            {estado === 3 && 'Terminada'}
            {estado === 4 && 'En Espera'}
          </div>
          {tareasEnColumna.map((tarea) => (
            <div key={tarea.id} className="mb-4 block max-w-sm p-6 bg-white border border-gray-50 rounded-lg shadow hover:bg-gold-100 dark:bg-yellow-100 dark:border-gray-700 dark:hover:bg-yellow-200">
              <p>#{tarea.id}</p>
              <h3 className="text-2lg font-bold">{tarea.descripcion}</h3>
              <p className="font-normal text-gray-700">{tarea.colaboradorAsignado ? tarea.colaboradorAsignado.nombre + " " +tarea.colaboradorAsignado.apellido : ""}</p>
            </div>
          ))}
        </div>
    );
}

export default KanbanColumn;

function getBorderColor(estado) {
    switch (estado) {
      case 1:
        return 'border-nueva'; // Puedes definir estilos para 'border-nueva' en tu hoja de estilos
      case 2:
        return 'border-en-curso';
      case 3:
        return 'border-terminada';
      case 4:
        return 'border-en-espera';
      default:
        return 'border-default';
    }
}

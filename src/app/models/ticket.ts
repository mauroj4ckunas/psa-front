import { tarea } from "./tarea";

export type ticket = {
    ticketId: number;
    versionNombre: string | null;
    nombre: string | null;
    descripcion: string | null;
    prioridad: string | null;
    severidad: string | null;
    categoria: string | null;
    estado: string | null;
    clienteId: number | null;
    colaboradorId: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    tareas: tarea[] | null;
}
import { ticket } from "./ticket";

export type tarea = {
    id: number;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    estadoIdm: number;
    estado: string;
    colaboradorAsignado: null | string;
    ticketIds: number[];
}
import { ticket } from "./ticket";

export type colaborador = {
    colaboradorId: number;
    nombre: string;
    legajo: number;
    tickets: ticket[];
    createdAt: string;
    updatedAt: string;
}
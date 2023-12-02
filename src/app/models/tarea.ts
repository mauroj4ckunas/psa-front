import { ticket } from "./ticket";

export type tarea = {
    tareaId: number,
    tareaIdRemoto: number,
    tickets: ticket[],
    createdAt: string;
    updatedAt: string;
}
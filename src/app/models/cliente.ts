import { ticket } from "./ticket";

export type cliente = {
    clientId: number;
    razonSocial: string;
    tickets: ticket[];
    createdAt: string;
    updatedAt: string;
    cuit: string;
}
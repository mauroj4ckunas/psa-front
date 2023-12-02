import { ticket } from "./ticket";

export type version = {
    productoVersionId: number;
    version: string;
    tickets: ticket[];
    createdAt: string;
    updatedAt: string;
}
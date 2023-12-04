import { version } from "./version";

export type producto = {
    productoId: number;
    nombre: string;
    versiones: version[];
    createdAt: string;
    updatedAt: string;
}
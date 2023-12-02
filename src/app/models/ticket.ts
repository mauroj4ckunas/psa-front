
export type ticket = {
    ticketId: number;
    productoVersionId: number;
    nombre: string;
    descripcion: string;
    prioridad: string;
    severidad: string;
    categoria: string;
    estado: string;
    clienteId: number;
    colaboradorId: number;
    createdAt: string; // o Date si prefieres manejarlo como objeto Date
    updatedAt: string; // o Date si prefieres manejarlo como objeto Date
    tareaIds: number[];
}
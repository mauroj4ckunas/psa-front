
export type ticket = {
    ticket_id: number;
    producto_id: number;
    nombre: string;
    descripcion: string | null;
    prioridad: string;
    severidad: string;
    categoria: string;
    estado: string;
    tarea_id: number | null;
    cliente_id: number | null;
    colaborador_id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}
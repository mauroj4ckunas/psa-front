export type producto = {
    producto_id: number;
    proyecto_id: number;
    version: string;
    ticket_ids: number[];
    client_ids: number[];
    createdAt: Date | null;
    updatedAt: Date | null;
}
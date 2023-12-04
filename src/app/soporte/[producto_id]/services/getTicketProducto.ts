import { badRequest } from "@/app/models/badRequest";
import { ticket } from "../../../models/ticket";

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

export async function getTicketProducto(productoId: number): Promise<ticket[] | badRequest> {
    const url = `${url_base}/tickets/producto/${productoId}`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
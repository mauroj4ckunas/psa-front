
import { badRequest } from "@/app/models/badRequest";
import { ticket } from "../../models/ticket";

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

export async function allTickets(producto_id: number): Promise<ticket[] | badRequest> {
    const url = `${url_base}/tickets/producto=${producto_id}`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
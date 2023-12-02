import { badRequest } from "@/app/models/badRequest";
import { version } from "@/app/models/version";

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

export async function getVersiones(productoId: number): Promise<version[] | badRequest> {
    const url = `${url_base}/productos/${productoId}/versiones`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
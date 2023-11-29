import { badRequest } from "@/app/models/badRequest";
import { producto } from "../../models/producto";

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

export async function allProductos(): Promise<producto[] | badRequest> {
    const url = `${url_base}/productos`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
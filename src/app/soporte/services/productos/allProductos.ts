import { badRequest } from "@/app/models/badRequest";
import { producto } from "../../../models/producto";

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

export async function allProductos(): Promise<producto[] | badRequest> {
    const url = `https://deploy-java-17.onrender.com/soporte/productos`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
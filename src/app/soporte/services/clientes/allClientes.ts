import { cliente } from "@/app/models/cliente";

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

export async function allClientes(): Promise<cliente[]> {
    const url = `${url_base}/clientes`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
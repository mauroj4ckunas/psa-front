import { colaborador } from "@/app/models/colaborador";

const url_base = `${process.env.NEXT_PUBLIC_URL_BASE}`

export async function allClientes(): Promise<colaborador[]> {
    const url = `${url_base}/colaboradores`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
import { cliente } from "@/app/models/cliente";

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

export async function allClientes(): Promise<cliente[]> {
    const url = `https://deploy-java-17.onrender.com/soporte/clientes`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
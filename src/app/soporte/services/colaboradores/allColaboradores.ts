import { colaborador } from "@/app/models/colaborador";

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

export async function allColaboradores(): Promise<colaborador[]> {
    const url = `https://deploy-java-17.onrender.com/soporte/colaboradores`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
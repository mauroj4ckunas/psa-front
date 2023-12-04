import { badRequest } from "@/app/models/badRequest";
import { tarea } from "../../../models/tarea";

const url_base = `${process.env.NEXT_PUBLIC_URL_SOPORTE}`

export async function getTareasDisponibles(): Promise<tarea[]> {
    const url = `https://api-proyectos-wp7y.onrender.com/tarea`
    return fetch(url, { method: 'GET' })
            .then(res => res.json())
}
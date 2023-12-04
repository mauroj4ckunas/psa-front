
export const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
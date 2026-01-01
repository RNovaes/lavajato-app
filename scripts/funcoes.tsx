
export function fmTime(valor: Date) {

    if (!valor) return "";
    return valor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

}

export function formatarHora(date: Date | undefined) {
    if (!date) return null;
    const d = new Date(date);
    const horas = String(d.getHours()).padStart(2, "0");
    const minutos = String(d.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
};

export function fmTime(valor: Date) {

    if (!valor) return "";
    return valor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

}

export function formatarHorario(abertura: string | null, fechamento: string | null) {
    if (!abertura || !fechamento) return 'Fechado';
    return `${abertura} - ${fechamento}`;
}

export function formatarHora(date: Date | undefined) {
    if (!date) return null;
    const d = new Date(date);
    const horas = String(d.getHours()).padStart(2, "0");
    const minutos = String(d.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
};

export function calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) {
    const R = 6371; // raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function estaAberto(
    dias: string[],
    horarios: {
        domingo?: { abertura?: string | null; fechamento?: string | null };
        sabado?: { abertura?: string | null; fechamento?: string | null };
        semana?: { abertura?: string | null; fechamento?: string | null };
    }
): boolean {
    if (!dias || !horarios) return false;

    const agora = new Date();
    const diaJS = agora.getDay(); // 0=Dom, 6=Sab
    const horaAtual = agora.getHours() * 60 + agora.getMinutes();

    const mapaDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const diaHoje = mapaDias[diaJS];

    // 🚫 Não funciona hoje
    if (!dias.includes(diaHoje)) return false;

    let abertura: string | null | undefined;
    let fechamento: string | null | undefined;

    if (diaJS === 0) {
        abertura = horarios.domingo?.abertura;
        fechamento = horarios.domingo?.fechamento;
    } else if (diaJS === 6) {
        abertura = horarios.sabado?.abertura;
        fechamento = horarios.sabado?.fechamento;
    } else {
        abertura = horarios.semana?.abertura;
        fechamento = horarios.semana?.fechamento;
    }

    if (!abertura || !fechamento) return false;

    const [hA, mA] = abertura.split(':').map(Number);
    const [hF, mF] = fechamento.split(':').map(Number);

    const minutosAbertura = hA * 60 + mA;
    const minutosFechamento = hF * 60 + mF;

    return horaAtual >= minutosAbertura && horaAtual <= minutosFechamento;
}

export function calcularMinutos({ horas, minutos }: any) {
    const h = parseInt(horas || '0', 10);
    const m = parseInt(minutos || '0', 10);
    return h * 60 + m;
}
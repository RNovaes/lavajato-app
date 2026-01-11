
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

export function valorParaReal(valor: any) {

    const v = valor

    return v.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

}

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

export function validarCPF(cpf: string) {
    const value = cpf.replace(/\D/g, '');

    if (value.length !== 11) return false;

    // Bloqueia CPFs repetidos
    if (/^(\d)\1+$/.test(value)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(value.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(value.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(value.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(value.substring(10, 11))) return false;

    return true;
}

export function validarCNPJ(cnpj: string) {
    const value = cnpj.replace(/\D/g, '');

    if (value.length !== 14) return false;

    // Bloqueia CNPJs repetidos
    if (/^(\d)\1+$/.test(value)) return false;

    let tamanho = value.length - 2;
    let numeros = value.substring(0, tamanho);
    let digitos = value.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = value.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
}

export function validarCpfCnpj(valor: string) {
    const v = valor.replace(/\D/g, '');

    if (v.length === 11) return validarCPF(v);
    if (v.length === 14) return validarCNPJ(v);

    return false;
}

export function validarTelefone(telefone: string) {
    const valor = telefone.replace(/\D/g, '');

    // Com DDD → 10 (fixo) ou 11 (celular)
    if (valor.length !== 10 && valor.length !== 11) return false;

    // Bloqueia números repetidos
    if (/^(\d)\1+$/.test(valor)) return false;

    // DDD válido
    const ddd = parseInt(valor.substring(0, 2));
    if (ddd < 11 || ddd > 99) return false;

    // Celular (11 dígitos) precisa começar com 9
    if (valor.length === 11 && valor.charAt(2) !== '9') return false;

    return true;
}
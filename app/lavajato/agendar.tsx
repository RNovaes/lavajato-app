
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card, PrimaryButton, ChipCust } from '@/components/componentes';
import { calcularMinutos } from '@/scripts/funcoes';

const dadosLavaJato = {
    nome: 'Lava Jato Central',
    capacidade: 2,
    horarios: {
        semana: { abertura: '09:15', fechamento: '18:15' },
        sabado: { abertura: '09:16', fechamento: '14:16' },
        domingo: { abertura: null, fechamento: null },
    },
    tempoVeiculo: {
        Sedan: { horas: '2', minutos: '30' },
        Hatch: { horas: '1', minutos: '30' },
        Suv: { horas: '3', minutos: '00' },
    },
    veiculos: ['Sedan', 'Hatch', 'Suv'],
};

function duracaoVeiculo(tempoVeiculo: any, tipo: string) {
    const t = tempoVeiculo[tipo];
    return Number(t.horas) * 60 + Number(t.minutos);
}

function gerarHorarios(data: Date, dados: any, veiculo: string) {
    const dia = data.getDay();
    let horario;

    if (dia === 0) horario = dados.horarios.domingo;
    else if (dia === 6) horario = dados.horarios.sabado;
    else horario = dados.horarios.semana;

    if (!horario?.abertura || !horario?.fechamento) return [];

    const duracao = duracaoVeiculo(dados.tempoVeiculo, veiculo);

    const [ha, ma] = horario.abertura.split(':').map(Number);
    const [hf, mf] = horario.fechamento.split(':').map(Number);

    let inicio = ha * 60 + ma;
    const fim = hf * 60 + mf;

    const slots = [];

    while (inicio + duracao <= fim) {
        slots.push({
            inicio: calcularMinutos(inicio),
            fim: calcularMinutos(inicio + duracao),
        });
        inicio += 30;
    }

    return slots;
}

export default function AgendarLavaJato() {
    const [veiculo, setVeiculo] = useState<string | null>(null);
    const [data, setData] = useState(new Date());
    const [mostrarData, setMostrarData] = useState(false);
    const [horario, setHorario] = useState<any>(null);

    const horariosDisponiveis = useMemo(() => {
        if (!veiculo) return [];
        return gerarHorarios(data, dadosLavaJato, veiculo);
    }, [data, veiculo]);

    function confirmar() {
        console.log({
            veiculo,
            data,
            horario,
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* Nome */}
                <Text style={{ fontSize: 22, fontWeight: '700' }}>
                    {dadosLavaJato.nome}
                </Text>

                {/* VEÍCULO */}
                <Card title="Selecione o veículo">
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {dadosLavaJato.veiculos.map(v => (
                            <ChipCust
                                key={v}
                                label={v}
                                active={veiculo === v}
                                onPress={() => {
                                    setVeiculo(v);
                                    setHorario(null);
                                }}
                            />
                        ))}
                    </View>
                </Card>

                {/* DATA */}
                <Card title="Selecione a data">
                    <TouchableOpacity onPress={() => setMostrarData(true)}>
                        <Text style={{ fontSize: 16 }}>
                            {data.toLocaleDateString('pt-BR')}
                        </Text>
                    </TouchableOpacity>
                </Card>

                {mostrarData && (
                    <DateTimePicker
                        value={data}
                        mode="date"
                        display="calendar"
                        onChange={(_, selected) => {
                            setMostrarData(false);
                            if (selected) setData(selected);
                        }}
                    />
                )}

                {/* HORÁRIOS */}
                {veiculo && (
                    <Card title="Horários disponíveis">
                        {horariosDisponiveis.length === 0 && (
                            <Text>Nenhum horário disponível</Text>
                        )}

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {horariosDisponiveis.map(h => (
                                <ChipCust
                                    key={h.inicio}
                                    label={`${h.inicio} - ${h.fim}`}
                                    active={horario?.inicio === h.inicio}
                                    onPress={() => setHorario(h)}
                                />
                            ))}
                        </View>
                    </Card>
                )}

                {/* CONFIRMAR */}
                <PrimaryButton
                    label="Confirmar agendamento"
                    disabled={!veiculo || !horario}
                    onPress={confirmar}
                />
            </ScrollView>
        </SafeAreaView>
    );
}


import { theme } from '@/components/theme'
import dayjs from 'dayjs'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import lavajatoStyle from './lavajato.style'

export default function agendar() {

  // DADOS VINDO DA PAGINA SERVICOS

  const { servicos } = useLocalSearchParams<{
    servicos?: string;
  }>();

  const listaServicos = servicos
    ? JSON.parse(servicos)
    : [];

  console.log(listaServicos);

  // DADOS MOCK LAVAJATO E AGENDA ===========================================================

  const lavaJato = {
    capacidade: 2,
    dias: ["Qua", "Qui", "Sex", "Sab", "Dom"],
    horarios: {
      domingo: { abertura: '09:00', fechamento: '14:00' },
      sabado: { abertura: '09:00', fechamento: '17:00' },
      semana: { abertura: '08:00', fechamento: '19:00' },
    },
    imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
  }

  const [agendamentos, setAgendamentos] = useState([
    {
      id: '1',
      data: '2026-01-16',
      inicio: '09:00',
      duracao: 60,
      time: 'A',
    },
    {
      id: '2',
      data: '2026-01-16',
      inicio: '10:00',
      duracao: 90,
      time: 'B',
    },
    {
      id: '3',
      data: '2026-01-16',
      inicio: '14:00',
      duracao: 60,
      time: 'A',
    },
    {
      id: '4',
      data: '2026-01-17',
      inicio: '14:30',
      duracao: 90,
      time: 'A',
    },
    {
      id: '5',
      data: '2026-01-17',
      inicio: '16:00',
      duracao: 60,
      time: 'B',
    }
  ])

  // DURACAO DO SERVICO ESCOLHIDO NA PAGINA DE SERVICOS ===================================

  const duracaoTotal = useMemo(() => {
    return listaServicos.reduce(
      (total: number, servico: any) => total + servico.duracao,
      0
    )
  }, [listaServicos])

  //DIAS GERADOS =========================================================================

  const [dataSelecionada, setDataSelecionada] = useState(new Date())
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null)
  const times = ['A', 'B']
  const [timeSelecionado, setTimeSelecionado] = useState('A')

  function transformandoDatas(date: Date) {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return dias[date.getDay()];
  }

  function lavaJatoAbreNesseDia(
    lavaJatoDias: string[],
    dataSelecionada: Date
  ) {
    const dia = transformandoDatas(dataSelecionada);
    return lavaJatoDias.includes(dia);
  }

  function gerarDiasCalendario(dias = 7) {
    const hoje = new Date();
    const datas: Date[] = [];

    for (let i = 0; i < dias; i++) {
      const novaData = new Date(hoje);
      novaData.setDate(hoje.getDate() + i);
      datas.push(novaData);
    }

    return datas;
  }

  const diasCalendario = gerarDiasCalendario().filter(data =>
    lavaJatoAbreNesseDia(lavaJato.dias, data)
  );

  // HORARIOS GERADOS =====================================================================

  function tipoDeDia(date: Date) {
    const dia = date.getDay()
    if (dia === 0) return 'domingo'
    if (dia === 6) return 'sabado'
    return 'semana'
  }

  function gerarHorarios(
    abertura: string,
    fechamento: string,
    intervalo = 30 // minutos
  ) {
    const horarios: string[] = []

    let atual = dayjs(`2024-01-01 ${abertura}`, 'YYYY-MM-DD HH:mm')
    const fim = dayjs(`2024-01-01 ${fechamento}`, 'YYYY-MM-DD HH:mm')

    while (atual.isBefore(fim)) {
      horarios.push(atual.format('HH:mm'))
      atual = atual.add(intervalo, 'minute')
    }

    return horarios
  }

  const horariosDisponiveis = useMemo(() => {
    const tipo = tipoDeDia(dataSelecionada)
    const { abertura, fechamento } = lavaJato.horarios[tipo]

    let base = gerarHorarios(abertura, fechamento, 30)

    base = base.filter(h => !horarioJaPassou(dataSelecionada, h))

    const agendamentosDoDia = agendamentos.filter(
      a =>
        a.time === timeSelecionado &&
        a.data === dayjs(dataSelecionada).format('YYYY-MM-DD')
    )

    return removerHorariosOcupados(
      base,
      agendamentosDoDia,
      duracaoTotal,
      fechamento
    )

  }, [dataSelecionada, timeSelecionado, duracaoTotal, agendamentos])

  // HORARIOS JÁ PASSADOS ==================================================================

  function horarioJaPassou(data: Date, hora: string) {
    const agora = dayjs()
    const dataHora = dayjs(data)
      .hour(Number(hora.split(':')[0]))
      .minute(Number(hora.split(':')[1]))

    return dataHora.isBefore(agora)
  }

  function removerHorariosOcupados(
    horarios: string[],
    agendamentos: any[],
    duracaoServico: number,
    fechamento: string
  ) {
    const fechamentoDia = dayjs(`2024-01-01 ${fechamento}`, 'YYYY-MM-DD HH:mm')

    return horarios.filter(horario => {

      const inicioSlot = dayjs(`2024-01-01 ${horario}`, 'YYYY-MM-DD HH:mm')
      const fimSlot = inicioSlot.add(duracaoServico, 'minute')

      if (fimSlot.isAfter(fechamentoDia)) return false

      const conflito = agendamentos.some(a => {
        const aInicio = dayjs(`2024-01-01 ${a.inicio}`, 'YYYY-MM-DD HH:mm')
        const aFim = aInicio.add(a.duracao, 'minute')

        return inicioSlot.isBefore(aFim) && fimSlot.isAfter(aInicio)
      })

      return !conflito
    })
  }

  // CONFIRMAÇÃO =========================================================================

  function confirmarAgendamento() {
    if (!horarioSelecionado) return

    setAgendamentos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        data: dayjs(dataSelecionada).format('YYYY-MM-DD'),
        inicio: horarioSelecionado,
        duracao: duracaoTotal,
        time: timeSelecionado,
      },
    ])

    setHorarioSelecionado(null)
  }

  //ANIMAÇÃO PARA OS DIAS ===================================================================

  const fade = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  return (

    <SafeAreaView edges={['top']} style={lavajatoStyle.safeArea}>

      <ImageBackground source={lavaJato.imagemUrl} style={{ height: Dimensions.get('window').height * 0.3 }} />

      <Animated.View style={{ flex: 1, padding: 16, opacity: fade }}>
        <Text style={lavajatoStyle.title}>Agendamento</Text>

        {lavaJato.capacidade > 1 && (
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {times.map(t => (
              <TouchableOpacity
                key={t}
                onPress={() => {
                  setTimeSelecionado(t)
                  setHorarioSelecionado(null)
                }}
                style={[
                  lavajatoStyle.time,
                  t === timeSelecionado && lavajatoStyle.timeAtivo,
                ]}
              >
                <Text style={{ color: t === timeSelecionado ? '#FFF' : '#000' }}>
                  Time {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={lavajatoStyle.section}>Selecione a data</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {diasCalendario.map(dia => {
            const ativo = dia.toDateString() === dataSelecionada.toDateString();

            return (
              <TouchableOpacity
                key={dia.toISOString()}
                style={[lavajatoStyle.dia, ativo && lavajatoStyle.diaAtivo]}
                onPress={() => {
                  setDataSelecionada(dia)
                  setHorarioSelecionado(null)
                }}
              >
                <Text>{transformandoDatas(dia)}</Text>
                <Text style={{ fontWeight: '700' }}>
                  {dia.getDate()}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <Text style={lavajatoStyle.section}>Horários disponíveis</Text>
        <View style={{ minHeight: 160 }}>
          <View style={lavajatoStyle.horarios}>
            {horariosDisponiveis.map(h => (
              <TouchableOpacity
                key={h}
                onPress={() => setHorarioSelecionado(h)}
                style={[
                  lavajatoStyle.hora,
                  h === horarioSelecionado && lavajatoStyle.horaAtiva,
                ]}
              >
                <Text
                  style={{
                    color: h === horarioSelecionado ? '#FFF' : '#000',
                    fontWeight: h === horarioSelecionado ? '700' : '400',
                  }}
                >
                  {h}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          disabled={!horarioSelecionado}
          onPress={confirmarAgendamento}
          style={[lavajatoStyle.botao, !horarioSelecionado && { opacity: 0.5 }]}
        >
          <Text style={{ color: '#FFF', fontWeight: '700' }}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}
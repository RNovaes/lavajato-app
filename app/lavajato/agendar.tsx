import { View, Text, TouchableOpacity, FlatList, Animated, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import dayjs from 'dayjs'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '@/components/theme'

const HORARIO_ABERTURA = 9
const HORARIO_FECHAMENTO = 18
const CAPACIDADE = 2

const AGENDAMENTOS = [
  { inicio: '10:00', fim: '11:00' },
  { inicio: '10:30', fim: '12:00' },
  { inicio: '15:00', fim: '16:00' }
]

export default function Agendar() {
  const { servicos } = useLocalSearchParams()
  const lista = JSON.parse(servicos as string)

  const duracao = lista.reduce((acc: number, s: any) => acc + s.duracao, 0)

  const [loading, setLoading] = useState(true)
  const fade = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }, 800)
  }, [])

  const horarios = useMemo(() => {
    const slots = []

    for (let h = HORARIO_ABERTURA; h < HORARIO_FECHAMENTO; h++) {
      const inicio = dayjs().hour(h).minute(0)
      const fim = inicio.add(duracao, 'minute')

      const conflitos = AGENDAMENTOS.filter(a => {
        const aIni = dayjs(a.inicio, 'HH:mm')
        const aFim = dayjs(a.fim, 'HH:mm')

        return inicio.isBefore(aFim) && fim.isAfter(aIni)
      }).length

      if (conflitos < CAPACIDADE) {
        slots.push(inicio.format('HH:mm'))
      }
    }

    return slots
  }, [])

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        {[1, 2, 3].map(i => (
          <View key={i} style={agendarStyle.skeleton} />
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Animated.View style={{ padding: 16, opacity: fade }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
          Horários disponíveis
        </Text>

        <FlatList
          data={horarios}
          numColumns={3}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={agendarStyle.hora}>
              <Text style={{ fontWeight: '600' }}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={{ marginTop: 16 }}>
          Tempo total: {duracao} minutos
        </Text>
      </Animated.View>
    </SafeAreaView>
  )
}

const agendarStyle = StyleSheet.create({

  hora: {
    borderWidth: 1,
    borderColor: '#1E88E5',
    borderRadius: 8,
    paddingVertical: 12,
    width: 90,
    alignItems: 'center'
  },

  skeleton: {
    height: 40,
    backgroundColor: '#EEE',
    borderRadius: 8,
    marginBottom: 12
  }

})
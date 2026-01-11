import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { theme } from '@/components/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { valorParaReal } from '@/scripts/funcoes'

const { height } = Dimensions.get('window');

const SERVICOS = [
  { id: 'externa', nome: 'Lavagem Externa', duracao: 30, valor: 40 },
  { id: 'polimento', nome: 'Polimento', duracao: 90, valor: 150 },
  { id: 'Delivery', nome: 'Delivery', duracao: 90, valor: 150 },
  { id: 'Lavagem de Motor', nome: 'Lavagem de Motor', duracao: 90, valor: 150 },
  {
    id: 'completa',
    nome: 'Lavagem Completa',
    duracao: 60,
    valor: 80,
    permiteExtras: true
  }
]

const lavaJato = {
  imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
}

const EXTRAS = [
  { id: 'cera', nome: 'Cera', duracao: 20, valor: 30 },
  { id: 'motor', nome: 'Motor', duracao: 30, valor: 50 }
]

export default function Servicos() {
  const router = useRouter()
  const [extrasSelecionados, setExtras] = useState<any[]>([])

  function toggleExtra(extra: any) {
    setExtras(prev =>
      prev.some(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    )
  }

  function agendar(servico: any) {
    const lista =
      servico.permiteExtras ? [servico, ...extrasSelecionados] : [servico]

    router.push({
      pathname: '/lavajato/agendar',
      params: {
        servicos: JSON.stringify(lista)
      }
    })
  }

  return (

    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <ImageBackground
          source={lavaJato.imagemUrl}
          style={{ height: height * 0.3, justifyContent: 'flex-end' }}
        >
        </ImageBackground>
        <View style={{ padding: 16, backgroundColor: theme.colors.background }}>
          <Text style={servicosStyle.title}>Agendamento de Serviços</Text>
          {SERVICOS.map(servico => (
            <View key={servico.id} style={servicosStyle.card}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{servico.nome}</Text>
              <Text>{servico.duracao} min • R$ {valorParaReal(servico.valor)}</Text>

              {servico.permiteExtras && (
                <View style={{ marginTop: 12 }}>
                  <Text style={{ fontWeight: '600' }}>Extras</Text>

                  {EXTRAS.map(extra => (
                    <TouchableOpacity
                      key={extra.id}
                      onPress={() => toggleExtra(extra)}
                      style={[
                        servicosStyle.extraCard,
                        extrasSelecionados.some(e => e.id === extra.id) && servicosStyle.extraAtivo
                      ]}
                    >
                      <Text>{extra.nome} (+{extra.duracao} min)</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity style={servicosStyle.botao} onPress={() => agendar(servico)}>
                <Text style={servicosStyle.primaryButtonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const servicosStyle = StyleSheet.create({

  card: {
    backgroundColor: theme.colors.card,
    padding: 16,
    borderRadius: theme.radius.md,
    marginBottom: 16,
    borderColor: theme.colors.border
  },

  titulo: { fontSize: 16, fontWeight: '600' },

  botao: {
    backgroundColor: '#1E88E5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center'
  },

  primaryButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },

  extraCard: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 6
  },

  extraAtivo: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1E88E5'
  },

  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },

})

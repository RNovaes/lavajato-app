import { theme } from '@/components/theme'
import { valorParaReal } from '@/scripts/funcoes'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import lavajatoStyle from './lavajato.style'

const { height } = Dimensions.get('window');

const SERVICOS = [
  { id: 1, duracao: 90, nome: "Lavagem de Motor", valor: 50, permiteExtras: true },
  { id: 2, duracao: 30, nome: "Enceramento", valor: 20, permiteExtras: true },
  { id: 3, nome: 'Lavagem Externa', duracao: 30, valor: 40, permiteExtras: true },
  { id: 4, nome: 'Polimento', duracao: 90, valor: 150, permiteExtras: true },
  { id: 5, nome: 'Delivery', duracao: 90, valor: 150, permiteExtras: false },
  { id: 6, nome: 'Lavagem Completa', duracao: 60, valor: 80, permiteExtras: true }
]

const lavaJato = {
  imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
}

const EXTRAS = [
  { id: 1, duracao: 90, nome: "Lavagem de Motor", valor: 50 },
  { id: 2, duracao: 30, nome: "Enceramento", valor: 20 },
  { id: 3, nome: 'Lavagem Externa', duracao: 30, valor: 40 },
  { id: 4, nome: 'Polimento', duracao: 90, valor: 150 },
  { id: 5, nome: 'Delivery', duracao: 90, valor: 150 }
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

    <SafeAreaView edges={['top']} style={lavajatoStyle.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <ImageBackground
          source={lavaJato.imagemUrl}
          style={{ height: height * 0.3, justifyContent: 'flex-end' }}
        >
        </ImageBackground>
        <View style={ lavajatoStyle.abaServico }>
          <Text style={lavajatoStyle.title}>Agendamento de Serviços</Text>
          {SERVICOS
            .filter(servico => servico.nome !== 'Delivery')
            .map(servico => (
              <View key={servico.id} style={lavajatoStyle.card}>
                <Text style={ lavajatoStyle.servicoNome }>
                  {servico.nome}
                </Text>

                <Text>
                  {servico.duracao} min • R$ {valorParaReal(servico.valor)}
                </Text>

                {servico.permiteExtras && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ fontWeight: '600' }}>Extras</Text>

                    {EXTRAS
                      .filter(extra => extra.nome !== servico.nome)
                      .map(extra => (
                        <TouchableOpacity
                          key={extra.id}
                          onPress={() => toggleExtra(extra)}
                          style={[
                            lavajatoStyle.extraCard,
                            extrasSelecionados.some(e => e.id === extra.id) &&
                            lavajatoStyle.extraAtivo,
                          ]}
                        >
                          <Text>
                            {extra.nome} (+{extra.duracao} min)
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                )}

                <TouchableOpacity
                  style={lavajatoStyle.botao}
                  onPress={() => agendar(servico)}
                >
                  <Text style={lavajatoStyle.primaryButtonText}>Agendar</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}




import { theme } from '@/components/theme';
import { estaAberto, valorParaReal } from '@/scripts/funcoes';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import lavajatoStyle from './lavajato.style';

export default function LavaJatoDetalhes() {

  const { id, distanciaKm } = useLocalSearchParams();
  const router = useRouter();
  const { height } = Dimensions.get('window');
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

  const [abaAtiva, setAbaAtiva] = useState<
    'servicos' | 'detalhes' | 'avaliacoes'
  >('servicos');

  const lavaJato = {
    nome: 'Lava Jato Central',
    distanciaKm: distanciaKm,
    capacidade: 2,
    dias: ["Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    endereco: "Rua Iconha, 00, Paciência , Rio de Janeiro - RJ, Brasil",
    horarios: {
      domingo: { abertura: "09:01", fechamento: "14:01" },
      sabado: { abertura: "09:01", fechamento: "17:01" },
      semana: { abertura: "08:01", fechamento: "19:01" }
    },
    latitude: -22.9344176,
    longitude: -43.6361342,
    pagamentos: ["Dinheiro", "Pix", "Crédito", "Débito"],
    tipos_veiculos: ["Sedan", "Hatch", "SUV"],
    tempoVeiculo: {
      Carga: { horas: null, minutos: null, valor: null },
      Hatch: { horas: 1, minutos: 30, valor: 60 },
      Picape: { horas: null, minutos: null, valor: null },
      SUV: { horas: 3, minutos: 0, valor: 50 },
      Sedan: { horas: 2, minutos: 30, valor: 35 },
      Van: { horas: null, minutos: null, valor: null }
    },
    servicos_adicionais: ["Lavagem Interna", "Lavagem Externa", "Enceramento", "Lavagem de Motor"],
    detalhesServicos: [
      { id: 1, duracao: 90, nome: "Lavagem de Motor", valor: 50, permiteExtras: true },
      { id: 2, duracao: 30, nome: "Enceramento", valor: 20, permiteExtras: true },
      { id: 3, nome: 'Lavagem Externa', duracao: 30, valor: 40, permiteExtras: true },
      { id: 4, nome: 'Polimento', duracao: 90, valor: 150, permiteExtras: true },
      { id: 5, nome: 'Delivery', duracao: 90, valor: 150, permiteExtras: false },
      { id: 6, nome: 'Lavagem Completa', duracao: 60, valor: 80, permiteExtras: true }
    ],
    imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
  }

  const EXTRAS = [
    { id: 1, duracao: 90, nome: "Lavagem de Motor", valor: 50 },
    { id: 2, duracao: 30, nome: "Enceramento", valor: 20 },
    { id: 3, nome: 'Lavagem Externa', duracao: 30, valor: 40 },
    { id: 4, nome: 'Polimento', duracao: 90, valor: 150 },
    { id: 5, nome: 'Delivery', duracao: 90, valor: 150 }
  ]

  const abertoAgora = estaAberto(lavaJato.dias, lavaJato.horarios);

  const abas = [
    { key: 'servicos', label: 'Serviços' },
    { key: 'detalhes', label: 'Detalhes' },
    { key: 'avaliacoes', label: 'Avaliações' },
  ];

  function InfoItem({ icon, label, value }: any) {
    return (
      <View style={lavajatoStyle.infoRow}>
        <Ionicons name={icon} size={18} color="#4B5563" />
        <Text style={lavajatoStyle.infoLabel}>{label}</Text>
        <Text style={lavajatoStyle.infoValue}>{value}</Text>
      </View>
    );
  }

  function Tag({ text }: { text: string }) {
    return (
      <View style={lavajatoStyle.tag}>
        <Text style={lavajatoStyle.tagText}>{text}</Text>
      </View>
    );
  }

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'detalhes':
        return (
          <View style={{ paddingHorizontal: 16 }}>

            <View style={lavajatoStyle.card}>
              <Text style={lavajatoStyle.cardTitle}>Informações</Text>

              <InfoItem icon="location-outline" label="Endereço" value="Av. Central, 123 - Centro" />
              <InfoItem icon="time-outline" label="Funcionamento" value="08:00 às 18:00" />
              <InfoItem icon="car-outline" label="Distância" value={lavaJato.distanciaKm + ' Km'} />
              <InfoItem icon="checkmark-circle-outline" label="Status" value={abertoAgora ? 'Aberto agora' : 'Fechado'} />
            </View>

            <View style={lavajatoStyle.card}>
              <Text style={lavajatoStyle.cardTitle}>Veículos</Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {lavaJato.tipos_veiculos.map(v => (

                  <View key={v}>
                    <Tag text={v} />
                  </View>

                ))}
              </View>
            </View>

            <View style={lavajatoStyle.card}>
              <Text style={lavajatoStyle.cardTitle}>Estrutura</Text>

              <Tag text="Sala de espera" />
              <Tag text="Wi-Fi" />
              <Tag text="Coberto" />
              <Tag text="Agendamento online" />
            </View>

            <View style={lavajatoStyle.card}>
              <Text style={lavajatoStyle.cardTitle}>Regras</Text>

              <Text style={lavajatoStyle.text}>
                • Cancelamentos até 1h antes{'\n'}
                • Tolerância de atraso: 10 minutos{'\n'}
                • Pagamento no local ou pelo app
              </Text>
            </View>
            <View style={{ marginTop: 20 }}></View>
          </View >
        );

      case 'servicos':
        return (
          <View style={lavajatoStyle.abaServico}>
            <Text style={lavajatoStyle.title}>Agendamento de Serviços</Text>
            {lavaJato.detalhesServicos
              .filter(servico => servico.nome !== 'Delivery')
              .map(servico => (
                <View key={servico.id} style={lavajatoStyle.card}>
                  <Text style={lavajatoStyle.servicoNome}>
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
        );

      case 'avaliacoes':
        return (
          <View style={lavajatoStyle.card}>
            <Text>Ainda sem avaliações</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={lavajatoStyle.safeArea}>
      <ScrollView>
        
        <ImageBackground
          source={lavaJato.imagemUrl}
          style={{ height: height * 0.3, justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 }}>
            <Text style={lavajatoStyle.lavajatoNome}>
              {lavaJato.nome}
            </Text>
            <Text style={{ color: theme.colors.secondary }}>
              📍 {lavaJato.distanciaKm} km • <Text style={{
                color: abertoAgora ? 'green' : 'red',
                fontWeight: 'bold',
              }}>{abertoAgora ? 'Aberto agora' : 'Fechado'}</Text>
            </Text>
            <Text style={{ color: theme.colors.secondary }}>
              📍 {lavaJato.endereco}
            </Text>
          </View>
        </ImageBackground>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          style={{ backgroundColor: theme.colors.background }}
        >
          {abas.map(aba => (
            <TouchableOpacity
              key={aba.key}
              onPress={() => setAbaAtiva(aba.key as any)}
              style={{
                marginRight: 10,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor:
                  abaAtiva === aba.key ? '#2563EB' : '#E5E7EB',
              }}
            >
              <Text
                style={{
                  color: abaAtiva === aba.key ? '#FFF' : '#374151',
                  fontWeight: '600',
                }}
              >
                {aba.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: 16, backgroundColor: theme.colors.background }}>
          {renderConteudo()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

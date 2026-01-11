
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import lavajatoStyle from './index.style';
import { estaAberto, formatarHorario } from '@/scripts/funcoes';

export default function LavaJatoDetalhes() {
  
  const { id, distanciaKm } = useLocalSearchParams();
  const router = useRouter();
  const { height } = Dimensions.get('window');

  const [abaAtiva, setAbaAtiva] = useState<
    'detalhes' | 'servicos' | 'veiculos' | 'horarios' | 'avaliacoes'
  >('detalhes');

  const lavaJato = {
    nome: 'Lava Jato Central',
    distanciaKm,
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
    valores_servicos: [
      { duracao: 90, nome: "Lavagem de Motor", valor: 50 },
      { duracao: 30, nome: "Enceramento", valor: 20 }
    ],
    imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
  }

  const abertoAgora = estaAberto(lavaJato.dias, lavaJato.horarios);

  const abas = [
    { key: 'detalhes', label: 'Detalhes' },
    { key: 'servicos', label: 'Serviços' },
    { key: 'veiculos', label: 'Veículos' },
    { key: 'horarios', label: 'Horários' },
    { key: 'avaliacoes', label: 'Avaliações' },
  ];

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'detalhes':
        return (
          <View style={lavajatoStyle.card}>

            <Text style={[lavajatoStyle.cardTitle, { marginTop: 12 }]}>
              Pagamentos
            </Text>
            {lavaJato.pagamentos.map(p => (
              <Text key={p}>• {p}</Text>
            ))}
          </View>
        );

      case 'servicos':
        return (
          <View style={lavajatoStyle.card}>
            {lavaJato.valores_servicos.map(s => (
              <View
                key={s.nome}
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text>{s.nome}</Text>
                <Text style={{ fontWeight: '600' }}>
                  R${s.valor}
                </Text>
              </View>
            ))}
          </View>
        );

      case 'veiculos':
        return (
          <View style={lavajatoStyle.card}>
            <Text style={lavajatoStyle.cardTitle}>Veículos Aceitos</Text>
            {lavaJato.tipos_veiculos.map(v => (
              <View key={v}>
                <Text >• {v} </Text>
              </View>
            ))}
          </View>
        );

      case 'horarios':
        return (
          <View style={lavajatoStyle.card}>
            <Text style={lavajatoStyle.cardTitle}>Horário de Atendimento</Text>
            <Text>Seg–Sex: {formatarHorario(
              lavaJato.horarios.semana.abertura,
              lavaJato.horarios.semana.fechamento
            )}</Text>
            <Text>Sábado: {formatarHorario(
              lavaJato.horarios.sabado.abertura,
              lavaJato.horarios.sabado.fechamento
            )}</Text>
            <Text>Domingo: {formatarHorario(
              lavaJato.horarios.domingo.abertura,
              lavaJato.horarios.domingo.fechamento
            )}</Text>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        {/* HEADER */}
        <ImageBackground
          source={lavaJato.imagemUrl}
          style={{ height: height * 0.3, justifyContent: 'flex-end' }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 }}>
            <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '700' }}>
              {lavaJato.nome}
            </Text>
            <Text style={{ color: '#E5E7EB' }}>
              📍 {lavaJato.distanciaKm} km • <Text style={{
                color: abertoAgora ? 'green' : 'red',
                fontWeight: 'bold',
              }}>{abertoAgora ? 'Aberto agora' : 'Fechado'}</Text>
            </Text>
            <Text style={{ color: '#E5E7EB' }}>
              📍 {lavaJato.endereco}
            </Text>
          </View>
        </ImageBackground>

        {/* ABAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
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

        {/* CONTEÚDO */}
        <View style={{ paddingHorizontal: 16 }}>
          {renderConteudo()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

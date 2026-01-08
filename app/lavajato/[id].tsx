
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

  // const lavaJato = {
  //   nome: 'Lava Jato Central',
  //   distanciaKm,
  //   capacidade: 2,
  //   dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  //   endereco: 'Rua Pedra do Sino, 277 - Paciência, Rio de Janeiro - RJ',
  //   horarios: {
  //     domingo: { abertura: null, fechamento: null },
  //     sabado: { abertura: '09:16', fechamento: '14:16' },
  //     semana: { abertura: '09:15', fechamento: '18:15' },
  //   },
  //   pagamentos: ['Dinheiro', 'Pix', 'Crédito'],
  //   servicos: [
  //     'Lavagem Completa',
  //     'Lavagem Interna',
  //     'Lavagem Externa',
  //     'Enceramento',
  //     'Polimento',
  //     'Delivery',
  //     'Lavagem de Motor',
  //   ],
  //   valores: {
  //     Delivery: 5,
  //     Enceramento: 10,
  //     'Lavagem Completa': 30,
  //     'Lavagem Externa': 20,
  //     'Lavagem Interna': 20,
  //     'Lavagem de Motor': 30,
  //     Polimento: 30,
  //   },
  //   veiculos: ['Sedan', 'Hatch', 'Suv', 'Picape'],
  //   imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
  // };

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
    servicos_adicionais: ["Lavagem Interna", "Lavagem Externa", "Enceramento", "Lavagem de Motor"],
    tempoVeiculo: {
      Carga: { horas: "", minutos: "" },
      Hatch: { horas: "1", minutos: "30" },
      Picape: { horas: "", minutos: "" },
      SUV: { horas: "3", minutos: "00" },
      Sedan: { horas: "2", minutos: "30" },
      Van: { horas: "", minutos: "" }
    },
    tipos_veiculos: ["Sedan", "Hatch", "SUV"],
    valorlavagemcompleta: {
      Hatch: 30,
      SUV: 40,
      Sedan: 30
    },
    valores_servicos: [
    { servico: "Lavagem Interna", valor: 20 },
    { servico: "Lavagem Externa", valor: 20 }, 
    { servico: "Lavagem de Motor", valor: 10 },
    { servico: "Enceramento", valor: 5 }, 
    { servico: "Delivery", valor: 50 }],
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
                key={s.servico}
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Text>{s.servico}</Text>
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

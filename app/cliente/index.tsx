
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeClientes from '../cliente/index.style'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MeuTextInput from '@/components/MeuTextInput';
import { PrimaryButton, SecondaryButton } from '@/components/componentes';
import { mascaraPlaca } from '@/scripts/mascaras';

export default function Inicio() {

  const router = useRouter()

  const [visivel, setVisivel] = useState(false);

  function cadastrarVeiculo() {
    console.log('Cadastrando Veículo....')
  }

  const [carro, setCarro] = useState();
  const [placa, setPlaca] = useState('');

  const ultimoAgendamento = {
    local: 'Lava Jato Central',
    data: '12/12/2025',
    status: 'Concluído',
  };

  const resumo = {
    ultimoLavaJato: ultimoAgendamento.local,
    totalGasto: 'R$ 320,00',
    totalServicos: 6,
  };

  return (
    <SafeAreaView style={homeClientes.safeArea} edges={['top']}>
      <ScrollView style={homeClientes.container}>
        <View style={homeClientes.header}>
          <Text style={homeClientes.hello}>Olá, Renato 👋</Text>
          <Text style={homeClientes.sub}>O que vamos lavar hoje?</Text>
        </View>


        {/* Resumo */}
        <View style={homeClientes.section}>
          <View style={homeClientes.summaryCard}>
            <Text style={homeClientes.sectionTitle}>Resumo</Text>
            <View style={homeClientes.summaryRow}>
              <View>
                <Text style={homeClientes.cardLabel}>Último lava-jato</Text>
                <Text style={homeClientes.cardValue}>{resumo.ultimoLavaJato || '-'}</Text>
              </View>
              <View style={homeClientes.summaryDivider} />
              <View>
                <Text style={homeClientes.cardLabel}>Total gasto</Text>
                <Text style={homeClientes.cardValue}>{resumo.totalGasto || 'R$ 0,00'}</Text>
              </View>
              <View style={homeClientes.summaryDivider} />
              <View>
                <Text style={homeClientes.cardLabel}>Serviços</Text>
                <Text style={homeClientes.cardValue}>{resumo.totalServicos || 0}</Text>
              </View>
            </View>
          </View>
        </View>


        {/* MAPA */}
        <TouchableOpacity style={homeClientes.primaryButton} activeOpacity={0.8} onPress={() => router.push('../mapa')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Ionicons name="map-outline" size={30} color={'white'} style={{marginRight: 10}}/>
            </View>
            <View>
              <Text style={homeClientes.primaryButtonText}>Buscar Lava-Jato</Text>
              <Text style={homeClientes.primaryButtonSub}>Selecionar no Mapa</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={homeClientes.section}>
          <Text style={homeClientes.sectionTitle}>Meus Carros</Text>
          {carro && (
            <View style={homeClientes.card}>
              <Text style={homeClientes.cardValue}>Cruze</Text>
              <Text style={homeClientes.cardLabel}>
                LLT-7003
              </Text>
            </View>
          )}{<Text>Não há carros cadastrados</Text>}
        </View>
        <TouchableOpacity style={homeClientes.primaryButton} activeOpacity={0.8} onPress={() => setVisivel(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="add-circle-outline" size={30} color={'white'} style={{ marginRight: 10 }} />
            <Text style={homeClientes.primaryButtonText}>Adicionar Veículo</Text>
          </View>
        </TouchableOpacity>

        <Modal
          visible={visivel}
          transparent
          animationType="fade"
          onRequestClose={() => setVisivel(false)}
        >
          <View style={homeClientes.overlay}>
            <View style={homeClientes.popup}>
              <Text style={homeClientes.tituloModal}>Dados do Veículo</Text>

              <Text style={homeClientes.textosModal}>Modelo</Text>
              <MeuTextInput />

              <Text style={homeClientes.textosModal}>Placa</Text>
              <MeuTextInput value={placa}
                onChangeText={text => setPlaca(mascaraPlaca(text))}
                placeholder="ABC1D23 ou ABC-1234"
                autoCapitalize="characters" />

              <View style={{ marginTop: 15, flexDirection: 'row', gap: 5 }}>
                <SecondaryButton label="Fechar" onPress={() => setVisivel(false)} />
                <PrimaryButton label="Cadastrar" onPress={() => cadastrarVeiculo()} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Último agendamento */}
        <View style={homeClientes.section}>
          <Text style={homeClientes.sectionTitle}>Último agendamento</Text>
          <View style={homeClientes.card}>
            <Text style={homeClientes.cardValue}>{ultimoAgendamento.local || '-'}</Text>
            <Text style={homeClientes.cardLabel}>
              {ultimoAgendamento.data || '-'} • {ultimoAgendamento.status || '-'}
            </Text>
          </View>
        </View>


        {/* Sugestões */}
        <View style={homeClientes.section}>
          <Text style={homeClientes.sectionTitle}>Sugestões próximas</Text>


          {['Lava Jato Central', 'Lava Jato Brilho Rápido'].map((item, index) => (
            <View key={index} style={homeClientes.card}>
              <Text style={homeClientes.cardValue}>{item}</Text>
              <Text style={homeClientes.cardLabel}>Aprox. 1.2km</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

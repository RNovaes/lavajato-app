
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import homeClientes from '../estilos/cliente/homeClienteStyle';
import { useRouter } from 'expo-router';

export default function Inicio() {

  const router = useRouter()

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
                <Text style={homeClientes.cardValue}>{resumo.ultimoLavaJato}</Text>
              </View>
              <View style={homeClientes.summaryDivider} />
              <View>
                <Text style={homeClientes.cardLabel}>Total gasto</Text>
                <Text style={homeClientes.cardValue}>{resumo.totalGasto}</Text>
              </View>
              <View style={homeClientes.summaryDivider} />
              <View>
                <Text style={homeClientes.cardLabel}>Serviços</Text>
                <Text style={homeClientes.cardValue}>{resumo.totalServicos}</Text>
              </View>
            </View>
          </View>
        </View>


        {/* MAPA */}
        <TouchableOpacity style={homeClientes.primaryButton} activeOpacity={0.8} onPress={() => router.push('../mapa')}>
          <Text style={homeClientes.primaryButtonText}>Buscar Lava-Jato</Text>
          <Text style={homeClientes.primaryButtonSub}>Selecionar no Mapa</Text>
        </TouchableOpacity>


        {/* Último agendamento */}
        <View style={homeClientes.section}>
          <Text style={homeClientes.sectionTitle}>Último agendamento</Text>
          <View style={homeClientes.card}>
            <Text style={homeClientes.cardValue}>{ultimoAgendamento.local}</Text>
            <Text style={homeClientes.cardLabel}>
              {ultimoAgendamento.data} • {ultimoAgendamento.status}
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

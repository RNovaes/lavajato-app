
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import painelStyle from '../../estilos/empresa/painelStyle';

export default function PainelDono() {

  return (

    <SafeAreaView style={painelStyle.safeArea} edges={['top']}>
      <ScrollView style={painelStyle.container} contentContainerStyle={{ paddingBottom: 24 }}>

        {/* HEADER */}
        <View style={painelStyle.header}>
          <Text style={painelStyle.hello}>Olá, João 👋</Text>
          <Text style={painelStyle.sub}>Lava Jato Brilho Rápido</Text>
        </View>

        {/* ALERTA */}
        <View style={painelStyle.alert}>
          <Text style={painelStyle.alertIcon}>⚠️</Text>
          <Text style={painelStyle.alertText}>
            Seus dados estão incompletos. Atualize para usar todas as funções.
          </Text>
          <TouchableOpacity>
            <Text style={painelStyle.alertLink}>Atualizar agora</Text>
          </TouchableOpacity>
        </View>

        {/* CARDS RESUMO */}
        <View style={painelStyle.cardsGrid}>
          <View style={painelStyle.card}>
            <Text style={painelStyle.cardValue}>R$ 450,00</Text>
            <Text style={painelStyle.cardLabel}>Faturamento hoje</Text>
          </View>

          <View style={painelStyle.card}>
            <Text style={painelStyle.cardValue}>6</Text>
            <Text style={painelStyle.cardLabel}>Agendamentos hoje</Text>
          </View>

          <View style={painelStyle.card}>
            <Text style={painelStyle.cardValue}>2</Text>
            <Text style={painelStyle.cardLabel}>Pendentes</Text>
          </View>

          <View style={painelStyle.card}>
            <Text style={painelStyle.cardValue}>128</Text>
            <Text style={painelStyle.cardLabel}>Clientes</Text>
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={painelStyle.primaryButton}>
          <Text style={painelStyle.primaryButtonText}>Novo agendamento</Text>
        </TouchableOpacity>

        {/* GESTÃO */}
        <View style={painelStyle.section}>
          <Text style={painelStyle.sectionTitle}>Gestão</Text>

          {[
            'Meus dados',
            'Agendamentos',
            'Faturamento',
            'Serviços oferecidos',
            'Avaliações'
          ].map((item, index) => (
            <TouchableOpacity key={index} style={painelStyle.listItem}>
              <Text style={painelStyle.listText}>{item}</Text>
              <Text style={painelStyle.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTA */}
        {/* <View style={painelStyle.accountSection}>
        <TouchableOpacity>
          <Text style={painelStyle.logout}>Sair da conta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={painelStyle.delete}>Remover conta</Text>
        </TouchableOpacity>
      </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}
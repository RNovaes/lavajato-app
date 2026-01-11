
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import faturamentoStyle from './estilos/faturamento.style';

export default function Faturamento() {
    return (
        <SafeAreaView style={faturamentoStyle.safeArea} edges={['top']}>
            <ScrollView contentContainerStyle={faturamentoStyle.container}>

                <Text style={faturamentoStyle.title}>Faturamento</Text>

                {/* RESUMO */}
                <View style={faturamentoStyle.cardsRow}>
                    <View style={faturamentoStyle.card}>
                        <Text style={faturamentoStyle.cardValue}>R$ 1.250,00</Text>
                        <Text style={faturamentoStyle.cardLabel}>Hoje</Text>
                    </View>

                    <View style={faturamentoStyle.card}>
                        <Text style={faturamentoStyle.cardValue}>R$ 8.430,00</Text>
                        <Text style={faturamentoStyle.cardLabel}>Últimos 7 dias</Text>
                    </View>
                </View>

                <View style={faturamentoStyle.cardFull}>
                    <Text style={faturamentoStyle.cardValue}>R$ 32.780,00</Text>
                    <Text style={faturamentoStyle.cardLabel}>Mês atual</Text>
                </View>

                {/* POR SERVIÇO */}
                <Text style={faturamentoStyle.sectionTitle}>Por serviço</Text>

                {[
                    { nome: 'Lavagem Simples', valor: 'R$ 8.200,00' },
                    { nome: 'Lavagem Completa', valor: 'R$ 14.500,00' },
                    { nome: 'Polimento', valor: 'R$ 10.080,00' },
                ].map((item, index) => (
                    <View key={index} style={faturamentoStyle.listItem}>
                        <Text style={faturamentoStyle.listLabel}>{item.nome}</Text>
                        <Text style={faturamentoStyle.listValue}>{item.valor}</Text>
                    </View>
                ))}

                {/* POR VEÍCULO */}
                <Text style={faturamentoStyle.sectionTitle}>Por tipo de veículo</Text>

                {[
                    { nome: 'Moto', valor: 'R$ 3.200,00' },
                    { nome: 'Hatch', valor: 'R$ 9.400,00' },
                    { nome: 'Sedan', valor: 'R$ 11.300,00' },
                    { nome: 'SUV', valor: 'R$ 8.880,00' },
                ].map((item, index) => (
                    <View key={index} style={faturamentoStyle.listItem}>
                        <Text style={faturamentoStyle.listLabel}>{item.nome}</Text>
                        <Text style={faturamentoStyle.listValue}>{item.valor}</Text>
                    </View>
                ))}

                {/* INSIGHTS */}
                <View style={faturamentoStyle.insightCard}>
                    <Text style={faturamentoStyle.insightTitle}>Insights</Text>
                    <Text style={faturamentoStyle.insightText}>
                        💡 Serviço mais vendido: Lavagem Completa
                    </Text>
                    <Text style={faturamentoStyle.insightText}>
                        🚗 Veículo mais atendido: Sedan
                    </Text>
                    <Text style={faturamentoStyle.insightText}>
                        📈 Ticket médio: R$ 78,00
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

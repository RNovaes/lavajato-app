
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import agendamentosLavaJato from './estilos/agendamentos.Style';

export default function AgendamentosLavaJato() {
    return (
        <SafeAreaView style={agendamentosLavaJato.safeArea}>
            <ScrollView style={agendamentosLavaJato.container}>
                <View style={agendamentosLavaJato.header}>
                    <Text style={agendamentosLavaJato.hello}>Meus agendamentos</Text>
                    <Text style={agendamentosLavaJato.sub}>Histórico e próximos serviços</Text>
                </View>


                <View style={agendamentosLavaJato.section}>
                    {[{
                        cliente: 'Renato Novaes',
                        carro: 'Cruze',
                        dia: '25/01/2026',
                        horario: '14:00',
                        servicos: '',
                        status: 'Agendado'
                    }, {
                        cliente: 'Glenda Novaes',
                        carro: 'Civic',
                        dia: '23/01/2026',
                        horario: '16:00',
                        servicos: '',
                        status: 'Concluído'
                    }].map((item, index) => (
                        <View key={index} style={agendamentosLavaJato.historyItem}>
                            <View>
                                <Text style={agendamentosLavaJato.historyTitle}>{item.cliente}</Text>
                                <Text style={agendamentosLavaJato.historyTitle}>{item.carro}</Text>
                                <Text style={agendamentosLavaJato.historySub}>{item.dia}</Text>
                                <Text style={agendamentosLavaJato.historySub}>{item.horario} hr</Text>
                            </View>
                            <Text style={[agendamentosLavaJato.historyStatus, item.status === 'Agendado' && { color: '#2563EB' }]}>
                                {item.status}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
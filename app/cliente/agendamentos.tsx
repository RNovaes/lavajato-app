import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './padraoStyle';

export default function Agendamentos() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.hello}>Meus agendamentos</Text>
                    <Text style={styles.sub}>Histórico e próximos serviços</Text>
                </View>


                <View style={styles.section}>
                    {[{
                        local: 'Lava Jato Central',
                        data: '15/12/2025',
                        status: 'Agendado'
                    }, {
                        local: 'Lava Jato Brilho Rápido',
                        data: '05/12/2025',
                        status: 'Concluído'
                    }].map((item, index) => (
                        <View key={index} style={styles.historyItem}>
                            <View>
                                <Text style={styles.historyTitle}>{item.local}</Text>
                                <Text style={styles.historySub}>{item.data}</Text>
                            </View>
                            <Text style={[styles.historyStatus, item.status === 'Agendado' && { color: '#2563EB' }]}>
                                {item.status}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
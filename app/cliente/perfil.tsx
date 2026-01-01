import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../estilos/cliente/padraoStyle';

export default function Perfil() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.hello}>Meu perfil</Text>
                    <Text style={styles.sub}>Gerencie sua conta</Text>
                </View>


                <View style={styles.section}>
                    {['Meus dados', 'Minhas avaliações', 'Configurações'].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.listItem}>
                            <Text style={styles.listText}>{item}</Text>
                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>


                <View style={styles.accountSection}>
                    <TouchableOpacity>
                        <Text style={styles.logout}>Sair da conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.delete}>Remover conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


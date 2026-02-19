
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import painelStyle from './estilos/index.style';
import { Href, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function PainelDono() {

  const rota = useRouter()

  const [modalVisible, setModalVisible] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(require('../../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'));
  //'https://via.placeholder.com/150'

  // async function tirarFoto() {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //   if (status !== 'granted') return;

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.7,
  //   });

  //   if (!result.canceled) {
  //     setFotoPerfil(result.assets[0].uri);
  //     setModalVisible(false);
  //   }
  // }

  // async function escolherGaleria() {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.7,
  //   });

  //   if (!result.canceled) {
  //     setFotoPerfil(result.assets[0].uri);
  //     setModalVisible(false);
  //   }
  // }

  const menuItems: { label: string, rota: Href }[] = [
    { label: 'Meus dados', rota: '/empresa/painel/perfil' as Href },
    { label: 'Agendamentos', rota: '/empresa/painel/agendamentos' as Href },
    { label: 'Faturamento', rota: '/empresa/painel/faturamento' as Href},
    { label: 'Serviços oferecidos', rota: '/empresa/painel/servicos' as Href},
    { label: 'Avaliações', rota: '/empresa/painel/avaliacoes' as Href},
  ];

  return (

    <SafeAreaView style={painelStyle.safeArea} edges={['top']}>
      <ScrollView style={painelStyle.container} contentContainerStyle={{ paddingBottom: 24 }}>

        <View style={painelStyle.header}>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={painelStyle.avatarWrapper}>
              <Image source={fotoPerfil} style={painelStyle.avatar} />
              <View style={painelStyle.cameraIcon}>
                <Ionicons name="camera" size={12} color="#FFF" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={painelStyle.headerRight}>
            <Text style={painelStyle.hello}>Olá, João 👋</Text>
            <Text style={painelStyle.sub}>Lava Jato Brilho Rápido</Text>
          </View>
        </View>


        {/* ALERTA */}
        <View style={painelStyle.alert}>
          <Text style={painelStyle.alertIcon}>⚠️</Text>
          <Text style={painelStyle.alertText}>
            Seus dados estão incompletos. Atualize para usar todas as funções.
          </Text>
          <TouchableOpacity style={painelStyle.atualizarDados} onPress={() => rota.push('/empresa/atualizarDados')}>
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
        <TouchableOpacity style={painelStyle.primaryButton} onPress={() => rota.push('../lavajato/servicos')}>
          <Text style={painelStyle.primaryButtonText}>Novo agendamento</Text>
        </TouchableOpacity>

        {/* GESTÃO */}
        <View style={painelStyle.section}>
          <Text style={painelStyle.sectionTitle}>Gestão</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={painelStyle.listItem}
              onPress={() => rota.push(item.rota)} // Use a rota específica do item
            >
              <Text style={painelStyle.listText}>{item.label}</Text>
              <Text style={painelStyle.arrow}>›</Text>
            </TouchableOpacity>
          ))}

        </View>

      </ScrollView>

      {/* <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={painelStyle.modalOverlay}>
          <View style={painelStyle.modalContent}>
            <Text style={painelStyle.modalTitle}>Alterar foto</Text>

            <TouchableOpacity
              style={painelStyle.modalButton}
              onPress={tirarFoto}
            >
              <Text style={painelStyle.modalButtonText}>Tirar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={painelStyle.modalButton}
              onPress={escolherGaleria}
            >
              <Text style={painelStyle.modalButtonText}>Escolher da galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={painelStyle.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

    </SafeAreaView>
  );
}
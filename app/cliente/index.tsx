
import MeuTextInput from '@/components/MeuTextInput';
import { Card, Header, Padrao, PrimaryButton, SecondaryButton } from '@/components/componentes';
import { theme } from '@/components/theme';
import { fotoPerfilHeader } from '@/hooks/fotoHeader';
import { ModalHeaderFoto } from '@/scripts/funcoes';
import { mascaraPlaca } from '@/scripts/mascaras';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import clienteStyle from './estilos/clientes.style';

export default function Inicio() {

  const router = useRouter()

  // Foto Header
  const { foto, tirarFoto, escolherGaleria } = fotoPerfilHeader()
  const [modalFotoHeader, setModalFotoHeader] = useState(false)

  // Modal de cadastro de veículos
  const [visivel, setVisivel] = useState(false);
  const [carro, setCarro] = useState('');
  const [placa, setPlaca] = useState('');

  function cadastrarVeiculo() {
    console.log('Cadastrando Veículo....')
    setVisivel(false)
  }

  // Dados Mock
  const resumo = {
    ultimoLavaJato: 'Lava Jato Central',
    totalGasto: 'R$ 320,00',
    totalServicos: 6,
    data: '12/12/2025',
    status: 'Concluído',
  };

  type LavaJato = {
    id: string;
    nome: string;
    endereco: string;
    data: string;
    distancia: number;
    imagem: string;
  };

  const dadosMock: LavaJato[] = [
    {
      id: "1",
      nome: "Lava Jato Central",
      endereco: "Centro",
      data: "15/12/2025",
      distancia: 1.2,
      imagem: "https://picsum.photos/200",
    },
    {
      id: "2",
      nome: "Brilho Car",
      endereco: "Zona Sul",
      data: "20/02/2025",
      distancia: 2.5,
      imagem: "https://picsum.photos/201",
    },
    {
      id: "3",
      nome: "Auto Clean",
      endereco: "Zona Norte",
      data: "15/03/2025",
      distancia: 5.0,
      imagem: "https://picsum.photos/202",
    },
  ];

  return (

    <Padrao>

      <Header title='Olá, Renato 👋' subtitle='O que vamos lavar hoje?' foto={foto} onPress={() => setModalFotoHeader(true)}></Header>

      <ModalHeaderFoto visible={modalFotoHeader} onClose={() => setModalFotoHeader(false)} onTirarFoto={async () => {
        await tirarFoto()
        setModalFotoHeader(false)
      }}
        onEscolherGaleria={async () => {
          await escolherGaleria()
          setModalFotoHeader(false)
        }}>
      </ModalHeaderFoto>

      <ScrollView removeClippedSubviews={false} keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>

        <Card title='Resumo'>
          <View style={clienteStyle.summaryRow}>
            <View>
              <Text style={clienteStyle.cardLabel}>Último lava-jato</Text>
              <Text style={clienteStyle.cardValue}>{resumo.ultimoLavaJato || '-'}</Text>
            </View>
            <View style={clienteStyle.summaryDivider} />
            <View>
              <Text style={clienteStyle.cardLabel}>Total gasto</Text>
              <Text style={clienteStyle.cardValue}>{resumo.totalGasto || 'R$ 0,00'}</Text>
            </View>
            <View style={clienteStyle.summaryDivider} />
            <View>
              <Text style={clienteStyle.cardLabel}>Serviços</Text>
              <Text style={clienteStyle.cardValue}>{resumo.totalServicos || 0}</Text>
            </View>
            <View>
              <Text style={clienteStyle.cardLabel}>Data</Text>
              <Text style={clienteStyle.cardValue}>{resumo.data || '-'}</Text>
            </View>
            <View>
              <Text style={clienteStyle.cardLabel}>Status</Text>
              <Text style={clienteStyle.cardValue}>{resumo.status || '-'}</Text>
            </View>
          </View>
        </Card>

        {/* <TouchableOpacity style={theme.botoes.principal} activeOpacity={0.8} onPress={() => router.push('../mapa')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Ionicons name="map-outline" size={30} color={'white'} style={{ marginRight: 10 }} />
            </View>
            <View>
              <Text style={clienteStyle.primaryButtonText}>Buscar Lava-Jato</Text>
              <Text style={clienteStyle.primaryButtonSub}>Selecionar no Mapa</Text>
            </View>
          </View>
        </TouchableOpacity> */}

        <Card title='Meus Carros'>
          {carro && (
            <View>
              <Text style={clienteStyle.cardValue}>{carro}</Text>
              <Text style={clienteStyle.cardLabel}>
                {placa}
              </Text>
            </View>
          )}{!carro && (
            <Text>Não há carros cadastrados</Text>
          )}
          <TouchableOpacity style={theme.botoes.principal} activeOpacity={0.8} onPress={() => setVisivel(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="add-circle-outline" size={30} color={'white'} style={{ marginRight: 10 }} />
              <Text style={theme.botoes.primaryButtonText}>Adicionar Veículo</Text>
            </View>
          </TouchableOpacity>
        </Card>

        <Modal
          visible={visivel}
          transparent
          animationType="fade"
          onRequestClose={() => setVisivel(false)}
        >
          <View style={clienteStyle.overlay}>
            <View style={clienteStyle.popup}>
              <Text style={clienteStyle.tituloModal}>Dados do Veículo</Text>

              <Text style={clienteStyle.textosModal}>Modelo</Text>
              <MeuTextInput onChangeText={text => setCarro(text)} maxLength={15} />

              <Text style={clienteStyle.textosModal}>Placa</Text>
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

        <Card title='Sugestões Próximas'>
          {dadosMock.map((item, index) => (

            <TouchableOpacity key={index} style={theme.cardUnicas.section}>
              <Image source={{ uri: item.imagem }} style={theme.cardUnicas.imagem} />

              <View style={theme.cardUnicas.info}>
                <Text style={theme.cardUnicas.nome}>{item.nome}</Text>
                <Text style={theme.cardUnicas.endereco}>{item.endereco}</Text>
              </View>

              <View style={theme.cardUnicas.distanciaBox}>
                <Text style={theme.cardUnicas.distancia}>{item.distancia.toFixed(1)} km</Text>
              </View>
            </TouchableOpacity>

          ))}
        </Card>

      </ScrollView>
    </Padrao>
  )
}

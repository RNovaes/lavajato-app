import { Header, Padrao } from '@/components/componentes';
import { theme } from '@/components/theme';
import { fotoPerfilHeader } from '@/hooks/fotoHeader';
import { ModalHeaderFoto } from '@/scripts/funcoes';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import clienteStyle from './estilos/clientes.style';
import { useRouter } from 'expo-router';

export default function Perfil() {

    const router = useRouter()

    const { foto, tirarFoto, escolherGaleria } = fotoPerfilHeader()
    const [modalFotoHeader, setModalFotoHeader] = useState(false)

    function mudarPagina(item: any) {
        if (item == 'Meus Dados'){
            router.push('/cliente/meusDados')
        }
    }

    return (

        <Padrao>

            <Header title='Meu Perfil' subtitle='Gerencie sua conta' foto={foto} onPress={() => setModalFotoHeader(true)}></Header>

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

                <View style={theme.card.section}>
                    {['Meus Dados', 'Minhas Avaliações', 'Configurações', 'Remover Conta', 'Sair da Conta'].map((item, index) => (
                        <TouchableOpacity key={index} style={clienteStyle.listItem} onPress={() => mudarPagina(item)}>
                            <Text style={clienteStyle.listText}>{item}</Text>
                            <Text style={clienteStyle.arrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

        </Padrao>
    );
}


import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Card, CardUnicas, Header, Padrao } from '@/components/componentes';
import { fotoPerfilHeader } from '@/hooks/fotoHeader';
import { ModalHeaderFoto } from '@/scripts/funcoes';
import { theme } from '@/components/theme';

export default function Agendamentos() {

    const { foto, tirarFoto, escolherGaleria } = fotoPerfilHeader()
    const [modalFotoHeader, setModalFotoHeader] = useState(false)

    type LavaJato = {
        id: string;
        nome: string;
        endereco: string;
        data: string; // km
        status: string;
        imagem: string;
    };

    const dadosMock: LavaJato[] = [
        {
            id: "1",
            nome: "Lava Jato Central",
            endereco: "Centro",
            data: "15/12/2025",
            status: "Concluído",
            imagem: "https://picsum.photos/200",
        },
        {
            id: "2",
            nome: "Brilho Car",
            endereco: "Zona Sul",
            data: "20/02/2025",
            status: "Pendente",
            imagem: "https://picsum.photos/201",
        },
        {
            id: "3",
            nome: "Auto Clean",
            endereco: "Zona Norte",
            data: "15/03/2025",
            status: "Concluído",
            imagem: "https://picsum.photos/202",
        },
        {
            id: "4",
            nome: "Lava Jato Central",
            endereco: "Centro",
            data: "15/12/2025",
            status: "Concluído",
            imagem: "https://picsum.photos/200",
        },
        {
            id: "5",
            nome: "Brilho Car",
            endereco: "Zona Sul",
            data: "20/02/2025",
            status: "Pendente",
            imagem: "https://picsum.photos/201",
        },
        {
            id: "6",
            nome: "Auto Clean",
            endereco: "Zona Norte",
            data: "15/03/2025",
            status: "Concluído",
            imagem: "https://picsum.photos/202",
        },
    ];

    return (

        <Padrao>

            <Header title='Meus Agendamentos' subtitle='Aqui estão seus agendamentos!' foto={foto} onPress={() => setModalFotoHeader(true)}></Header>

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

                <View style={{ marginTop: 16 }}></View>

                {dadosMock.map((item, index) => (

                    <CardUnicas key={index}>

                        <Image source={{ uri: item.imagem }} style={theme.cardUnicas.imagem} />

                        <View style={theme.cardUnicas.info}>
                            <Text style={theme.cardUnicas.nome}>{item.nome}</Text>
                            <Text style={theme.cardUnicas.endereco}>{item.endereco}</Text>
                        </View>

                        <View style={theme.cardUnicas.distanciaBox}>
                            <Text style={theme.cardUnicas.distancia}>{item.status}</Text>
                        </View>

                    </CardUnicas>

                ))}

            </ScrollView>
        </Padrao>

    );
}
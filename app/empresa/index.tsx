
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, View } from "react-native";
import { Button, Text } from 'react-native-paper';
import empresaStyle from './empresa.style';

export default function ContinuarCadastro() {

    const router = useRouter();

    return (

        <View style={empresaStyle.container}>

            <Image
                source={require("../../assets/images/logoAlerta.png")}
                style={empresaStyle.ilustracao}
                resizeMode="contain"
            />

            <Text variant="headlineMedium" style={empresaStyle.titulo}>
                Complete seu cadastro
            </Text>

            <Text style={empresaStyle.descricao}>
                Forneça informações como horários, localização e serviços oferecidos.
                Isso leva menos de 5 minutos e ajuda seus clientes a saberem exatamente
                o que esperar.
            </Text>

            <Button
                mode="contained"
                style={empresaStyle.botao}
                onPress={() => router.push('/empresa/atualizarDados')}
            >
                <Text style={empresaStyle.textoBotao}>Continuar</Text>
            </Button>

            <Button
                mode="text"
                onPress={() => router.replace('/empresa/painel')}
            >
                <Text style={empresaStyle.textoPular}>Pular por enquanto</Text>
            </Button>
        </View>

    );
}

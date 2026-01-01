
import React from 'react';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import alertaStyle from '../estilos/empresa/alertaStyle';
import { Image, View } from "react-native";

export default function ContinuarCadastro() {

    const router = useRouter();

    return (

        <View style={alertaStyle.container}>

            <Image
                source={require("../../assets/images/logoAlerta.png")}
                style={alertaStyle.ilustracao}
                resizeMode="contain"
            />

            <Text variant="headlineMedium" style={alertaStyle.titulo}>
                Complete seu cadastro
            </Text>

            <Text style={alertaStyle.descricao}>
                Forneça informações como horários, localização e serviços oferecidos.
                Isso leva menos de 5 minutos e ajuda seus clientes a saberem exatamente
                o que esperar.
            </Text>

            <Button
                mode="contained"
                style={alertaStyle.botao}
                onPress={() => router.push('/empresa/atualizarDados')}
            >
                <Text style={alertaStyle.textoBotao}>Continuar</Text>
            </Button>

            <Button
                mode="text"
                onPress={() => router.replace('/empresa/painel')}
            >
                <Text style={alertaStyle.textoPular}>Pular por enquanto</Text>
            </Button>
        </View>

    );
}

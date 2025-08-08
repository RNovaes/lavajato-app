
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from "react-native/Libraries/Components/ActivityIndicator/ActivityIndicator";
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import paginaInicialStyle from './estilos/paginaInicial';
import { useFocusEffect } from '@react-navigation/native';
import MeuTextInput from '@/components/MeuTextInput';

export default function paginaInicial() {

    const initialRef: any = null;
    const emailInputRef = useRef(initialRef);

    useFocusEffect(
        React.useCallback(() => {
            const timeout = setTimeout(() => {
                emailInputRef.current?.focus();
            }, 100);

            return () => clearTimeout(timeout);
        }, [])
    );

    const router = useRouter()

    const [esconderSenha, setMostrarSenha] = useState(true)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const [mensagemDeErroEmail, setmensagemDeErroEmail] = useState('');
    const [mensagemDeErroSenha, setmensagemDeErroSenha] = useState('');

    const validarCampos = () => {

        let error = false

        const re = /\S+@\S+\.\S+/;
        if (!re.test(String(email).toLowerCase())) {
            Vibration.vibrate()
            setmensagemDeErroEmail("Por favor, preencher o campo e-mail corretamente")
            error = true
        }

        if (email.length > 50) {
            Vibration.vibrate()
            setmensagemDeErroEmail("Limite máximo de 60 caracteres")
            error = true
        }

        if (senha == null || senha.length < 6) {
            Vibration.vibrate()
            setmensagemDeErroSenha("Por favor, preencher o campo senha (Mínimo de 6 caracteres)")
            error = true
        }
        return !error

    }

    const fazerLogin = async () => {
        if (validarCampos()) {
            router.replace("/(tabs)")
        }
    }

    const irCadastro = () => {
        router.replace("/cadastro")
    }

    return (

        <View style={paginaInicialStyle.container}>

            <Text style={paginaInicialStyle.titulo}>Cadastre-se{'\n'}ou entre</Text>

            {mensagemDeErroEmail &&
                <Text style={paginaInicialStyle.mensagemErro}>{mensagemDeErroEmail}</Text>
            }
            <MeuTextInput
                label="E-mail"
                style={paginaInicialStyle.input}
                ref={emailInputRef}
                maxLength={50}
                keyboardType="email-address"
                onChangeText={value => {
                    setEmail(value)
                    setmensagemDeErroEmail('')
                }}
            />

            {mensagemDeErroSenha &&
                <Text style={paginaInicialStyle.mensagemErro}>{mensagemDeErroSenha}</Text>
            }
            <View>
                <MeuTextInput
                    label="Senha"
                    style={paginaInicialStyle.input}
                    secureTextEntry={esconderSenha}
                    maxLength={18}
                    onChangeText={value => {
                        setSenha(value)
                        setmensagemDeErroSenha('')
                    }}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!esconderSenha)} style={paginaInicialStyle.icone}>
                    <Ionicons
                        name={esconderSenha ? 'eye-off' : 'eye'}
                        size={24}
                        color="#6B7280"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={paginaInicialStyle.botaoSecundario} onPress={() => fazerLogin()}>
                <Text style={paginaInicialStyle.textoBotaoSecundario}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={paginaInicialStyle.esqueciSenha}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <View style={paginaInicialStyle.dividirContainer}>
                <View style={paginaInicialStyle.separar} />
                <Text style={paginaInicialStyle.orTexto}>ou</Text>
                <View style={paginaInicialStyle.separar} />
            </View>

            <TouchableOpacity style={paginaInicialStyle.botaoPrimario} onPress={() => irCadastro()}>
                <Text style={paginaInicialStyle.textoBotaoPrimario}>CADASTRAR-SE</Text>
            </TouchableOpacity>

        </View>
    )
}

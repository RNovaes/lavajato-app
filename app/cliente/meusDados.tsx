

import React, { useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal, Vibration, } from 'react-native';
import meusDadosStyle from './estilos/meusDados.style';
import { maskTelefone } from '@/scripts/mascaras';
import { useRouter } from 'expo-router';
import { validarTelefone } from '@/scripts/funcoes';
import { Ionicons } from '@expo/vector-icons';
import { Padrao } from '@/components/componentes';

export default function MeusDados() {

    const rota = useRouter()

    const initialRef: any = null;
    const nomeInputRef = useRef(initialRef);
    const telefonelnputRef = useRef(initialRef);

    const dadosIniciais = {
        nome: 'Lava Jato Brilho Rápido',
        telefone: '(11) 99999-9999',
    };

    const [nome, setNome] = useState(dadosIniciais.nome);
    const [telefone, setTelefone] = useState(dadosIniciais.telefone);
    const [focusedNome, setFocusedNome] = useState(false)
    const [focusedTelefone, setFocusedTelefone] = useState(false)
    const [mensagemErroNome, setMensagemErroNome] = useState('');
    const [mensagemErroTelefone, setMensagemErroTelefone] = useState('');

    const [senhaModalVisible, setSenhaModalVisible] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [esconderSenha, setMostrarSenha] = useState(true);
    const [esconderNovaSenha, setMostrarNovaSenha] = useState(true);
    const [esconderConfirmacaoSenha, setMostrarConfirmacaoSenha] = useState(true);

    const email = 'contato@brilhorapido.com';

    const houveAlteracao =
        nome !== dadosIniciais.nome ||
        telefone !== dadosIniciais.telefone;

    function validarAlteracoes() {

        let error = false
        setMensagemErroNome('')
        setMensagemErroTelefone('')

        if (nome == '' || nome.length < 3 || nome.length > 50) {
            Vibration.vibrate()
            setMensagemErroNome("Preencha o Campo Nome Corretamente")
            nomeInputRef.current.focus();
            error = true
        }

        if (!validarTelefone(telefone)) {
            Vibration.vibrate()
            setMensagemErroTelefone("Número de telefone inválido")
            telefonelnputRef.current.focus();
            error = true
        }

        return !error

    }

    function salvarAlteracoes() {

        if (validarAlteracoes()) {

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            rota.replace('/empresa/painel')

        }

    }

    function salvarNovaSenha() {

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            return Alert.alert('Erro', 'Preencha todos os campos');
        }

        if (novaSenha !== confirmarSenha) {
            return Alert.alert('Erro', 'As senhas não coincidem');
        }

        if (novaSenha.length < 6) {
            return Alert.alert('Erro', 'Senha muito curta');
        }

        Alert.alert('Sucesso', 'Senha alterada com sucesso');
        setSenhaModalVisible(false);

    }

    function fecharModal() {
        setSenhaAtual('')
        setNovaSenha('')
        setConfirmarSenha('')
        setSenhaModalVisible(false)
    }

    return (

        <Padrao>
            <View style={meusDadosStyle.container}>
                <Text style={meusDadosStyle.title}>Meus Dados</Text>

                {mensagemErroNome && <Text style={meusDadosStyle.mensagemErro}>{mensagemErroNome}</Text>}
                <View style={meusDadosStyle.field}>
                    <Text style={meusDadosStyle.label}>Nome do estabelecimento</Text>
                    <TextInput
                        ref={nomeInputRef}
                        value={nome}
                        onChangeText={text => {
                            setNome(text)
                            setMensagemErroNome('')
                        }}
                        maxLength={50}
                        style={[meusDadosStyle.input, focusedNome && meusDadosStyle.inputFocused]}
                        placeholder="Nome do lava jato"
                        onFocus={() => setFocusedNome(true)}
                        onBlur={() => setFocusedNome(false)}
                    />
                </View>

                <View style={meusDadosStyle.field}>
                    <Text style={meusDadosStyle.label}>E-mail</Text>
                    <TextInput
                        value={email}
                        editable={false}
                        style={[meusDadosStyle.input, meusDadosStyle.inputDisabled]}
                    />
                </View>

                {mensagemErroTelefone && <Text style={meusDadosStyle.mensagemErro}>{mensagemErroTelefone}</Text>}
                <View style={meusDadosStyle.field}>
                    <Text style={meusDadosStyle.label}>Telefone</Text>
                    <TextInput
                        ref={telefonelnputRef}
                        value={telefone}
                        onChangeText={text => {
                            setTelefone(maskTelefone(text))
                            setMensagemErroTelefone('')
                        }}
                        keyboardType="phone-pad"
                        style={[meusDadosStyle.input, focusedTelefone && meusDadosStyle.inputFocused]}
                        onFocus={() => setFocusedTelefone(true)}
                        onBlur={() => setFocusedTelefone(false)}
                    />
                </View>

                {/* ALTERAR SENHA */}
                <TouchableOpacity
                    style={meusDadosStyle.passwordButton}
                    onPress={() => setSenhaModalVisible(true)}
                >
                    <Text style={meusDadosStyle.passwordText}>Alterar senha</Text>
                </TouchableOpacity>

                {/* SALVAR */}
                <TouchableOpacity
                    style={[
                        meusDadosStyle.saveButton,
                        !houveAlteracao && { opacity: 0.5 },
                    ]}
                    disabled={!houveAlteracao}
                    onPress={salvarAlteracoes}
                >
                    <Text style={meusDadosStyle.saveButtonText}>Salvar alterações</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={senhaModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setSenhaModalVisible(false)}
            >
                <View style={meusDadosStyle.modalOverlay}>
                    <View style={meusDadosStyle.modalContent}>
                        <Text style={meusDadosStyle.modalTitle}>Alterar senha</Text>

                        <View>
                            <TextInput
                                placeholder="Senha atual"
                                secureTextEntry={esconderSenha}
                                style={meusDadosStyle.input}
                                value={senhaAtual}
                                onChangeText={setSenhaAtual}
                            />
                            <TouchableOpacity onPress={() => setMostrarSenha(!esconderSenha)} style={meusDadosStyle.icone}>
                                <Ionicons
                                    name={esconderSenha ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TextInput
                                placeholder="Nova senha"
                                secureTextEntry={esconderNovaSenha}
                                style={meusDadosStyle.input}
                                value={novaSenha}
                                onChangeText={setNovaSenha}
                            />
                            <TouchableOpacity onPress={() => setMostrarNovaSenha(!esconderNovaSenha)} style={meusDadosStyle.icone}>
                                <Ionicons
                                    name={esconderNovaSenha ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TextInput
                                placeholder="Confirmar nova senha"
                                secureTextEntry={esconderConfirmacaoSenha}
                                style={meusDadosStyle.input}
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />
                            <TouchableOpacity onPress={() => setMostrarConfirmacaoSenha(!esconderConfirmacaoSenha)} style={meusDadosStyle.icone}>
                                <Ionicons
                                    name={esconderConfirmacaoSenha ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={meusDadosStyle.saveButton}
                            onPress={salvarNovaSenha}
                        >
                            <Text style={meusDadosStyle.saveButtonText}>Salvar senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => fecharModal()}>
                            <Text style={meusDadosStyle.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </Padrao>

    );
}
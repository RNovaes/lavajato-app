
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import perfilStyle from './estilos/perfil.style';
import { maskTelefone } from '@/scripts/mascaras';
import { useRouter } from 'expo-router';
import { validarTelefone } from '@/scripts/funcoes';
import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {

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

  const cpfCnpj = '12.345.678/0001-99';
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

  function fecharModal(){
    setSenhaAtual('')
    setNovaSenha('')
    setConfirmarSenha('')
    setSenhaModalVisible(false)
  }

  return (
    <SafeAreaView style={perfilStyle.safeArea}>
      <ScrollView contentContainerStyle={perfilStyle.container}>
        <Text style={perfilStyle.title}>Perfil do Lava Jato</Text>

        {/* NOME */}
        {mensagemErroNome && <Text style={perfilStyle.mensagemErro}>{mensagemErroNome}</Text>}
        <View style={perfilStyle.field}>
          <Text style={perfilStyle.label}>Nome do estabelecimento</Text>
          <TextInput
            ref={nomeInputRef}
            value={nome}
            onChangeText={text => {
              setNome(text)
              setMensagemErroNome('')
            }}
            maxLength={50}
            style={[perfilStyle.input, focusedNome && perfilStyle.inputFocused]}
            placeholder="Nome do lava jato"
            onFocus={() => setFocusedNome(true)}
            onBlur={() => setFocusedNome(false)}
          />
        </View>

        {/* CPF / CNPJ */}
        <View style={perfilStyle.field}>
          <Text style={perfilStyle.label}>CPF / CNPJ</Text>
          <TextInput
            value={cpfCnpj}
            editable={false}
            style={[perfilStyle.input, perfilStyle.inputDisabled]}
          />
        </View>

        {/* EMAIL */}
        <View style={perfilStyle.field}>
          <Text style={perfilStyle.label}>E-mail</Text>
          <TextInput
            value={email}
            editable={false}
            style={[perfilStyle.input, perfilStyle.inputDisabled]}
          />
        </View>

        {/* TELEFONE */}
        {mensagemErroTelefone && <Text style={perfilStyle.mensagemErro}>{mensagemErroTelefone}</Text>}
        <View style={perfilStyle.field}>
          <Text style={perfilStyle.label}>Telefone</Text>
          <TextInput
            ref={telefonelnputRef}
            value={telefone}
            onChangeText={text => {
              setTelefone(maskTelefone(text))
              setMensagemErroTelefone('')
            }}
            keyboardType="phone-pad"
            style={[perfilStyle.input, focusedTelefone && perfilStyle.inputFocused]}
            onFocus={() => setFocusedTelefone(true)}
            onBlur={() => setFocusedTelefone(false)}
          />
        </View>

        {/* ALTERAR SENHA */}
        <TouchableOpacity
          style={perfilStyle.passwordButton}
          onPress={() => setSenhaModalVisible(true)}
        >
          <Text style={perfilStyle.passwordText}>Alterar senha</Text>
        </TouchableOpacity>

        {/* SALVAR */}
        <TouchableOpacity
          style={[
            perfilStyle.saveButton,
            !houveAlteracao && { opacity: 0.5 },
          ]}
          disabled={!houveAlteracao}
          onPress={salvarAlteracoes}
        >
          <Text style={perfilStyle.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={senhaModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSenhaModalVisible(false)}
      >
        <View style={perfilStyle.modalOverlay}>
          <View style={perfilStyle.modalContent}>
            <Text style={perfilStyle.modalTitle}>Alterar senha</Text>

            <View>
              <TextInput
                placeholder="Senha atual"
                secureTextEntry={esconderSenha}
                style={perfilStyle.input}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!esconderSenha)} style={perfilStyle.icone}>
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
                style={perfilStyle.input}
                value={novaSenha}
                onChangeText={setNovaSenha}
              />
              <TouchableOpacity onPress={() => setMostrarNovaSenha(!esconderNovaSenha)} style={perfilStyle.icone}>
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
                style={perfilStyle.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarConfirmacaoSenha(!esconderConfirmacaoSenha)} style={perfilStyle.icone}>
                <Ionicons
                  name={esconderConfirmacaoSenha ? 'eye-off' : 'eye'}
                  size={24}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={perfilStyle.saveButton}
              onPress={salvarNovaSenha}
            >
              <Text style={perfilStyle.saveButtonText}>Salvar senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => fecharModal()}>
              <Text style={perfilStyle.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
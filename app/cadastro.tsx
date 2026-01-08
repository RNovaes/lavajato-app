
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import cadastroStyle from './cadastro.style';
import { useFocusEffect } from '@react-navigation/native';
import MeuTextInput from '@/components/MeuTextInput';
import { Ionicons } from '@expo/vector-icons';
import { SegmentedButtons, Checkbox } from 'react-native-paper';
import { maskCNPJ, maskCPF } from '@/scripts/mascaras';


export default function Cadastro() {

    const initialRef: any = null;
    const nomeInputRef = useRef(initialRef);
    const emailnputRef = useRef(initialRef);
    const senhaInputRef = useRef(initialRef);
    const cnpjInputRef = useRef(initialRef);
    const cpfInputRef = useRef(initialRef);
    const nomeEmpresaInputRef = useRef(initialRef);
    const emailEmpresaInputRef = useRef(initialRef);
    const senhaEmpresaInputRef = useRef(initialRef);

    const toggleCnpj = () => {
        setTemCnpj(!temCnpj);
    };

    const [temCnpj, setTemCnpj] = useState(false);
    const [tipo, setTipo] = useState('usuario');
    const [esconderSenha, setMostrarSenha] = useState(true)

    //Dados Cliente
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    //Mensagens de Erro Cliente
    const [mensagemErroNome, setmensagemErroNome] = useState('');
    const [mensagemErroEmail, setmensagemErroEmail] = useState('');
    const [mensagemErroSenha, setmensagemErroSenha] = useState('');

    //Dados Empresa
    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomeEmpresa, setnomeEmpresa] = useState('');
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [senhaEmpresa, setSenhaEmpresa] = useState('');

    //Mensagens de Erro Empresa
    const [mensagemErronomeEmpresa, setmensagemErronomeEmpresa] = useState('');
    const [mensagemErroEmailEmpresa, setmensagemErroEmailEmpresa] = useState('');
    const [mensagemErroSenhaEmpresa, setmensagemErroSenhaEmpresa] = useState('');
    const [mensagemErroCpf, setmensagemErroCpf] = useState('');
    const [mensagemErroCnpj, setmensagemErroCnpj] = useState('');

    //Foco nos inputs
    useFocusEffect(
        React.useCallback(() => {
            const timeout = setTimeout(() => {
                if (tipo === 'usuario') {
                    nomeInputRef.current?.focus();
                } else {
                    if (temCnpj) {
                        cnpjInputRef.current?.focus();
                    } else {
                        cpfInputRef.current?.focus();
                    }
                }
            }, 100);
            return () => clearTimeout(timeout);
        }, [tipo, temCnpj])
    );

    const validarCamposUsuario = () => {

        let error = false
        setmensagemErroNome('')
        setmensagemErroEmail('')
        setmensagemErroSenha('')

        if (nome == '' || nome.length < 3 || nome.length > 50) {
            Vibration.vibrate()
            setmensagemErroNome("Preencha o Campo Nome Corretamente")
            nomeInputRef.current.focus();
            error = true
        }

        const re = /\S+@\S+\.\S+/;
        if (!re.test(String(email).toLowerCase())) {
            Vibration.vibrate()
            setmensagemErroEmail("Preencha o Campo E-mail Corretamente")
            emailnputRef.current.focus();
            error = true
        }
        if (senha == '' || senha.length < 6) {
            Vibration.vibrate()
            setmensagemErroSenha("Mínimo de 6 Caracteres")
            senhaInputRef.current.focus();
            error = true
        }
        if (senha.length > 18) {
            Vibration.vibrate()
            setmensagemErroSenha("Máximo de 18 Caracteres")
            error = true
        }
        return !error
    }

    const validarCamposEmpresa = () => {

        let error = false
        setmensagemErronomeEmpresa('')
        setmensagemErroCpf('')
        setmensagemErroCnpj('')
        setmensagemErroEmailEmpresa('')
        setmensagemErroSenhaEmpresa('')

        if (nomeEmpresa == '' || nomeEmpresa.length < 3 || nomeEmpresa.length > 100) {
            Vibration.vibrate()
            setmensagemErronomeEmpresa("Preencha o Campo Nome Corretamente")
            nomeEmpresaInputRef.current.focus();
            error = true
        }

        if (cpf == '' && cnpj == '') {
            Vibration.vibrate()
            setmensagemErroCpf("Cpf ou Cnpj precisam ser incluídos!")
            setmensagemErroCnpj("Cnpj ou Cpf precisam ser incluídos!")
            error = true
        }

        if (cpf && cpf.length < 14) {
            Vibration.vibrate()
            setmensagemErroCpf("Preencha o Campo Cpf Corretamente")
            error = true
        }

        if (cnpj && cnpj.length < 18) {
            Vibration.vibrate()
            setmensagemErroCnpj("Preencha o Campo Cnpj Corretamente")
            error = true
        }

        const regE = /\S+@\S+\.\S+/;
        if (!regE.test(String(emailEmpresa).toLowerCase())) {
            Vibration.vibrate()
            setmensagemErroEmailEmpresa("Preencha o Campo E-mail Corretamente")
            emailEmpresaInputRef.current.focus();
            error = true
        }
        if (senhaEmpresa == '' || senhaEmpresa.length < 6) {
            Vibration.vibrate()
            setmensagemErroSenhaEmpresa("Mínimo de 6 Caracteres")
            senhaEmpresaInputRef.current.focus();
            error = true
        }
        if (senhaEmpresa.length > 18) {
            Vibration.vibrate()
            setmensagemErroSenhaEmpresa("Máximo de 18 Caracteres")
            error = true
        }
        return !error
    }

    const cadastrarUsuario = () => {
        if (validarCamposUsuario()) {

            let data = {
                nome: nome,
                email: email,
                senha: senha
            }

            console.log(data)
            router.replace("/")
        }
    };

    const cadastrarEmpresa = () => {
        if (validarCamposEmpresa()) {

            let data = {
                cpf: cpf,
                cnpj: cnpj,
                nome: nomeEmpresa,
                email: emailEmpresa,
                senha: senhaEmpresa
            }

            console.log(data)
            router.replace("/")
        }
    };

    return (

        <View style={cadastroStyle.container}>

            <Text style={cadastroStyle.titulo}>Cadastro</Text>

            <SegmentedButtons
                value={tipo}
                onValueChange={setTipo}
                buttons={[
                    {
                        value: 'usuario', label: 'Usuário', style: [
                            tipo === 'usuario' && cadastroStyle.botaoSelecionado
                        ],
                        labelStyle: tipo === 'usuario' ? cadastroStyle.textoSelecionado : cadastroStyle.textoNormal
                    },
                    {
                        value: 'comercio', label: 'Loja', style: [
                            tipo === 'comercio' && cadastroStyle.botaoSelecionado
                        ],
                        labelStyle: tipo === 'comercio' ? cadastroStyle.textoSelecionado : cadastroStyle.textoNormal
                    },
                ]}
                style={{ margin: 16 }}
            />

            {tipo === 'usuario' ? (

                <>

                    {mensagemErroNome && <Text style={cadastroStyle.mensagemErro}>{mensagemErroNome}</Text>}
                    <MeuTextInput
                        ref={nomeInputRef}
                        label="Nome"
                        style={cadastroStyle.input}
                        maxLength={50}
                        onChangeText={text => {
                            setNome(text)
                            setmensagemErroNome('')
                        }}
                    />

                    {mensagemErroEmail && <Text style={cadastroStyle.mensagemErro}>{mensagemErroEmail}</Text>}
                    <MeuTextInput
                        ref={emailnputRef}
                        label="Email"
                        style={cadastroStyle.input}
                        maxLength={50}
                        value={email}
                        onChangeText={text => {
                            setEmail(text)
                            setmensagemErroEmail('')
                        }}
                    />

                    {mensagemErroSenha && <Text style={cadastroStyle.mensagemErro}>{mensagemErroSenha}</Text>}
                    <View>
                        <MeuTextInput
                            ref={senhaInputRef}
                            label="Senha"
                            secureTextEntry={esconderSenha}
                            style={cadastroStyle.input}
                            maxLength={18}
                            onChangeText={text => {
                                setSenha(text)
                                setmensagemErroSenha('')
                            }}
                        />
                        <TouchableOpacity onPress={() => setMostrarSenha(!esconderSenha)} style={cadastroStyle.icone}>
                            <Ionicons
                                name={esconderSenha ? 'eye-off' : 'eye'}
                                size={24}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => cadastrarUsuario()} style={cadastroStyle.botaoSecundario}>
                        <Text style={cadastroStyle.textoBotaoSecundario}>Cadastrar</Text>
                    </TouchableOpacity>

                </>
            ) : (
                <>
                    <View style={cadastroStyle.checkboxContainer}>
                        <Checkbox
                            status={temCnpj ? 'checked' : 'unchecked'}
                            onPress={toggleCnpj}
                        />
                        <Text onPress={toggleCnpj} style={cadastroStyle.checkboxLabel}>
                            Possui CNPJ?
                        </Text>
                    </View>

                    {temCnpj ? (
                        <View>
                            {mensagemErroCnpj && <Text style={cadastroStyle.mensagemErro}>{mensagemErroCnpj}</Text>}
                            <MeuTextInput
                                label="Cnpj"
                                style={cadastroStyle.input}
                                ref={cnpjInputRef}
                                value={cnpj}
                                onChangeText={text => {
                                    setCnpj(maskCNPJ(text))
                                    setmensagemErroCnpj('')
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                    ) : (
                        <View>
                            {mensagemErroCpf && <Text style={cadastroStyle.mensagemErro}>{mensagemErroCpf}</Text>}
                            <MeuTextInput
                                label="Cpf"
                                style={cadastroStyle.input}
                                ref={cpfInputRef}
                                value={cpf}
                                onChangeText={text => {
                                    setCpf(maskCPF(text))
                                    setmensagemErroCpf('')
                                }}
                                keyboardType="numeric"
                            />
                        </View>
                    )}

                    {mensagemErronomeEmpresa && <Text style={cadastroStyle.mensagemErro}>{mensagemErronomeEmpresa}</Text>}
                    <MeuTextInput
                        ref={nomeEmpresaInputRef}
                        label="Nome do Estabelecimento"
                        style={cadastroStyle.input}
                        maxLength={100}
                        value={nomeEmpresa}
                        onChangeText={text => {
                            setnomeEmpresa(text)
                            setmensagemErronomeEmpresa('')
                        }}
                    />

                    {mensagemErroEmailEmpresa && <Text style={cadastroStyle.mensagemErro}>{mensagemErroEmailEmpresa}</Text>}
                    <MeuTextInput
                        ref={emailEmpresaInputRef}
                        label="Email"
                        style={cadastroStyle.input}
                        maxLength={50}
                        value={emailEmpresa}
                        onChangeText={text => {
                            setEmailEmpresa(text)
                            setmensagemErroEmailEmpresa('')
                        }}
                    />

                    {mensagemErroSenhaEmpresa && <Text style={cadastroStyle.mensagemErro}>{mensagemErroSenhaEmpresa}</Text>}
                    <View>
                        <MeuTextInput
                            ref={senhaEmpresaInputRef}
                            label="Senha"
                            secureTextEntry={esconderSenha}
                            style={cadastroStyle.input}
                            maxLength={18}
                            value={senhaEmpresa}
                            onChangeText={text => {
                                setSenhaEmpresa(text)
                                setmensagemErroSenhaEmpresa('')
                            }}
                        />
                        <TouchableOpacity onPress={() => setMostrarSenha(!esconderSenha)} style={cadastroStyle.icone}>
                            <Ionicons
                                name={esconderSenha ? 'eye-off' : 'eye'}
                                size={24}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => cadastrarEmpresa()} style={cadastroStyle.botaoSecundario}>
                        <Text style={cadastroStyle.textoBotaoSecundario}>Cadastrar</Text>
                    </TouchableOpacity>

                </>
            )}

            <TouchableOpacity onPress={() => router.replace('/')} style={cadastroStyle.dividir}>
                <Text style={cadastroStyle.esqueciSenha}>Já tem uma conta? Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
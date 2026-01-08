
// app/empresa/atualizardados.tsx
import { Card, CardInfo, ChipCust, Infos, PrimaryButton, SecondaryButton, Tag } from '@/components/componentes';
import { formatarHora } from '@/scripts/funcoes';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import Geocoder from 'react-native-geocoding';
import { Chip } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import atualizarStyle from './atualizarDados.style';

const BG = '#FFFFFF';

export default function AtualizarDadosEmpresa() {

    const rota = useRouter()

    const insets = useSafeAreaInsets();
    const [step, setStep] = useState(1);

    // ETAPA 1
    const [dias, setDias] = useState<string[]>([]);
    const [horaAbertura, setHoraAbertura] = useState<Date | null>(null);
    const [horaFechamento, setHoraFechamento] = useState<Date | null>(null);
    const [mesmoHorarioFimSemana, setMesmoHorarioFimSemana] = useState(true)
    const [horaAberturaSabado, setHoraAberturaSabado] = useState<Date | null>(null);
    const [horaAberturaDomingo, setHoraAberturaDomingo] = useState<Date | null>(null);
    const [horaFechamentoSabado, setHoraFechamentoSabado] = useState<Date | null>(null);
    const [horaFechamentoDomingo, setHoraFechamentoDomingo] = useState<Date | null>(null);
    const [endereco, setEndereco] = useState<string>("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [focusedRua, setFocusedRua] = useState(false);
    const [focusedNumero, setFocusedNumero] = useState(false);
    const [focusedBairro, setFocusedBairro] = useState(false);
    const [focusedCidade, setFocusedCidade] = useState(false);
    const [focusedEstado, setFocusedEstado] = useState(false);

    function toggleArray(value: string, array: string[], setArray: any) {
        setArray(array.includes(value)
            ? array.filter(v => v !== value)
            : [...array, value]
        );
    }

    type CampoHorario =
        | 'abertura'
        | 'fechamento'
        | 'aberturaSabado'
        | 'fechamentoSabado'
        | 'aberturaDomingo'
        | 'fechamentoDomingo'
        | null;

    const [campoHorario, setCampoHorario] = useState<CampoHorario>(null);

    function getHoraAtual(campo: CampoHorario) {
        switch (campo) {
            case 'abertura':
                return horaAbertura ?? new Date();
            case 'fechamento':
                return horaFechamento ?? new Date();
            case 'aberturaSabado':
                return horaAberturaSabado ?? new Date();
            case 'fechamentoSabado':
                return horaFechamentoSabado ?? new Date();
            case 'aberturaDomingo':
                return horaAberturaDomingo ?? new Date();
            case 'fechamentoDomingo':
                return horaFechamentoDomingo ?? new Date();
            default:
                return new Date();
        }
    }

    function aplicarHorario(campo: CampoHorario, date: Date) {
        switch (campo) {
            case 'abertura':
                setHoraAbertura(date);
                break;
            case 'fechamento':
                setHoraFechamento(date);
                break;
            case 'aberturaSabado':
                setHoraAberturaSabado(date);
                break;
            case 'fechamentoSabado':
                setHoraFechamentoSabado(date);
                break;
            case 'aberturaDomingo':
                setHoraAberturaDomingo(date);
                break;
            case 'fechamentoDomingo':
                setHoraFechamentoDomingo(date);
                break;
        }
    }

    useEffect(() => {
        if (mesmoHorarioFimSemana) {
            if (dias.includes('Sab') && dias.includes('Dom')) {
                setHoraAberturaSabado(horaAbertura);
                setHoraAberturaDomingo(horaAbertura);
                setHoraFechamentoSabado(horaFechamento);
                setHoraFechamentoDomingo(horaFechamento);
            } else if (dias.includes('Sab')) {
                setHoraAberturaSabado(horaAbertura);
                setHoraFechamentoSabado(horaFechamento);
            } else if (dias.includes('Dom')) {
                setHoraAberturaDomingo(horaAbertura);
                setHoraFechamentoDomingo(horaFechamento);
            }
        } else {
            setHoraAberturaSabado(null);
            setHoraAberturaDomingo(null);
            setHoraFechamentoSabado(null);
            setHoraFechamentoDomingo(null);
        }
    }, [mesmoHorarioFimSemana, horaAbertura, horaFechamento]);


    const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleApiKey;

    useEffect(() => {
        if (GOOGLE_API_KEY) {
            Geocoder.init(GOOGLE_API_KEY);
        }
    }, []);

    // Geocoder.init(GOOGLE_API_KEY);

    const obterLocalizacao = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permissão negada");
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        atualizarEndereco(latitude, longitude);
    };

    const atualizarEndereco = (latitude: number, longitude: number) => {
        Geocoder.from(latitude, longitude)
            .then(json => {
                const formattedAddress = json.results[0].formatted_address;
                setEndereco(formattedAddress);
            })
            .catch(error => console.warn(error));
    };

    const geocodificarEndereco = async () => {
        const enderecoCompleto = montarEndereco();

        console.log('Endereço enviado:', enderecoCompleto);
        setEndereco(enderecoCompleto)

        try {
            const resultado = await Geocoder.from(enderecoCompleto);

            if (!resultado.results.length) {
                Alert.alert('Endereço não encontrado');
                return;
            }

            const { lat, lng } = resultado.results[0].geometry.location;

            setLatitude(lat);
            setLongitude(lng);
        } catch (error) {
            console.log('Erro ao geocodificar:', error);
            Alert.alert('Erro ao validar endereço');
        }
    };

    const montarEndereco = () => {
        return `${rua}, ${numero}, ${bairro}, ${cidade} - ${estado}, Brasil`;
    };

    // ============================================== ETAPA 2 ================================================================

    const veiculosDisponiveis = [
        "Sedan",
        "Hatch",
        "SUV",
        "Picape",
        "Van",
        "Carga"
    ];
    const [focused, setFocused] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [focusedInputHorario, setFocusedInputHorario] = useState<string | null>(null);
    const [capacidade, setCapacidade] = useState('');
    const [veiculos, setVeiculos] = useState<string[]>([])
    const [valorLavagem, setValorLavagem] = useState<Record<string, number | null>>({});
    const [checkVeiculos, setcheckVeiculos] = useState(false)

    const toggleVeiculo = (tipo: string) => {
        setcheckVeiculos(true)
        setVeiculos(prev => {
            if (prev.includes(tipo)) {
                return prev.filter(i => i !== tipo);
            }
            return [...prev, tipo];
        });
    };

    function atualizarTempo(
        veiculo: string,
        campo: 'horas' | 'minutos',
        valor: string
    ) {
        setTempoVeiculo(prev => ({
            ...prev,
            [veiculo]: {
                ...prev[veiculo],
                [campo]: valor,
            },
        }));
    }

    type TempoValue = {
        horas: string;
        minutos: string;
    };

    const [tempoVeiculo, setTempoVeiculo] = useState<Record<string, TempoValue>>({
        Sedan: { horas: '', minutos: '' },
        Hatch: { horas: '', minutos: '' },
        SUV: { horas: '', minutos: '' },
        Picape: { horas: '', minutos: '' },
        Van: { horas: '', minutos: '' },
        Carga: { horas: '', minutos: '' },
    });

    // ============================================== ETAPA 3 ================================================================

    const servicosDisponiveis = [
        "Lavagem Interna",
        "Lavagem Externa",
        "Enceramento",
        "Polimento",
        "Delivery",
        "Lavagem de Motor"
    ];

    const [servicos, setServicos] = useState<string[]>([]);
    const [pagamentos, setPagamentos] = useState<string[]>([]);
    const [checkServicos, setcheckServicos] = useState(false)

    const toggleServico = (item: string) => {
        setcheckServicos(true)
        setServicos(prev => {
            if (prev.includes(item)) {
                return prev.filter(i => i !== item);
            }
            return [...prev, item];
        });
    };

    function togglePagamentos(pagamento: string) {
        setPagamentos(prev =>
            prev.includes(pagamento)
                ? prev.filter(p => p !== pagamento)
                : [...prev, pagamento]
        );
    }

    // function servicosValores(servico: string, valor: number | null) {
    //     setServicosValores(prev => ({
    //         ...prev,
    //         [servico]: {
    //             ...prev[servico],
    //             valor,
    //         },
    //     }));
    // }

    // type Serv = {
    //     servico: string;
    //     valor: number | null;
    // };

    const [servicosValores, setServicosValores] = useState<
        Record<string, number | null>
    >({});


    function atualizarServico(servico: string, valor: number | null) {
        setServicosValores(prev => ({
            ...prev,
            [servico]: valor,
        }));
    }

    const servicosArray = Object.entries(servicosValores).map(
        ([servico, valor]) => ({ servico, valor })
    );


    // const [servicosValoresJuntos, setServicosValores] = useState<Record<string, Serv>>({
    //     "Lavagem Interna": { servico: "Lavagem Interna", valor: null },
    //     "Lavagem Externa": { servico: "Lavagem Externa", valor: null },
    //     Enceramento: { servico: "Enceramento", valor: null },
    //     Polimento: { servico: "Polimento", valor: null },
    //     Delivery: { servico: "Delivery", valor: null },
    //     "Lavagem de Motor": { servico: "Lavagem de Motor", valor: null },
    // });


    function finalizarCadastro() {

        const dados = {
            dias: dias,
            horarios: {
                semana: {
                    abertura: horaAbertura ? formatarHora(horaAbertura) : null,
                    fechamento: horaFechamento ? formatarHora(horaFechamento) : null,
                },
                sabado: {
                    abertura: horaAberturaSabado ? formatarHora(horaAberturaSabado) : null,
                    fechamento: horaFechamentoSabado ? formatarHora(horaFechamentoSabado) : null,
                },
                domingo: {
                    abertura: horaAberturaDomingo ? formatarHora(horaAberturaDomingo) : null,
                    fechamento: horaFechamentoDomingo ? formatarHora(horaFechamentoDomingo) : null,
                },
            },
            endereco: endereco,
            latitude: latitude,
            longitude: longitude,
            capacidade: Number(capacidade),
            tipos_veiculos: veiculos,
            tempoVeiculo: tempoVeiculo,
            valorlavagemcompleta: valorLavagem,
            servicos_adicionais: servicos,
            pagamentos: pagamentos,
            imagemUrl: require('../../assets/images/ChatGPT Image 5 de jan. de 2026, 16_53_57.png'),
            valores_servicos: servicosArray
        }
        console.log(dados)

        // if (!rua || !numero || !cidade || !estado) {
        //     Alert.alert('Preencha todos os campos obrigatórios');
        //     return;
        // }

        rota.replace('/empresa/painel')

    }

    return (

        <SafeAreaView style={atualizarStyle.safeArea} edges={['top']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView style={{ flex: 1, backgroundColor: BG }} contentContainerStyle={{ padding: 16 }} removeClippedSubviews={false} keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}>
                    <Stack.Screen options={{ title: 'Completar cadastro' }} />

                    <Text style={{ fontSize: 14, color: '#6B7280' }}>
                        Etapa {step} de 3
                    </Text>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 12 }}>Quando e onde você atende</Text>

                            <Card title="Dias de funcionamento">
                                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map(d => (
                                    <Tag key={d} active={dias.includes(d)} onPress={() => toggleArray(d, dias, setDias)} label={d} />
                                ))}
                            </Card>

                            <Card title="Horário">
                                <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('abertura')}>
                                    <Text>
                                        {horaAbertura
                                            ? horaAbertura.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                            : 'Selecionar horário de abertura'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('fechamento')}>
                                    <Text>
                                        {horaFechamento
                                            ? horaFechamento.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                            : 'Selecionar horário de fechamento'}
                                    </Text>
                                </TouchableOpacity>

                                {(dias.includes('Sab') || dias.includes('Dom')) && (
                                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                        <Text>Mesmo horário aos finais de semana</Text>
                                        <Switch
                                            value={mesmoHorarioFimSemana}
                                            onValueChange={setMesmoHorarioFimSemana}
                                        />
                                    </View>
                                )}
                            </Card>

                            {!mesmoHorarioFimSemana && (
                                <Card title="Horário fim de semana">

                                    {dias.includes('Sab') && (
                                        <View>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Sábado</Text>
                                            <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('aberturaSabado')}>
                                                <Text>
                                                    {horaAberturaSabado
                                                        ? horaAberturaSabado.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                                        : 'Selecionar horário de abertura'}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('fechamentoSabado')}>
                                                <Text>
                                                    {horaFechamentoSabado
                                                        ? horaFechamentoSabado.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                                        : 'Selecionar horário de fechamento'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {dias.includes('Dom') && (
                                        <View>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Domingo</Text>
                                            <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('aberturaDomingo')}>
                                                <Text>
                                                    {horaAberturaDomingo
                                                        ? horaAberturaDomingo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                                        : 'Selecionar horário de abertura'}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={atualizarStyle.in} onPress={() => setCampoHorario('fechamentoDomingo')}>
                                                <Text>
                                                    {horaFechamentoDomingo
                                                        ? horaFechamentoDomingo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                                                        : 'Selecionar horário de fechamento'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </Card>
                            )}

                            <Card title="Localização">

                                {/* <TextInput
                                    placeholder="Rua, Número, Cidade - UF"
                                    value={endereco}
                                    onChangeText={setEndereco}
                                    style={[
                                        atualizarStyle.in,
                                        focusedLocalizacao && atualizarStyle.inputFocused,
                                    ]}
                                    onFocus={() => setFocusedLocalzacao(true)}
                                    onBlur={() => setFocusedLocalzacao(false)}
                                    maxLength={50}
                                /> */}

                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
                                    <TextInput
                                        placeholder="Rua / Avenida"
                                        value={rua}
                                        onChangeText={setRua}
                                        style={[
                                            atualizarStyle.in,
                                            focusedRua && atualizarStyle.inputFocused,
                                        ]}
                                        onFocus={() => setFocusedRua(true)}
                                        onBlur={() => setFocusedRua(false)}
                                        maxLength={50}
                                    />

                                    <TextInput
                                        placeholder="Número"
                                        value={numero}
                                        onChangeText={setNumero}
                                        keyboardType="numeric"
                                        style={[
                                            { width: '30%', backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1 },
                                            focusedNumero && atualizarStyle.inputFocused,
                                        ]}
                                        onFocus={() => setFocusedNumero(true)}
                                        onBlur={() => setFocusedNumero(false)}
                                        maxLength={5}
                                    />

                                    <TextInput
                                        placeholder="Bairro"
                                        value={bairro}
                                        onChangeText={setBairro}
                                        style={[
                                            { width: '60%', backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1 },
                                            focusedBairro && atualizarStyle.inputFocused,
                                        ]}
                                        onFocus={() => setFocusedBairro(true)}
                                        onBlur={() => setFocusedBairro(false)}
                                        maxLength={20}
                                    />

                                    <TextInput
                                        placeholder="Cidade"
                                        value={cidade}
                                        onChangeText={setCidade}
                                        style={[
                                            { width: '60%', backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1 },
                                            focusedCidade && atualizarStyle.inputFocused,
                                        ]}
                                        onFocus={() => setFocusedCidade(true)}
                                        onBlur={() => setFocusedCidade(false)}
                                        maxLength={20}
                                    />

                                    <TextInput
                                        placeholder="UF"
                                        value={estado}
                                        onChangeText={(text) => setEstado(text.toUpperCase())}
                                        maxLength={2}
                                        autoCapitalize="characters"
                                        style={[
                                            { width: '30%', backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1 },
                                            focusedEstado && atualizarStyle.inputFocused,
                                        ]}
                                        onFocus={() => setFocusedEstado(true)}
                                        onBlur={() => setFocusedEstado(false)}
                                    />

                                </View>

                                <PrimaryButton onPress={geocodificarEndereco} label='Validar Endereço'></PrimaryButton>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                    <View style={{
                                        height: 2,
                                        width: '35%',
                                        backgroundColor: '#ccc',
                                        marginVertical: 10,
                                    }}>
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: '10%', marginRight: '10%' }}>ou</Text>
                                    <View style={{
                                        height: 2,
                                        width: '35%',
                                        backgroundColor: '#ccc',
                                        marginVertical: 10,
                                    }}>
                                    </View>
                                </View>

                                {endereco !== "" && (

                                    <View style={atualizarStyle.containerEndereco}>
                                        <Ionicons name="location-outline" size={20} color="#333" style={{ marginRight: 5 }} />
                                        <Text style={atualizarStyle.textoEndereco}>{endereco}</Text>
                                    </View>

                                )}

                                <PrimaryButton onPress={obterLocalizacao} label="Obter Localização" />

                            </Card>

                            {campoHorario && (
                                <DateTimePicker
                                    value={getHoraAtual(campoHorario)}
                                    mode="time"
                                    is24Hour
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        setCampoHorario(null);

                                        if (selectedDate) {
                                            aplicarHorario(campoHorario, selectedDate);
                                        }
                                    }}
                                />
                            )}

                        </>
                    )}

                    {/* ETAPA 2 */}
                    {step === 2 && (
                        <>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 12 }}>Capacidade e veículos</Text>


                            <CardInfo title="Capacidade simultânea">

                                <Infos texto="Informe quantos veículos podem ser atendidos ao mesmo tempo."></Infos>
                                <TextInput
                                    placeholder="Quantidade de carros"
                                    value={capacidade}
                                    onChangeText={setCapacidade}
                                    keyboardType="numeric"
                                    style={[atualizarStyle.in, focused && atualizarStyle.inputFocused,]}
                                    maxLength={2}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </CardInfo>

                            <Card title="Tipos de veículos">
                                <View style={atualizarStyle.chipContainer}>

                                    {veiculosDisponiveis.map((tipo, index) => (

                                        <View key={index}>

                                            <ChipCust
                                                label={tipo}
                                                active={veiculos.includes(tipo)}
                                                onPress={() => toggleVeiculo(tipo)}
                                            />

                                        </View>
                                    ))}
                                </View>
                            </Card>

                            {checkVeiculos && (
                                <Card title="Tempo Médio Por Veículo / Valores">

                                    {veiculos.map(vcl => (

                                        <View key={vcl} style={atualizarStyle.tempoContainer}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={atualizarStyle.tempoLabel}>{vcl}</Text>
                                                <Text style={atualizarStyle.tempoLabel}>{'Lavagem Completa'}</Text>
                                            </View>

                                            <View style={atualizarStyle.tempoInputs}>
                                                <TextInput
                                                    keyboardType="numeric"
                                                    placeholder="h"
                                                    value={tempoVeiculo[vcl]?.horas ?? ''}
                                                    onChangeText={text => atualizarTempo(vcl, 'horas', text)}
                                                    underlineColorAndroid="transparent"
                                                    style={[
                                                        atualizarStyle.tempoInput,
                                                        focusedInputHorario === vcl && atualizarStyle.inputFocused,
                                                    ]}
                                                    onFocus={() => setFocusedInputHorario(vcl)}
                                                    onBlur={() => setFocusedInputHorario(null)}
                                                    maxLength={1}
                                                />

                                                <Text style={atualizarStyle.tempoSeparador}>:</Text>

                                                <TextInput
                                                    keyboardType="numeric"
                                                    placeholder="min"
                                                    value={tempoVeiculo[vcl]?.minutos ?? ''}
                                                    onChangeText={text => atualizarTempo(vcl, 'minutos', text)}
                                                    style={[
                                                        atualizarStyle.tempoInput,
                                                        focusedInputHorario === vcl && atualizarStyle.inputFocused,
                                                    ]}
                                                    onFocus={() => setFocusedInputHorario(vcl)}
                                                    onBlur={() => setFocusedInputHorario(null)}
                                                    maxLength={2}
                                                />

                                                <View style={{ marginLeft: 12 }}>
                                                    <CurrencyInput
                                                        placeholder={'R$ 0,00'}
                                                        value={valorLavagem[vcl] ?? null}
                                                        onChangeValue={value =>
                                                            setValorLavagem(prev => ({
                                                                ...prev,
                                                                [vcl]: value,
                                                            }))
                                                        }
                                                        prefix="R$ "
                                                        delimiter="."
                                                        separator=","
                                                        precision={2}
                                                        keyboardType="numeric"
                                                        underlineColorAndroid="transparent"
                                                        style={[
                                                            atualizarStyle.inputValores,
                                                            focusedInput === vcl && atualizarStyle.inputFocused,
                                                        ]}
                                                        onFocus={() => setFocusedInput(vcl)}
                                                        onBlur={() => setFocusedInput(null)}
                                                    />
                                                </View>

                                            </View>
                                        </View>
                                    ))}
                                </Card>
                            )}
                        </>
                    )}

                    {/* ETAPA 3 */}
                    {step === 3 && (
                        <>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 12 }}>Serviços e pagamento</Text>

                            <CardInfo title="Serviços Adicionais">

                                <Infos texto='Aqui você pode informar todos os serviços adicionais que são oferecidos.'></Infos>
                                <View style={atualizarStyle.chipContainerServicos}>
                                    {servicosDisponiveis.map((item, index) => (

                                        <ChipCust
                                            key={index}
                                            label={item}
                                            active={servicos.includes(item)}
                                            onPress={() => toggleServico(item)}
                                        />

                                    ))}
                                </View>

                            </CardInfo>

                            {checkServicos && (

                                <>
                                    <Card title="Valores">

                                        {servicos.map(serv => (
                                            <View key={serv} style={{ marginBottom: 12 }}>
                                                <CurrencyInput
                                                    placeholder={'R$ - ' + serv}
                                                    value={servicosValores[serv] ?? null}
                                                    onChangeValue={(value) => atualizarServico(serv, value)}
                                                    prefix="R$ "
                                                    delimiter="."
                                                    separator=","
                                                    precision={2}
                                                    keyboardType="numeric"
                                                    style={[
                                                        atualizarStyle.inputValoresServicos,
                                                        focusedInput === serv && atualizarStyle.inputFocused,
                                                    ]}
                                                />
                                            </View>
                                        ))
                                        }
                                    </Card>

                                    <Text style={{ fontSize: 8 }}>Os valores informados acima, são referentes para todos os tipos de veiculos aceitos, caso os valores de serviços adicionais sejam diferentes
                                        para cada tipo de veículo, após o cadastro, procure no menu de serviços por "alterar valores", marque a caixa "valores diferentes por tipo de veículos" e informe os valores corretos.</Text>
                                </>
                            )}

                            <Card title="Formas de Pagamento">

                                <View style={atualizarStyle.chipContainer}>
                                    {['Dinheiro', 'Pix', 'Crédito', 'Débito'].map(item => (
                                        <ChipCust
                                            key={item}
                                            label={item}
                                            active={pagamentos.includes(item)}
                                            onPress={() => togglePagamentos(item)}
                                        />
                                    ))}
                                </View>

                            </Card>

                        </>
                    )}

                    <View style={[
                        atualizarStyle.footer,
                        { paddingBottom: insets.bottom + 12 },
                    ]}>
                        {step > 1 && <SecondaryButton label="Voltar" onPress={() => setStep(step - 1)} />}
                        <PrimaryButton label={step === 3 ? 'Finalizar cadastro' : 'Continuar'} onPress={() => step === 3 ? finalizarCadastro() : setStep(step + 1)} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >

    );
}




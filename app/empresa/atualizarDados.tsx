
// app/empresa/atualizardados.tsx
import { View, Text, TouchableOpacity, TextInput, ScrollView, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
import atualizarStyle from '../estilos/empresa/atualizarDadosStyle';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChipCust, SecondaryButton, PrimaryButton, Tag, Card } from '@/components/componentes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';
import { Chip } from 'react-native-paper';
import { useRouter } from 'expo-router'

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

    Geocoder.init('AIzaSyBlqY_dM9G3bbIV25dN0tQTBCvNOj76UYo');

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

    const [focusedLocalizacao, setFocusedLocalzacao] = useState(false);

    // ============================================== ETAPA 2 ================================================================

    const obrigatorios = [
        "Sedan",
        "Hatch"
    ];
    const [focused, setFocused] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [focusedInputHorario, setFocusedInputHorario] = useState<string | null>(null);
    const [capacidade, setCapacidade] = useState('');
    const [veiculos, setVeiculos] = useState<string[]>([])

    const toggleVeiculo = (tipo: string) => {
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
        Suv: { horas: '', minutos: '' },
        Picape: { horas: '', minutos: '' },
        Van: { horas: '', minutos: '' },
        Carga: { horas: '', minutos: '' },
    });

    function calcularMinutos({ horas, minutos }: any) {
        const h = parseInt(horas || '0', 10);
        const m = parseInt(minutos || '0', 10);
        return h * 60 + m;
    }

    // const tempoHatchMin = calcularMinutos(tempoVeiculo.Hatch);
    // const tempoSedanMin = calcularMinutos(tempoVeiculo.Sedan);
    // console.log(tempoHatchMin)
    // console.log(tempoSedanMin)

    // ============================================== ETAPA 3 ================================================================

    const servicoObrigatorio = [
        "Lavagem Completa"
    ];

    const [servicos, setServicos] = useState<string[]>([]);
    const [pagamentos, setPagamentos] = useState<string[]>([]);
    const [valores, setValores] = useState<Record<string, number | null>>({});

    const toggleServico = (item: string) => {
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

    function finalizarCadastro() {

        console.log('Enviar')
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

                                </Card>
                            )}

                            <Card title="Localização">

                                <View>
                                    {endereco === "" && (
                                        <TextInput
                                            placeholder="Endereço"
                                            value={endereco}
                                            onChangeText={setEndereco}
                                            style={[atualizarStyle.in, focusedLocalizacao && atualizarStyle.inputFocused,]}
                                            maxLength={50}
                                            onFocus={() => setFocusedLocalzacao(true)}
                                            onBlur={() => setFocusedLocalzacao(false)}
                                        />
                                    )}{endereco !== "" && (

                                        <TextInput
                                            placeholder="Endereço"
                                            readOnly={true}
                                            value={endereco}
                                            onChangeText={setEndereco}
                                            style={[atualizarStyle.in, focusedLocalizacao && atualizarStyle.inputFocused,]}
                                            maxLength={50}
                                            onFocus={() => setFocusedLocalzacao(true)}
                                            onBlur={() => setFocusedLocalzacao(false)}
                                        />

                                    )}
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
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
                                        <Text style={atualizarStyle.textoEndereco}>Endereço: {endereco}</Text>
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

                            <Card title="Capacidade simultânea">
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
                            </Card>

                            <Card title="Tipos de veículos">
                                <View style={atualizarStyle.chipContainer}>
                                    {['Sedan', 'Hatch', 'Suv', 'Picape', 'Van', 'Carga'].map(tipo => {
                                        const obrigatorio = obrigatorios.includes(tipo);
                                        const ativo = veiculos.includes(tipo) || obrigatorio;

                                        return (
                                            <Chip
                                                key={tipo}
                                                selected={ativo}
                                                disabled={obrigatorio}
                                                onPress={
                                                    obrigatorio ? undefined : () => toggleVeiculo(tipo)
                                                }
                                                style={[
                                                    atualizarStyle.chip,
                                                    ativo && atualizarStyle.chipActive,
                                                    obrigatorio && atualizarStyle.chipObrigatorio,
                                                ]}
                                                textStyle={[
                                                    atualizarStyle.chipText,
                                                    ativo && atualizarStyle.chipTextActive,
                                                ]}
                                                showSelectedCheck={false}
                                            >
                                                {tipo}
                                            </Chip>
                                        );
                                    })}
                                </View>
                            </Card>

                            <Card title="Tempo Médio Por Veículo">

                                <View style={atualizarStyle.tempoContainer}>
                                    <Text style={atualizarStyle.tempoLabel}>{'Sedan'}</Text>

                                    <View style={atualizarStyle.tempoInputs}>

                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder="h"
                                            value={tempoVeiculo.Sedan.horas}
                                            onChangeText={text => atualizarTempo('Sedan', 'horas', text)}
                                            style={[
                                                atualizarStyle.tempoInput,
                                                focusedInputHorario === 'Sedan' && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInputHorario('Sedan')}
                                            onBlur={() => setFocusedInputHorario(null)}
                                            maxLength={1}
                                        />

                                        <Text style={atualizarStyle.tempoSeparador}>:</Text>

                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder="min"
                                            value={tempoVeiculo.Sedan.minutos}
                                            onChangeText={text => atualizarTempo('Sedan', 'minutos', text)}
                                            style={[
                                                atualizarStyle.tempoInput,
                                                focusedInputHorario === 'Sedan' && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInputHorario('Sedan')}
                                            onBlur={() => setFocusedInputHorario(null)}
                                            maxLength={2}
                                        />

                                    </View>

                                    <Text style={{ marginTop: 5 }}></Text>
                                    <Text style={atualizarStyle.tempoLabel}>{'Hatch'}</Text>

                                    <View style={atualizarStyle.tempoInputs}>
                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder="h"
                                            value={tempoVeiculo.Hatch.horas}
                                            onChangeText={text => atualizarTempo('Hatch', 'horas', text)}
                                            underlineColorAndroid="transparent"
                                            style={[
                                                atualizarStyle.tempoInput,
                                                focusedInputHorario === 'Hatch' && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInputHorario('Hatch')}
                                            onBlur={() => setFocusedInputHorario(null)}
                                            maxLength={1}
                                        />

                                        <Text style={atualizarStyle.tempoSeparador}>:</Text>

                                        <TextInput
                                            keyboardType="numeric"
                                            placeholder="min"
                                            value={tempoVeiculo.Hatch.minutos}
                                            onChangeText={text => atualizarTempo('Hatch', 'minutos', text)}
                                            style={[
                                                atualizarStyle.tempoInput,
                                                focusedInputHorario === 'Hatch' && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInputHorario('Hatch')}
                                            onBlur={() => setFocusedInputHorario(null)}
                                            maxLength={2}
                                        />
                                    </View>
                                </View>

                                {veiculos.map(vcl => (

                                    <View key={vcl} style={atualizarStyle.tempoContainer}>
                                        <Text style={atualizarStyle.tempoLabel}>{vcl}</Text>

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
                                        </View>
                                    </View>

                                ))}

                            </Card>
                        </>
                    )}

                    {/* ETAPA 3 */}
                    {step === 3 && (
                        <>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 12 }}>Serviços e pagamento</Text>

                            <Card title="Serviços">

                                <View style={atualizarStyle.chipContainer}>
                                    {["Lavagem Completa", "Lavagem Interna", "Lavagem Externa", "Enceramento", "Polimento", "Delivery", "Lavagem de Motor"].map(item => {
                                        const servObri = servicoObrigatorio.includes(item);
                                        const ativo = servicos.includes(item) || servObri;
                                        return (
                                            <Chip key={item} mode='outlined' selected={ativo} disabled={servObri} onPress={
                                                servObri ? undefined : () => toggleServico(item)
                                            }
                                                style={[
                                                    atualizarStyle.chip,
                                                    ativo && atualizarStyle.chipActive,
                                                    servObri && atualizarStyle.chipObrigatorio,
                                                ]}
                                                textStyle={[
                                                    atualizarStyle.chipText,
                                                    ativo && atualizarStyle.chipTextActive,
                                                ]} showSelectedCheck={false}>{item}</Chip>
                                        )
                                    })}
                                </View>

                            </Card>

                            <Card title="Valores">

                                {servicoObrigatorio.map(newServ => (
                                    <View key={newServ} style={{ marginBottom: 12 }}>
                                        <CurrencyInput
                                            placeholder={'R$ - ' + newServ}
                                            value={valores[newServ] ?? null}
                                            onChangeValue={value =>
                                                setValores(prev => ({
                                                    ...prev,
                                                    [newServ]: value,
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
                                                focusedInput === newServ && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInput(newServ)}
                                            onBlur={() => setFocusedInput(null)}
                                        />
                                    </View>
                                ))}

                                {servicos.map(serv => (
                                    <View key={serv} style={{ marginBottom: 12 }}>
                                        <CurrencyInput
                                            placeholder={'R$ - ' + serv}
                                            value={valores[serv] ?? null}
                                            onChangeValue={value =>
                                                setValores(prev => ({
                                                    ...prev,
                                                    [serv]: value,
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
                                                focusedInput === serv && atualizarStyle.inputFocused,
                                            ]}
                                            onFocus={() => setFocusedInput(serv)}
                                            onBlur={() => setFocusedInput(null)}
                                        />
                                    </View>
                                ))
                                }

                            </Card>

                            <Card title="Pagamento">

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





import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, Pressable } from 'react-native';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import mapaStyle from '../estilos/mapa/mapaStyle';
import { useRouter } from 'expo-router';
import { PrimaryButton, SecondaryButton } from '@/components/componentes';
import { Ionicons } from '@expo/vector-icons';

export default function MapaLavaJatos() {

    const rota = useRouter()

    function calcularDistancia(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) {
        const R = 6371; // raio da Terra em km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const [location, setLocation] =
        useState<Location.LocationObjectCoords | null>(null);

    const [errorMsg, setErrorMsg] =
        useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [visivel, setVisivel] = useState(false);
    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [distancia, setDistancia] = useState()
    const [horarioFuncionamento, sethorarioFuncionamento] = useState()

    const lavaJatos = [
        {
            id: 1,
            nome: 'Lava Jato Central',
            latitude: -22.92940943542542,
            longitude: -43.63795854605003,
            funcionamento: {
                dias: [0, 2, 4, 5],
                abertura: '00:00',
                fechamento: '06:00',
            },
        },
        {
            id: 2,
            nome: 'Brilho Rápido',
            latitude: -22.93044893478628,
            longitude: -43.64011113879609,
            funcionamento: {
                dias: [1, 3, 4, 6],
                abertura: '08:00',
                fechamento: '18:00',
            },
        },
    ];

    useEffect(() => {
        let tentativas = 0;

        const buscarLocalizacao = async () => {
            try {
                setLoading(true);
                setErrorMsg(null);

                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setErrorMsg('Permissão de localização negada');
                    return;
                }

                const currentLocation =
                    await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.High,
                    });

                setLocation(currentLocation.coords);
            } catch (error) {
                if (tentativas < 2) {
                    tentativas++;
                    setTimeout(buscarLocalizacao, 1500);
                    return;
                }

                console.log(error);
                setErrorMsg(
                    'Não foi possível obter sua localização. Verifique o GPS.'
                );
            } finally {
                setLoading(false);
            }
        };

        buscarLocalizacao();
    }, []);

    if (loading) {
        return (
            <View style={mapaStyle.loadingContainer}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={mapaStyle.loadingText}>Carregando mapa...</Text>
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={mapaStyle.loadingContainer}>
                <Text style={mapaStyle.errorText}>{errorMsg}</Text>

                <TouchableOpacity onPress={() => rota.replace('/mapa')}>
                    <Text style={{ color: '#2563EB', marginTop: 10 }}>
                        Tentar novamente
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!location) {
        return (
            <View style={mapaStyle.loadingContainer}>
                <Text style={mapaStyle.errorText}>
                    Não foi possível obter sua localização.
                </Text>
            </View>
        );
    }

    function estaAberto(funcionamento: any) {
        const agora = new Date();

        const diaHoje = agora.getDay(); // 0–6
        if (!funcionamento.dias.includes(diaHoje)) {
            return false;
        }

        const [aberturaH, aberturaM] = funcionamento.abertura.split(':').map(Number);
        const [fechamentoH, fechamentoM] = funcionamento.fechamento.split(':').map(Number);

        const abertura = new Date();
        abertura.setHours(aberturaH, aberturaM, 0, 0);

        const fechamento = new Date();
        fechamento.setHours(fechamentoH, fechamentoM, 0, 0);

        return agora >= abertura && agora <= fechamento;
    }

    function abrirModal(id: any, nome: any, distancia: any, aberto: any) {
        setId(id)
        setNome(nome)
        setDistancia(distancia)
        sethorarioFuncionamento(aberto)
        setVisivel(true)
    }

    function irLavaJato(id: any) {
        rota.push(`../lavajato/${id}`)
        setVisivel(false)
    }

    return (
        <>
            <Modal
                visible={visivel}
                transparent
                animationType="fade"
                onRequestClose={() => setVisivel(false)}
            >
                <View style={mapaStyle.overlay}>
                    <View style={mapaStyle.popup}>
                        <Text style={mapaStyle.tituloModal}>{nome}</Text>
                        <Text style={mapaStyle.textosModal}>{distancia}km de você</Text>
                        <Text
                            style={{
                                color: horarioFuncionamento ? 'green' : 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            {horarioFuncionamento ? 'ABERTO AGORA' : 'FECHADO'}
                        </Text>


                        <View style={{ marginTop: 15, flexDirection: 'row', gap: 5 }}>
                            <SecondaryButton label="Fechar" onPress={() => setVisivel(false)} />
                            <PrimaryButton label="Ir" onPress={() => irLavaJato(id)} />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={mapaStyle.container}>

                <MapView
                    style={mapaStyle.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    showsUserLocation
                >
                    {lavaJatos.map((lava) => {
                        const distancia = calcularDistancia(
                            location.latitude,
                            location.longitude,
                            lava.latitude,
                            lava.longitude
                        );

                        const aberto = estaAberto(lava.funcionamento);

                        return (

                            <Marker
                                key={lava.id}
                                coordinate={{
                                    latitude: lava.latitude,
                                    longitude: lava.longitude,
                                }}
                                title={lava.nome}
                                description={distancia.toFixed(1) + 'km de você'}
                                onPress={() => abrirModal(lava.id, lava.nome, distancia.toFixed(1), aberto)}
                            />
                        );
                    })
                    }

                </MapView>

            </View>
        </>
    );
}

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import mapaStyle from './index.style';
import { useRouter } from 'expo-router';
import { PrimaryButton, SecondaryButton } from '@/components/componentes';
import { calcularDistancia, estaAberto } from '@/scripts/funcoes';

export default function MapaLavaJatos() {

    const rota = useRouter()

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
            dias: ['Seg', 'Qua', 'Sex', 'Sab'],
            horarios: {
                domingo: { abertura: null, fechamento: null },
                sabado: { abertura: '09:16', fechamento: '14:16' },
                semana: { abertura: '09:15', fechamento: '18:15' },
            },
        },
        {
            id: 2,
            nome: 'Brilho Rápido',
            latitude: -22.93044893478628,
            longitude: -43.64011113879609,
            dias: ['Dom', 'Ter', 'Qua', 'Qui', 'Sex'],
            horarios: {
                domingo: { abertura: null, fechamento: null },
                sabado: { abertura: '09:16', fechamento: '14:16' },
                semana: { abertura: '09:15', fechamento: '18:15' },
            },
        },
        {
            id: 3,
            nome: 'Quiqui',
            latitude: -22.929676,
            longitude: -43.640471,
            dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui'],
            horarios: {
                domingo: { abertura: null, fechamento: null },
                sabado: { abertura: '09:16', fechamento: '14:16' },
                semana: { abertura: '09:15', fechamento: '18:15' },
            },
        },
    ]

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

    function abrirModal(id: any, nome: any, distancia: any, aberto: any) {
        setId(id)
        setNome(nome)
        setDistancia(distancia)
        sethorarioFuncionamento(aberto)
        setVisivel(true)
    }

    function irLavaJato(id: any, distancia: any) {
        rota.push({
            pathname: '/lavajato/[id]',
            params: {
                id: id,
                distanciaKm: distancia,
            },
        });

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
                            <PrimaryButton label="Ir" onPress={() => irLavaJato(id, distancia)} />
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

                        const aberto = estaAberto(lava.dias, lava.horarios);

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
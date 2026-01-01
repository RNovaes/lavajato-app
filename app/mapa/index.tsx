
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import mapaStyle from '../estilos/mapa/mapaStyle';
import { useRouter } from 'expo-router';

export default function MapaLavaJatos() {

    const rota = useRouter()

    const [location, setLocation] =
        useState<Location.LocationObjectCoords | null>(null);

    const [errorMsg, setErrorMsg] =
        useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);


    const lavaJatos = [
        {
            id: 1,
            nome: 'Lava Jato Central',
            latitude: -22.92940943542542,
            longitude: -43.63795854605003,
        },
        {
            id: 2,
            nome: 'Brilho Rápido',
            latitude: -22.93044893478628,
            longitude: -43.64011113879609,
        },
    ];

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de localização negada');
                setLoading(false);
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setLoading(false);
        })();
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

    return (

        <SafeAreaView style={mapaStyle.safeArea} edges={['top']}>

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
                {lavaJatos.map((lava) => (

                    <Marker
                        key={lava.id}
                        coordinate={{
                            latitude: lava.latitude,
                            longitude: lava.longitude,
                        }}
                        title={lava.nome}
                        onPress={() => rota.push(`../lavajato/${lava.id}`)}
                    />
                ))}

            </MapView>
        </SafeAreaView>

    );
}
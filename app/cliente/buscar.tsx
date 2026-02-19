
import { Header, Padrao } from "@/components/componentes";
import { fotoPerfilHeader } from "@/hooks/fotoHeader";
import { ModalHeaderFoto } from "@/scripts/funcoes";
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import buscarStilo from "./estilos/buscar.style";
import { theme } from "@/components/theme";

type LavaJato = {
    id: string;
    nome: string;
    endereco: string;
    distancia: number; // km
    imagem: string;
};

const dadosMock: LavaJato[] = [
    {
        id: "1",
        nome: "Lava Jato Central",
        endereco: "Centro",
        distancia: 1.2,
        imagem: "https://picsum.photos/200",
    },
    {
        id: "2",
        nome: "Brilho Car",
        endereco: "Zona Sul",
        distancia: 3.8,
        imagem: "https://picsum.photos/201",
    },
    {
        id: "3",
        nome: "Auto Clean",
        endereco: "Zona Norte",
        distancia: 2.4,
        imagem: "https://picsum.photos/202",
    },
];

type TipoFiltro = "MENOR" | "MAIOR" | "AZ" | "ZA";

export default function BuscarLavaJato() {
    const [filtro, setFiltro] = useState<TipoFiltro>("MENOR");

    // 🔎 Ordenação dinâmica
    const listaOrdenada = useMemo(() => {
        const lista = [...dadosMock];

        switch (filtro) {
            case "MENOR":
                return lista.sort((a, b) => a.distancia - b.distancia);

            case "MAIOR":
                return lista.sort((a, b) => b.distancia - a.distancia);

            case "AZ":
                return lista.sort((a, b) => a.nome.localeCompare(b.nome));

            case "ZA":
                return lista.sort((a, b) => b.nome.localeCompare(a.nome));

            default:
                return lista;
        }
    }, [filtro]);

    function CardLavaJato({ item }: { item: LavaJato }) {

        return (

            <TouchableOpacity style={theme.cardUnicas.section}>
                <Image source={{ uri: item.imagem }} style={theme.cardUnicas.imagem} />

                <View style={theme.cardUnicas.info}>
                    <Text style={theme.cardUnicas.nome}>{item.nome}</Text>
                    <Text style={theme.cardUnicas.endereco}>{item.endereco}</Text>
                </View>

                <View style={theme.cardUnicas.distanciaBox}>
                    <Text style={theme.cardUnicas.distancia}>{item.distancia.toFixed(1)} km</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const { foto, tirarFoto, escolherGaleria } = fotoPerfilHeader()
    const [modalFotoHeader, setModalFotoHeader] = useState(false)

    return (

        <Padrao>

            <Header title='Lava Jatos próximos' subtitle='Procure por lava-jatos!' foto={foto} onPress={() => setModalFotoHeader(true)}></Header>

            <ModalHeaderFoto visible={modalFotoHeader} onClose={() => setModalFotoHeader(false)} onTirarFoto={async () => {
                await tirarFoto()
                setModalFotoHeader(false)
            }}
                onEscolherGaleria={async () => {
                    await escolherGaleria()
                    setModalFotoHeader(false)
                }}>
            </ModalHeaderFoto>

            <View style={buscarStilo.container}>

                {/* 🎛️ Filtros */}
                <View style={buscarStilo.filtros}>
                    <BotaoFiltro
                        label="Menor dist."
                        ativo={filtro === "MENOR"}
                        onPress={() => setFiltro("MENOR")}
                    />
                    <BotaoFiltro
                        label="Maior dist."
                        ativo={filtro === "MAIOR"}
                        onPress={() => setFiltro("MAIOR")}
                    />
                    <BotaoFiltro
                        label="A–Z"
                        ativo={filtro === "AZ"}
                        onPress={() => setFiltro("AZ")}
                    />
                    <BotaoFiltro
                        label="Z–A"
                        ativo={filtro === "ZA"}
                        onPress={() => setFiltro("ZA")}
                    />
                </View>

                {/* 📋 Lista */}
                <FlatList
                    data={listaOrdenada}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CardLavaJato item={item} />}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </View>

        </Padrao>
    );
}

function BotaoFiltro({
    label,
    ativo,
    onPress,
}: {
    label: string;
    ativo: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            style={[buscarStilo.botaoFiltro, ativo && buscarStilo.botaoFiltroAtivo]}
            onPress={onPress}
        >
            <Text style={[buscarStilo.botaoTexto, ativo && buscarStilo.botaoTextoAtivo]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}
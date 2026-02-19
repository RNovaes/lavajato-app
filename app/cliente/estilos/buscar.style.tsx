import { StyleSheet } from "react-native";

const buscarStilo = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },

    filtros: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
    },

    botaoFiltro: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
    },

    botaoFiltroAtivo: {
        backgroundColor: "#000",
    },

    botaoTexto: {
        fontSize: 13,
    },

    botaoTextoAtivo: {
        color: "#fff",
    },
});

export default buscarStilo
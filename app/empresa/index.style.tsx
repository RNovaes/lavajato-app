
import { StyleSheet } from "react-native";

const alertaStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    textoBotao: {
        color: "white"
    },
    botao: {
        backgroundColor: "#2563EB",
        marginBottom: 12,
    },
    textoPular: {
        color: "#555",
        textDecorationLine: 'underline'
    },
    ilustracao: {
        marginLeft: 14,
        justifyContent: 'center',
        width: 300,
        height: 200,
        marginBottom: 26,
    },
    descricao: {
        fontSize: 16,
        color: "#617480",
        textAlign: "center",
        marginBottom: 32,
    },
});

export default alertaStyle
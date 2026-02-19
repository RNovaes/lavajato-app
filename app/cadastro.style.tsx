
import { StyleSheet } from "react-native";

const cadastroStyle = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#FDFDFB',
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 32,
        textAlign: 'center',
    },
    mensagemErro: {
        fontSize: 10,
        color: "red",
        fontWeight: "bold",
    },
    input: {
        borderRadius: 10,
        width: "100%",
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 16
    },
    icone: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    botaoSecundario: {
        borderWidth: 1,
        borderColor: '#111827',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    textoBotaoSecundario: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dividir: {
        marginTop: 20
    },
    esqueciSenha: {
        textAlign: 'center',
        color: '#2563EB',
        fontSize: 14,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
    },
    botaoSelecionado: {
        backgroundColor: "#2563EB",
    },
    textoNormal: {
        color: 'black'
    },
    textoSelecionado: {
        color: 'white'
    }
})

export default cadastroStyle
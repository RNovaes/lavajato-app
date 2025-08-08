import { StyleSheet } from "react-native"

const paginaInicialStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FDFDFB',
        padding: 24,
        justifyContent: 'center',
    },
    icone: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
    mensagemErro: {
        fontSize: 10,
        color: "red",
        fontWeight: "bold",
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        borderRadius: 10,
        width: "100%",
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 16
    },
    botaoPrimario: {
        backgroundColor: '#2563EB',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    textoBotaoPrimario: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    esqueciSenha: {
        textAlign: 'center',
        color: '#2563EB',
        fontSize: 14,
        marginBottom: 32,
    },
    dividirContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    separar: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    orTexto: {
        marginHorizontal: 8,
        color: '#6B7280',
        fontSize: 14,
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
})

export default paginaInicialStyle
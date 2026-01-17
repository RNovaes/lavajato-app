
import { theme } from "@/components/theme";
import { StyleSheet } from "react-native";

const lavajatoStyle = StyleSheet.create({

    // index [id].tsx e // servicos.tsx

    safeArea: {flex: 1, backgroundColor: theme.colors.background},

    cardTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        marginBottom: 8,
    },

    card: {
        backgroundColor: theme.colors.background,
        padding: 14,
        borderRadius: 12,
        marginTop: 16,
        gap: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    botao: {
        backgroundColor: '#1E88E5',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center'
    },

    primaryButtonText: {
        color: theme.colors.text.white,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },

    extraCard: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 6
    },

    extraAtivo: {
        backgroundColor: '#E3F2FD',
        borderColor: '#1E88E5'
    },

    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: 16,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    infoLabel: {
        marginLeft: 8,
        flex: 1,
        color: '#6B7280',
        fontSize: 14,
    },

    infoValue: {
        color: '#111827',
        fontWeight: '600',
        fontSize: 14,
    },

    tag: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginRight: 8,
        marginBottom: 8,
    },

    tagText: {
        fontSize: 13,
        color: '#374151',
    },

    text: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },

    abaServico: { padding: 16, backgroundColor: theme.colors.background },
    servicoNome: { fontSize: theme.fontSize.md, fontWeight: '600' },
    lavajatoNome: { color: theme.colors.text.white, fontSize: theme.fontSize.xl, fontWeight: '700' },

    // Agendar.tsx

    section: { fontSize: 16, fontWeight: '600', marginVertical: 12 },
    dia: { width: 56, height: 64, borderRadius: 8, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
    diaAtivo: { backgroundColor: '#1E88E5' },
    horarios: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    hora: { width: '30%', paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
    horaAtiva: { backgroundColor: '#1E88E5', borderColor: '#1E88E5' },
    time: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, marginRight: 8 },
    timeAtivo: { backgroundColor: '#1E88E5', borderColor: '#1E88E5' },
    horaIndisponivel: { backgroundColor: '#EEE', borderColor: '#CCC' },

})

export default lavajatoStyle
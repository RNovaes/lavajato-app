

import { StyleSheet } from "react-native";

const agendamentosLavaJato = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { padding: 16, backgroundColor: '#FFFFFF' },
    hello: { fontSize: 20, fontWeight: '600', color: '#111827' },
    sub: { marginTop: 4, fontSize: 14, color: '#6B7280' },
    section: { marginTop: 16, paddingHorizontal: 16 },
    historyItem: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    historyTitle: { fontSize: 15, fontWeight: '500', color: '#111827' },
    historySub: { fontSize: 13, color: '#6B7280' },
    historyStatus: { fontSize: 13, fontWeight: '500', color: '#16A34A' },
});

export default agendamentosLavaJato

import { StyleSheet } from "react-native";

const clienteStyle = StyleSheet.create({

    cardValue: { fontSize: 15, fontWeight: '500', color: '#111827' },
    cardLabel: { fontSize: 13, color: '#6B7280' },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
        marginTop: 12,
        flexWrap: 'wrap'
    },
    summaryDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    listItem: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    listText: { fontSize: 15, color: '#111827' },
    arrow: { fontSize: 22, color: '#9CA3AF' },
    tituloModal: { fontSize: 20, fontWeight: '600', color: '#111827' },
    textosModal: { fontSize: 15, fontWeight: '500', color: '#111827', marginTop: 20 },
});

export default clienteStyle
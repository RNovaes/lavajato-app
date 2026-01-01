import { StyleSheet } from "react-native";

const homeClientes = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { padding: 16, backgroundColor: '#FFFFFF' },
    hello: { fontSize: 20, fontWeight: '600', color: '#111827' },
    sub: { marginTop: 4, fontSize: 14, color: '#6B7280' },
    primaryButton: {
        margin: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center'
    },
    primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    primaryButtonSub: { marginTop: 4, color: '#DBEAFE', fontSize: 13 },
    section: { marginTop: 16, paddingHorizontal: 16 },
    sectionTitle: { marginBottom: 8, fontSize: 15, fontWeight: '600', color: '#111827' },
    card: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 12, marginBottom: 8 },
    cardValue: { fontSize: 15, fontWeight: '500', color: '#111827' },
    cardLabel: { fontSize: 13, color: '#6B7280' },
    summaryCard: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    summaryDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
    },
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
    listItem: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    listText: { fontSize: 15, color: '#111827' },
    arrow: { fontSize: 22, color: '#9CA3AF' },
    accountSection: { marginTop: 24, alignItems: 'center' },
    logout: { color: '#2563EB', fontSize: 15, marginBottom: 12 },
    delete: { color: '#DC2626', fontSize: 14 }
});

export default homeClientes
import { StyleSheet } from 'react-native'

const painelStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        padding: 16,
        backgroundColor: '#FFFFFF'
    },
    hello: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827'
    },
    sub: {
        marginTop: 4,
        fontSize: 14,
        color: '#6B7280'
    },
    alert: {
        margin: 16,
        padding: 12,
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    alertText: {
        paddingLeft: 10,
        fontSize: 14,
        color: '#92400E',
        width: "90%"
    },
    alertLink: {
        marginTop: 8,
        color: '#2563EB',
        fontWeight: '600'
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 16
    },
    card: {
        width: '48%',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12
    },
    cardValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827'
    },
    cardLabel: {
        marginTop: 4,
        fontSize: 13,
        color: '#6B7280'
    },
    primaryButton: {
        margin: 16,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center'
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600'
    },
    section: {
        marginTop: 8,
        paddingHorizontal: 16
    },
    sectionTitle: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#111827'
    },
    listItem: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    listText: {
        fontSize: 15,
        color: '#111827'
    },
    arrow: {
        fontSize: 22,
        color: '#9CA3AF'
    },
    accountSection: {
        marginTop: 24,
        alignItems: 'center'
    },
    logout: {
        color: '#2563EB',
        fontSize: 15,
        marginBottom: 12
    },
    delete: {
        color: '#DC2626',
        fontSize: 14
    },
    alertIcon: {
        fontSize: 20,
        marginTop: 2
    },
});

export default painelStyle
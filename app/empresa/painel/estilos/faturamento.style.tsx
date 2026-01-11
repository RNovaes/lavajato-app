
import { theme } from '@/components/theme';
import { StyleSheet } from 'react-native';

const faturamentoStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background
    },

    container: {
        padding: 16,
        paddingBottom: 32,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },

    /* ===== CARDS RESUMO ===== */

    cardsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },

    card: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        padding: 16,

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    cardFull: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    cardValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2563EB',
    },

    cardLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 4,
    },

    /* ===== SEÇÕES ===== */

    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        marginTop: 16,
    },

    /* ===== LISTAS ===== */

    listItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 14,
        marginBottom: 8,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },

    listLabel: {
        fontSize: 14,
        color: '#374151',
    },

    listValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    /* ===== INSIGHTS ===== */

    insightCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginTop: 24,

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    insightTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },

    insightText: {
        fontSize: 13,
        color: '#4B5563',
        marginBottom: 4,
    },
});

export default faturamentoStyle

import { StyleSheet, Platform } from 'react-native';
import { theme } from '@/components/theme';

const painelStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    container: {
        padding: theme.spacing.md,
    },

    arrow: {
        fontSize: 22,
        color: '#9CA3AF'
    },

    alertIcon: {
        fontSize: 20,
        marginTop: 2,
        width: '20%',
        textAlign: 'center'
    },

    atualizarDados: {
        width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 15
    },

    section: {
        marginTop: 8,
        paddingHorizontal: 16
    },

    /* HEADER */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },

    headerLeft: {
        marginRight: 12,
    },

    headerRight: {
        flex: 1,
    },

    avatarWrapper: {
        position: 'relative',
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: 12,
    },

    cameraIcon: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: theme.colors.border,
        marginRight: theme.spacing.sm,
    },

    hello: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },

    sub: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },

    /* ALERT */
    alert: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF7ED',
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.lg,
        flexWrap: 'wrap',
        width: '100%'
    },

    alertText: {
        flex: 1,
        fontSize: theme.fontSize.sm,
        color: '#92400E',
        width: '80%'
    },

    alertLink: {
        color: theme.colors.primary,
        fontWeight: '600'
    },

    /* CARDS */
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },

    card: {
        width: '47%',
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
            },
            android: {
                elevation: 3,
            },
        }),
    },

    cardValue: {
        fontSize: theme.fontSize.xl,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },

    cardLabel: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.secondary,
        marginTop: 4,
    },

    /* BOTÃO */
    primaryButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },

    primaryButtonText: {
        color: theme.colors.text.white,
        fontSize: theme.fontSize.md,
        fontWeight: '600',
    },

    /* SEÇÃO */
    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    listText: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.primary,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '85%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },

    modalButton: {
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        marginBottom: 10,
    },

    modalButtonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
    },

    modalCancel: {
        textAlign: 'center',
        marginTop: 10,
        color: '#DC2626',
        fontWeight: '500',
    },

});

export default painelStyle;
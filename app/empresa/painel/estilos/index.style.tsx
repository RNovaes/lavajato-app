
import { StyleSheet, Platform } from 'react-native';
import { theme } from '@/components/theme';

const painelStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    container: {
        padding: 16,
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
        marginBottom: 24,
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
        marginRight: 8,
    },

    hello: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },

    sub: {
        fontSize: 13,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },

    /* ALERT */
    alert: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF7ED',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
        width: '100%'
    },

    alertText: {
        flex: 1,
        fontSize: 13,
        color: '#92400E',
        width: '80%'
    },

    alertLink: {
        color: theme.colors.app.primary,
        fontWeight: '600'
    },

    /* CARDS */
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
    },

    card: {
        width: '47%',
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: 16,

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
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },

    cardLabel: {
        fontSize: 13,
        color: theme.colors.text.secondary,
        marginTop: 4,
    },

    /* BOTÃO */
    primaryButton: {
        backgroundColor: theme.colors.app.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
    },

    primaryButtonText: {
        color: theme.colors.text.white,
        fontSize: 16,
        fontWeight: '600',
    },

    /* SEÇÃO */
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 8,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },

    listText: {
        fontSize: 16,
        color: theme.colors.text.primary,
    },

    // modalOverlay: {
    //     flex: 1,
    //     backgroundColor: 'rgba(0,0,0,0.4)',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    // modalContent: {
    //     width: '85%',
    //     backgroundColor: '#FFF',
    //     borderRadius: 16,
    //     padding: 20,
    // },

    // modalTitle: {
    //     fontSize: 18,
    //     fontWeight: '600',
    //     marginBottom: 16,
    //     textAlign: 'center',
    // },

    // modalButton: {
    //     paddingVertical: 14,
    //     borderRadius: 12,
    //     backgroundColor: '#F3F4F6',
    //     marginBottom: 10,
    // },

    // modalButtonText: {
    //     textAlign: 'center',
    //     fontSize: 15,
    //     fontWeight: '500',
    // },

    // modalCancel: {
    //     textAlign: 'center',
    //     marginTop: 10,
    //     color: '#DC2626',
    //     fontWeight: '500',
    // },

});

export default painelStyle;
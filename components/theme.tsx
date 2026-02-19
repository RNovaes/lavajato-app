

export const theme = {

  cor: {
    app: {
      primary: '#2563EB',
      success: '#16A34A',
      warning: '#F59E0B',
      danger: '#DC2626',
      secondary: '#E5E7EB'
    }
  },

  pagina: {
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { backgroundColor: '#FFFFFF' },
    titulo: { fontSize: 18, fontWeight: '600' as const, marginBottom: 12, color: '#111827'},
    fonte: { fontSize: 15, color: '#111827' },
    corFonte: {
      primary: '#111827',
      secondary: '#6B7280',
      muted: '#9CA3AF',
      white: '#FFFFFF',
    }
  },

  header: {
    header: { padding: 16, backgroundColor: '#2563EB', height: '20%' as const, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center' as const, alignItems: 'center' as const, flexDirection: 'row' as const },
    sub: { marginTop: 4, fontSize: 14, color: '#E5E7EB' },
    title: { fontSize: 20, color: '#FFFFFF', fontWeight: '600' as const },
    avatarWrapper: { position: 'relative' as const, width: 52, height: 52, borderRadius: 26, marginRight: 12 },
    cameraIcon: { position: 'absolute' as const, bottom: -2, right: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: '#2563EB', alignItems: 'center' as const, justifyContent: 'center' as const, borderWidth: 2, borderColor: '#FFF' },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#E5E7EB', marginRight: 8 },
    headerRight: { flex: 1 },
  },

  card: {
    section: { marginTop: 16, paddingHorizontal: 16 },
    summaryCard: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16 },
    title: { fontSize: 18, fontWeight: '600' as const, marginBottom: 12 }
    // backgroundColor: '#f5f5f5'
  },

  cardUnicas: {

    section: { flexDirection: "row" as const, alignItems: "center" as const, padding: 12, borderRadius: 12, backgroundColor: "#f5f5f5", marginBottom: 10 },
    subSection: { flexDirection: 'row' as const, alignItems: 'center' as const },
    imagem: { width: 64, height: 64, borderRadius: 12 },
    info: { flex: 1, marginLeft: 12 },
    nome: { fontSize: 16, fontWeight: "600" as const },
    endereco: { fontSize: 13, color: "#666", marginTop: 2 },
    distanciaBox: { alignItems: "flex-end" as const },
    distancia: { fontSize: 14, fontWeight: "bold" as const },

  },

  botoes: {
    principal: { marginTop: 16, marginHorizontal: 16, padding: 16, borderRadius: 12, backgroundColor: '#2563EB', alignItems: 'center' as const },
    primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' as const },
    primaryButtonSub: { marginTop: 4, color: '#DBEAFE', fontSize: 13 },
  },

  modal: {
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },

    modalContent: {
      width: '85%' as const,
      backgroundColor: '#FFF' as const,
      borderRadius: 16,
      padding: 20,
    },

    modalTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      marginBottom: 16,
      textAlign: 'center' as const,
    },

    modalButton: {
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: '#F3F4F6' as const,
      marginBottom: 10,
    },

    modalButtonText: {
      textAlign: 'center' as const,
      fontSize: 15,
      fontWeight: '500' as const,
    },

    modalCancel: {
      textAlign: 'center' as const,
      marginTop: 10,
      color: '#DC2626' as const,
      fontWeight: '500' as const,
    },
  }

};


import { theme } from "@/components/theme";
import { StyleSheet } from "react-native";

const empresaStyle = StyleSheet.create({

  // index //

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  textoBotao: {
    color: "white"
  },
  botao: {
    backgroundColor: "#2563EB",
    marginBottom: 12,
  },
  textoPular: {
    color: "#555",
    textDecorationLine: 'underline'
  },
  ilustracao: {
    marginLeft: 14,
    justifyContent: 'center',
    width: 300,
    height: 200,
    marginBottom: 26,
  },
  descricao: {
    fontSize: 16,
    color: "#617480",
    textAlign: "center",
    marginBottom: 32,
  },

  // atualizar dados //

  containerEndereco: {
    flexDirection: 'row', // ícone + texto na horizontal
    alignItems: 'center',
    marginVertical: 10,
    width: '100%'  
  },

  textoEndereco: {
    fontSize: 16,
    color: '#333',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,

    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,

    marginRight: 8,
    marginBottom: 8,
  },

  chipContainerServicos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7
  },

  chipServicos: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },

  chipActive: {
    backgroundColor: theme.colors.app.primary + '15',
    borderColor: theme.colors.app.primary,
  },

  chipText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },

  chipTextActive: {
    color: theme.colors.app.primary,
    fontWeight: '600',
  },

  tempoContainer: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12
  },

  tempoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },

  tempoInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tempoInput: {
    width: 70,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#FFFFFF'
  },

  tempoSeparador: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  in: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, width: '100%', borderWidth: 1 },

  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  inputValores: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    width: 135
  },

  inputValoresServicos: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },

  inputFocused: {
    borderColor: '#2563EB',
    borderWidth: 2,
  }

});

export default empresaStyle
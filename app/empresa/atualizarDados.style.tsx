
import { Dimensions, StyleSheet } from "react-native";

const atualizarStyle = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    color: '#6B7280'
  },
  diasFuncionamento: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  formasPagamentos: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  botaoHorarios: {
    borderWidth: 1,
    borderColor: '#111827',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBotaoHorarios: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkboxLabel: {
    fontSize: 15,
    color: 'black'
  },
  botaoConcluir: {
    marginTop: 32,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },



  tempoMedioTiposCarros: {
    marginTop: 10,
    marginBottom: 5
  },
  textoCategoriasCarros: {
    fontSize: 16,
    color: 'black'
  },
  mensagemErro: {
    fontSize: 10,
    color: "red",
    fontWeight: "bold",
  },
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

  textoBotoesLocalizacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  botoesLocalizacao: {
    borderRadius: 8,
    backgroundColor: '#0081FF',
  },
  espacamentoDivs: {
    marginTop: 15,
    marginBottom: 15
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  topButton: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 15,
    marginBottom: 15
  },
  half: {
    flex: 1
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  timeText: {
    fontSize: 16,
    color: "#0f172a",
    textAlign: "center",
  },
  placeholder: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
  },
  rowAligned: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  },
  categoriaVeiculos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  chipText: {
    color: '#374151',
    fontSize: 14,
  },

  chipTextActive: {
    color: '#FFFFFF',
    // color: 'black',
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
    height: 44,
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
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  in: { backgroundColor: '#FFF', borderRadius: 8, padding: 12, marginBottom: 8, width: '100%', borderWidth: 1 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
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

export default atualizarStyle
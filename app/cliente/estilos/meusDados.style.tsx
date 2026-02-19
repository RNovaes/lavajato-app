
import { StyleSheet } from 'react-native';
import { theme } from '@/components/theme';

const meusDadosStyle = StyleSheet.create({

  container: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 24,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text.primary,
  },

  inputDisabled: {
    backgroundColor: '#F1F5F9',
    color: theme.colors.text.muted,
  },

  passwordButton: {
    marginTop: 16,
  },

  passwordText: {
    color: theme.colors.app.primary,
    fontSize: 13,
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: theme.colors.app.primary,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  saveButtonText: {
    color: theme.colors.text.white,
    fontSize: 16,
    fontWeight: '600',
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
    gap: 10
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#DC2626',
    fontWeight: '500',
  },

  mensagemErro: {
    fontSize: 10,
    color: "red",
    fontWeight: "bold",
  },

  inputFocused: {
    borderColor: '#2563EB',
    borderWidth: 2,
  },

  icone: {
        position: 'absolute',
        right: 16,
        top: 18,
    },
});

export default meusDadosStyle;
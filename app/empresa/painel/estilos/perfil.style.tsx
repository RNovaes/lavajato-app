
import { StyleSheet } from 'react-native';
import { theme } from '@/components/theme';

const perfilStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  container: {
    padding: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },

  field: {
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: 6,
  },

  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text.primary,
  },

  inputDisabled: {
    backgroundColor: '#F1F5F9',
    color: theme.colors.text.muted,
  },

  passwordButton: {
    marginTop: theme.spacing.md,
  },

  passwordText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },

  saveButtonText: {
    color: theme.colors.text.white,
    fontSize: theme.fontSize.md,
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

export default perfilStyle;
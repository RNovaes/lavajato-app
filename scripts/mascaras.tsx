
export function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18);
}

export function maskCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
}

export function mascaraPlaca(text: string) {
  const value = text.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (value.length >= 5 && /[A-Z]/.test(value[4])) {
    return value.slice(0, 7);
  }

  return value
    .replace(/^([A-Z]{3})([0-9])/, '$1-$2')
    .slice(0, 8);
}
